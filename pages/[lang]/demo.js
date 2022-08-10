// Notices of usage - this page is using code from the Muxlabs/wocket project on github - https://github.com/MuxLabs/wocket
// This uses code from that demo project to stream from the browser over RTMP to Azure Media Services.
// It also includes portions of the pull request from @dugaraju to support streaming to any RTMP server - https://github.com/MuxLabs/wocket/pull/20

import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import * as workerTimers from 'worker-timers';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import PlayArrow from "@material-ui/icons/PlayArrowOutlined";
import StopRounded from "@material-ui/icons/StopRounded";
import CameraFrontOutline from "@material-ui/icons/CameraFrontOutlined";
import MicrophoneOutline from "@material-ui/icons/MicOutlined";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";
import ProductSection from "pages-sections/InteractiveDemo-Sections/ProductsSection.js";

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';

const dashboardRoutes = [];

import styles from "styles/jss/nextjs-material-kit/pages/demoPage.js";
import Link from "next/link";
import { request } from "http";

const useStyles = makeStyles(styles);

// Intro Modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const CAMERA_CONSTRAINTS = {
    audio: true,
    video: true,
    video: { facingMode: "user", aspectRatio: 1.777 }, // force 16:9 aspect
    width: { min: 640, ideal: 1280, max: 1280 },
    height: { min: 360, ideal: 720, max: 720 },
};

const STATES = {
    INTRO: 'intro',
    LOADING: 'loading',
    STREAMING: 'streaming',
    TIMEOUT: 'timeout',
    COMPLETE: 'complete'
}

const getRecorderSettings = () => {
    const settings = {};
    if (MediaRecorder.isTypeSupported('video/mp4')) {
        settings.format = 'mp4';
        settings.video = 'h264';
        settings.audio = 'aac';
    } else {
        settings.format = 'webm';
        settings.audio = 'opus';
        settings.video = MediaRecorder.isTypeSupported('video/webm;codecs=h264') ? 'h264' : 'vp8';
    }
    return settings;
}

const getRecorderMimeType = () => {
    const settings = getRecorderSettings();
    const codecs = settings.format === 'webm' ? `;codecs="${settings.video}, ${settings.audio}"` : '';
    return `video/${settings.format}${codecs}`;
}

export default function DemoPage(props) {
    const classes = useStyles();
    const router = useRouter();

    const { ...rest } = props;

    const [introModal, setIntroModal] = React.useState(true);
    const [stopStreamModal, setStopStreamModal] = React.useState(false);
    const [connected, setConnected] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [streamKey, setStreamKey] = useState(null);
    const [streamRtmpUrl, setStreamRtmpUrl] = useState(null);
    const [liveStreamStarted, setLiveStreamStarted] = useState(false);
    const [cameras, setVideoInputs] = useState([]);
    const [microphones, setAudioInputs] = useState([]);
    const [livePlayback, setLivePlayback] = useState(null);
    const [playbackUrl, setPlaybackUrl] = useState(null);
    const [copySuccess, setCopySuccess] = useState(null);
    const [noEvents, setNoEvents] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [demoState, setDemoState] = useState(STATES.INTRO);
    const [clockTime, setClockTime] = useState("05:00");
    const [liveStream, setLiveStream] = useState(null);
    const [position, setPosition] = useState(null);
    const [continent, setContinent] = useState(null);

    const timerProgressRef = useRef()
    const endTimeRef = useRef();
    const inputStreamRef = useRef();
    const videoRef = useRef();
    const canvasRef = useRef();
    const wsRef = useRef();
    const mediaRecorderRef = useRef();
    const requestAnimationRef = useRef();
    const workerTimerAnimationRef = useRef();
    const isIOS = useRef(false);
    const productSelectedRef = useRef();


    const startDemo = async () => {
        setIntroModal(false);

        console.log("Starting up the demo...");
        setDemoState(STATES.LOADING);
        startLiveStream();
    }

    const enableCamera = async () => {
        console.log("Enabling camera");


        inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
            CAMERA_CONSTRAINTS
        );

        if (videoRef && videoRef.current)
            videoRef.current.srcObject = inputStreamRef.current;
        else
            throw Error("Can't start the camera on this device");

        await videoRef.current.play();

        // If we support offscreen canvas, move it there to improve performance
        /*      var canvas = 'OffscreenCanvas' in window
                     ? canvasRef.current.transferControlToOffscreen()
                     : canvasRef.current; */
        // set the width and height for the offscreen canvas 
        //canvas.style = {width: videoRef.current.clientWidth, height: videoRef.current.clientHeight};

        // We need to set the canvas height/width to match the video element.
        canvasRef.current.height = videoRef.current.clientHeight;
        canvasRef.current.width = videoRef.current.clientWidth;

        workerTimerAnimationRef = workerTimers.setTimeout(updateCanvas, (1000 / 30));

        setCameraEnabled(true);

        clearInterval(timerProgressRef);
        // Start the clock
        startClock();
    };

    const resizeCanvas = async () => {
        if (canvasRef && canvasRef.current) {
            // We need to set the canvas height/width to match the video element.
            canvasRef.current.height = videoRef.current.clientHeight;
            canvasRef.current.width = videoRef.current.clientWidth;
        }
    }

    const updateCanvas = () => {
        if (!videoRef.current)
            return;

        if (videoRef.current.ended || videoRef.current.paused) {
            return;
        }

        const ctx = canvasRef.current.getContext('2d');

        ctx.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.clientWidth,
            videoRef.current.clientHeight
        );

        // Draw clock
        ctx.fillStyle = '#FFF';
        ctx.font = '24px Segoe UI';
        const date = new Date();

        const dateText = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
        ctx.fillText(`${dateText}`, 10, canvasRef.current.height - 25, canvasRef.current.width - 20);

        if (productSelectedRef.current) {
            const productText = `For sale: ${productSelectedRef.current}`;

            var img = document.getElementById(`${productSelectedRef.current}-img`);
            if (img) {
                ctx.drawImage(img, 10, 50);
            }
            // (text, left X, top Y, maxWidth)
            ctx.fillText(productText, (canvasRef.current.width - canvasRef.current.width / 2) + 50, canvasRef.current.height - 25, canvasRef.current.width);
        }
        requestAnimationRef.current = workerTimers.setTimeout(updateCanvas, (1000 / 30));
    };

    const setCamera = (deviceId) => {
        console.log(deviceId);
        CAMERA_CONSTRAINTS.video = { deviceId: deviceId, aspectRatio: 1.777 };
        enableCamera();
    }

    const setMicrophone = (deviceId) => {
        console.log(deviceId);
        CAMERA_CONSTRAINTS.audio = { deviceId: deviceId }
        enableCamera();
    }

    const stopStreaming = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }

        setStreaming(false);
    };


    const startLiveStream = () => {
        console.log("Starting live Stream");

        let ticks = 0;
        timerProgressRef.current = setInterval(() => {
            if (loadingProgress > 200) {
                clearInterval(timerProgressRef.current);
                setNoEvents(true);
                // throw new Error("No events discoverd in time");
            }
            setLoadingProgress(loadingProgress += 2);
        }, 500);


        if (liveStream) {
            console.log(`Starting up live stream ${liveStream.name} in location ${liveStream.location}`)
            // We have available live streams from the pools, lets start it.

            const data = {
                name: liveStream.name,
                location: liveStream.location

            }

            // Start the live stream
            // Response object is 
            /*     {
                    startTime: Date;
                    liveOutputName: string;
                    locatorUrl: {
                        hls: string;
                        dash: string;
                    };
                    ingestUrl: string 
                } */
            fetch('/api/livestream/golive', {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: `same-origin`,
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'same-origin',
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not start the live event');
                    }

                    return response.json()
                }).then((body) => {
                    console.log('Success: stream started.');
                    setStreamKey(liveStream.streamKey);
                    console.log(`Set ingestUrl: ${body.ingestUrl}`);
                    console.log(`LivePlayback URLs : ${JSON.stringify(body)}`)
                    setStreamRtmpUrl(body.ingestUrl);
                    setLivePlayback(body);
                    setPlaybackUrl(`https://media.microsoft.com/playback?hls=${body.locatorUrl.hls}.m3u8`)
                    setLiveStreamStarted(true);
                    setDemoState(STATES.STREAMING);
                    clearInterval(timerProgressRef.current);
                })
                .catch((error) => {
                    console.error('Error Starting Live Event:', error);
                })

        }
    }

    const startClock = () => {
        endTimeRef.current = moment().add(5, 'minutes'); // set the start time of the live event so we can update the clock

        let clockTimer = setInterval(() => {
            let timeRemaining = endTimeRef.current.diff(moment());
            if (timeRemaining <= 0) {
                if (demoState == STATES.STREAMING) {
                    setDemoState(STATES.TIMEOUT);
                    completeDemo();
                }
                clearInterval(clockTimer);
            }
            else {
                setClockTime(moment(timeRemaining).format('mm:ss'));
            }
        }, 1000)
    }

    const stopLiveStream = () => {

        if (!liveStream) {
            console.error("Can't stop the live stream - there is no live stream.")
            return;
        }

        const data = {
            name: liveStream.name,
            location: liveStream.location
        }

        // Stop the live stream if the Websocket disconnects or ends. 
        // Start the live stream
        fetch('/api/livestream/stop', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: `same-origin`,
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'same-origin',
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not STOP the live event');
                }
                console.log(`STOPPED:successfully stopped stream: ${liveStream.name} in location: ${liveStream.location}`);

            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    const getContinentFromPosition = async () => {
        console.log("Getting the continent for the current user");
        if (!position) {
            console.error("No geo position set");
            return;
        }

        fetch(`/api/getpositiontolocation`, {
            method: 'put',
            mode: 'cors',
            cache: 'no-cache',
            credentials: `same-origin`,
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'same-origin',
            body: JSON.stringify({
                latitude: position.latitude,
                longitude: position.longitude
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Could not STOP the live event');
            }
            return response.json();
        }).then((data) => {
            // console.log("Region: " + JSON.stringify(data));
            if (data && data.continent) {
                setContinent(data.continent)
            } else {
                console.log("No continent found from position");
            }
        })

    }

    const getCurrentPosition = async () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(`Your location lat: ${position.coords.latitude} long: ${position.coords.longitude} `)
                setPosition(position.coords);
                return position.coords;
            }, () => {
                console.error("Could not access the geolocation. Please allow access to the position to use the demo.");
                setPosition(undefined);
            },
                {
                    timeout: 10000
                });

        }
    }

    const getAvailableLiveStreams = async () => {
        if (!continent){
            console.error("No location is set, we can't find a local account. Enable location on the browser.");
            return;
        }

        console.log(`Fetching available live streams in pool for continent ${continent}`);

        const liveStreams = await (await fetch(`/api/livestream/getavailable`, {
            method: 'put',
            mode: 'cors',
            cache: 'no-cache',
            credential: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'same-origin',
            body: JSON.stringify({
                    continent:continent
            })
        }).then()).json()
            .then((liveStreams) => {
                if (liveStreams && liveStreams.length > 0) {
                    // We should later try to grab the "closest" regional stream using the BING API for IP location
                    // <TODO> Use the continent state that we got back from the position to decide which regions to use. 

                    setLiveStream(liveStreams[0]);
                    console.log("Found a live stream");
                    console.log(`Name: ${liveStreams[0].name} location: ${liveStreams[0].location}`);
                }
                else {
                    console.log("Sorry, no live streams available");
                    setNoEvents(true);
                    setLiveStream(null);
                }
            });
    };



    const startStreaming = () => {
        setStreaming(true);


        const settings = getRecorderSettings();

        // use the CONTAINER_APP_URL as the main URL 
        // this is obtained on the Overview blade for the container App in Azure portal, under the Application Url. 
        const containerWsUrl = props.CONTAINERAPPURL.replace('http', 'ws');
        const wsUrl = new URL(`${containerWsUrl}/rtmp?key=${streamKey}`);

        wsUrl.searchParams.set('video', settings.video);
        wsUrl.searchParams.set('audio', settings.audio);

        if (streamRtmpUrl) {
            wsUrl.searchParams.set('url', streamRtmpUrl);
        }
        if (streamKey) {
            wsUrl.searchParams.set('key', streamKey);
        }

        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.addEventListener('open', function open() {
            setConnected(true);
        });

        wsRef.current.addEventListener('close', () => {
            setConnected(false);
            console.log(`Stopping live stream : ${liveStream.name} in location ${liveStream.location}`);
            stopLiveStream();
            stopStreaming();
            console.log("Websocket closed");
        });

        const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

        // Let's do some extra work to get audio to join the party.
        // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
        const audioStream = new MediaStream();
        const audioTracks = inputStreamRef.current.getAudioTracks();
        audioTracks.forEach(function (track) {
            audioStream.addTrack(track);
        });

        const outputStream = new MediaStream();
        [audioStream, videoOutputStream].forEach(function (s) {
            s.getTracks().forEach(function (t) {
                outputStream.addTrack(t);
            });
        });

        mediaRecorderRef.current = new MediaRecorder(outputStream, {
            mimeType: getRecorderMimeType(),
            videoBitsPerSecond: 3500000, // 3.5 Mbps video
            audioBitsPerSecond: 128000 // 128kbps audio
        });

        mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
            wsRef.current.send(e.data);
        });

        mediaRecorderRef.current.addEventListener('stop', () => {
            stopStreaming();
            wsRef.current.close();
        });

        mediaRecorderRef.current.start(500); // this was originally 1000 - it is the timeslices in milliseconds to record into each blob.
    };

    // Triggered on product selected
    const productSelected = (productName) => {
        productSelectedRef.current = productName;
        console.log(`Product Selected:  ${productName}`);

    };

    const completeDemo = () => {
        console.log("Completing the Demo...")
        console.log("Stopping stream")

        setStopStreamModal(false);
        stopStreaming();
        stopLiveStream();
        setCameraEnabled(false);
        setLiveStreamStarted(false);
        setLiveStream(null);
        setNoEvents(false);
        setDemoState(STATES.COMPLETE);
    }

    // This is called when the geo location position is updated
    useEffect(() => {
        getContinentFromPosition();
    }, [position])

    // This is called when the continent is updated
    useEffect(() => {
        getAvailableLiveStreams();
    }, [continent])

    // This effect only gets called on first load of page. 
    useEffect(() => {
        // Get the browser location permissions
        getCurrentPosition();

        if (window) {
            window.addEventListener('resize', resizeCanvas);
        }

        isIOS.current = /iPhone/.test(navigator.userAgent);

        // Enumerate all available devices
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            // List cameras and microphones.
            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {
                        if (device.kind == 'videoinput') {
                            cameras.push(device)
                            setVideoInputs(cameras);
                        }
                        else if (device.kind == 'audioinput') {
                            microphones.push(device)
                            setAudioInputs(microphones);
                        }
                    });
                })
                .catch(function (err) {
                    console.log(err.name + ": " + err.message);
                });
        }

        // Cleanup: Called when the component unmounts
        return () => {
            console.log("Cleaning up and stopping live stream");
            stopLiveStream();
        };
    }, [])

    const playBackButton = <>
        <Button
            color="transparent"
            size="sm"
            border="1px solid"
            target="_blank"
            onClick={() => { navigator.clipboard.writeText(playbackUrl); setCopySuccess(true); setTimeout(() =>{setCopySuccess(false)}, 2000) }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
            <span className={classes.copySuccess}>{copySuccess? 'Copied': 'Copy Url'}</span>
        </Button> 
    </>

    return (
        <div >
            <Header
                color="white"
                routes={dashboardRoutes}
                brand={i18next.t('landing.title')}
                leftLinks={<HeaderLinksLeft />}
                rightLinks={<HeaderLinksRight />}
                fixed
                changeColorOnScroll={{
                    height: 120,
                    color: "white",
                }}
                {...rest}
            />
            <div className={classes.section}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem id="introPage" xs={12} sm={12} md={12}>
                            <Dialog
                                classes={{
                                    root: classes.center,
                                    paper: classes.modal,
                                }}
                                open={introModal}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => setIntroModal(false)}
                                aria-labelledby="into-modal-slide-title"
                                aria-describedby="into-modal-slide-description"
                            >
                                <DialogContent
                                    id="intro-modal-slide-description"
                                    className={classes.modalBody}
                                >
                                    <div>
                                        <img className={classes.splashImage} src="/img/UnmistablyWindows_0001.jpg"></img>
                                        <h3>Welcome!</h3>
                                        <p className={classes.splashText}>
                                            This is a demo of the <b>Azure Media Creator Studio</b>,
                                            where you can host your live events and broadcast them to your viewers.
                                            Ready to try it out now?
                                        </p>
                                        <p className={classes.splashText}>
                                            Please allow this site to access your location before starting demo.
                                            <br></br>
                                            <b>We detected your continent as: {continent ? continent : "Trying to detect... make sure you have consented to allow location."}
                                            </b>
                                        </p>
                                    </div>

                                </DialogContent>
                                <DialogActions className={classes.modalFooter}>
                                    <Button
                                        color="transparent"
                                        size="lg"
                                        border="1px solid"
                                        href="/"
                                        rel="noreferrer"
                                        aria-label="Cancel"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => startDemo()}
                                        color="danger"
                                        size="lg"
                                        disabled={!liveStream}
                                    >
                                        {!liveStream ? 'Loading...' : 'Try now'}
                                    </Button>

                                </DialogActions>
                            </Dialog>


                            {/*  Show this when loading available live streams */}
                            {!liveStream && !noEvents && demoState == STATES.INTRO &&
                                <div className={classes.getDemoSessions}> Getting available demo sessions... </div>
                            }
                            {/*  Show this when there are no available live streams to use in the pool*/}
                            {noEvents && !cameraEnabled && (demoState == STATES.LOADING) &&
                                <div className={classes.noEventsAvailable}> This is a bummer, but there are no available live streams. <br />
                                    Please try again later.
                                </div>
                            }
                            {/*  Show this when there is a live stream available and camera is not turned on yet*/}

                            {!cameraEnabled && liveStream && !introModal && (
                                <div>
                                    {!liveStreamStarted && !noEvents &&
                                        <p className={classes.introMessage}>

                                            This demonstration will allow you to broadcast and view a live stream from your browser for up to 5 minutes.
                                            The live stream data and recordings will be removed on completion.

                                        </p>
                                    }
                                    {!liveStreamStarted && !introModal && !noEvents &&
                                        <>
                                            <h3>Please stand by while we setup...</h3>
                                            <CustomLinearProgress
                                                variant="determinate"
                                                color="warning"
                                                value={loadingProgress}
                                                style={{ width: "100%", display: "inline-block" }}
                                            />
                                        </>
                                    }

                                    {liveStreamStarted && !noEvents &&
                                        <GridContainer>
                                            <GridItem sm={12} md={12} >
                                                <p className={classes.introMessage} >
                                                    To get started, you must first allow the browser to access your camera and microphone.
                                                    Click the button below to accept the browser permissions and continue to the Creator Studio.
                                                </p>
                                            </GridItem>
                                            <GridItem xs={2} md={4} lg={4} ></GridItem>
                                            <GridItem xs={8} md={4} lg={4} >
                                                <button className={classes.enableCameraButton} onClick={enableCamera}>
                                                    Enable your camera and microphone
                                                </button>
                                            </GridItem>
                                            <GridItem xs={2} md={4} lg={4} ></GridItem>
                                        </GridContainer>
                                    }
                                </div>
                            )}
                        </GridItem>
                        {liveStreamStarted && (demoState == STATES.STREAMING) &&
                            <>
                                <GridItem xs={12} sm={12} md={8} className={classes.videoTopBar}>
                                    {liveStreamStarted && cameraEnabled &&
                                        <GridContainer>
                                            <GridItem xs={4} sm={6} md={3}>
                                                <span className={classes.clock}>{clockTime} <span className={classes.clockLabel}>Left</span></span>

                                            </GridItem>
                                            {cameraEnabled && streaming && !isIOS.current && <>
                                                <GridItem xs={4} sm={3} md={4}>
                                                    <Button
                                                        color="transparent"
                                                        size="sm"
                                                        border="1px solid"
                                                        target="_blank"
                                                        href={`/playback?hls=${livePlayback.locatorUrl.hls}.m3u8`}
                                                    >
                                                        <PlayArrow className={classes.icons} /> Watch the stream
                                                    </Button>
                                                </GridItem>
                                                <GridItem xs={10} sm={3} md={4}>{playBackButton}</GridItem>
                                            </>}
                                            {cameraEnabled && streaming && isIOS.current && <>
                                                <GridItem xs={4} sm={3} md={4}>
                                                    {playBackButton}
                                                </GridItem>
                                            </>}
                                        </GridContainer>
                                    }
                                </GridItem>

                            </>

                        }
                        {(demoState == STATES.STREAMING) &&

                            <GridItem id="studio" xs={12} sm={12} md={8}>
                                <div className={`${classes.videoContainer} ${cameraEnabled && classes.cameraEnabled
                                    }`}
                                >
                                    {liveStreamStarted && cameraEnabled &&
                                        <div
                                            className={`${classes.streamStatus} ${connected ? classes.connected : classes.disconnected
                                                }`}
                                        >
                                            {connected ? 'Live' : 'Disconnected'}
                                        </div>
                                    }
                                    <div className={classes.inputVideo}>
                                        <video ref={videoRef} muted playsInline></video>
                                    </div>
                                    <div className={classes.outputCanvas}>
                                        <canvas ref={canvasRef}></canvas>
                                    </div>
                                    {liveStreamStarted && cameraEnabled && streaming &&
                                        <div className={classes.playerControls}>
                                            <Button
                                                className={classes.stopButton}
                                                color="danger"
                                                size="sm"
                                                onClick={() => setStopStreamModal(true)}
                                            >
                                                <StopRounded className={classes.icons} /> Stop
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </GridItem>
                        }
                        {(demoState == STATES.STREAMING) &&
                            <GridItem id="videoSideNav" xs={12} sm={12} md={4} className={classes.videoSideNav} >
                                {cameraEnabled && streaming &&
                                    < div >
                                        <span className={classes.productTitle}>Products</span>
                                        <ProductSection onProductSelected={productSelected} />
                                    </div>
                                }
                                {cameraEnabled && !streaming && !isIOS.current &&
                                    <>
                                        <label>Camera input</label><br />
                                        <CameraFrontOutline className={classes.cameraIcon}></CameraFrontOutline>
                                        <select
                                            placeholder="finding devices..."
                                            className={classes.selectCamera}
                                            type="text"
                                            width="30"
                                            onChange={(e) => setCamera(e.target.value)}>
                                            {cameras.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
                                        </select>
                                        <br />
                                        <label>Microphone input</label><br />
                                        <MicrophoneOutline className={classes.micIcon}></MicrophoneOutline>
                                        <select
                                            placeholder="finding devices..."
                                            className={classes.selectMic}
                                            type="text"
                                            width="30"
                                            onChange={(e) => setMicrophone(e.value)}>
                                            {microphones.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
                                        </select>
                                    </>
                                }

                                {cameraEnabled && !streaming &&
                                    <>
                                        <Button
                                            onClick={startStreaming}
                                            className={classes.startButton}
                                            disabled={!liveStreamStarted}
                                            color="danger"
                                            size="sm"
                                        >
                                            Start Streaming
                                        </Button>
                                        <p></p>
                                        {/*    {!isIOS.current && sharePlaybackUrl} */}
                                    </>
                                }

                            </GridItem>
                        }
                    </GridContainer>
                    <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal,
                        }}
                        open={stopStreamModal}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="into-modal-slide-title"
                        aria-describedby="into-modal-slide-description"
                    >
                        <DialogContent
                            id="intro-modal-slide-description"
                            className={classes.modalBody}
                        >
                            <div>
                                <h3>Stop stream?</h3>
                                <p>
                                    By ending the stream now, we'll redirect you back to the homepage.
                                </p>
                            </div>

                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <Button
                                        onClick={() => completeDemo()}
                                        color="danger"
                                        size="lg"
                                    >
                                        Yes, end stream
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7}>
                                    <Button
                                        color="transparent"
                                        size="lg"
                                        border="1px solid"
                                        rel="noreferrer"
                                        aria-label="No, continue streaming"
                                        onClick={() => {
                                            setStopStreamModal(false);
                                        }
                                        }
                                    >
                                        No, continue streaming
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </DialogActions>
                    </Dialog>

                    {demoState == STATES.COMPLETE &&
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} className={classes.demoComplete}>
                                <div>Thanks for trying the demo.</div>
                                <br></br>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className={classes.demoComplete}>
                                <Button
                                    color="transparent"
                                    size="sm"
                                    border="1px solid"
                                    target="_blank"
                                    href={`/playback?hls=${livePlayback.locatorUrl.hls}.m3u8`}
                                >
                                    <PlayArrow className={classes.icons} /> Watch the stream replay for up to 10 minutes
                                </Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className={classes.demoComplete}>
                                <Link href="/demo">
                                    <a className={classes.link} aria-label="restart">
                                        Restart demo
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a className={classes.link} aria-label="Return to homepage">
                                        Return to home
                                    </a>
                                </Link>
                            </GridItem>
                        </GridContainer>
                    }

                </div>
                <FreeSection />
                <Footer whiteFont logoColor="gray" />
            </div>
        </div >
    );
};

export async function getStaticPaths() {
    const paths = getAllLanguageSlugs();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const language = getLanguage(params.lang);

    // These values are set in the Github Actions workflow build yaml file in the .github/workflows/azure-static-web-apps-xxxx.yml file.
    const CONTAINERAPPURL = process.env.CONTAINERAPPURL;
    console.log(`Static prop CONTAINERAPPURL= ${CONTAINERAPPURL}`);

    // The timeout for the live stream before cutoff. 
    const TIMEOUT_LIVE_STREAM_SECONDS = process.env.TIMEOUT_LIVE_STREAM_SECONDS

    return {
        props: {
            language,
            CONTAINERAPPURL,
            TIMEOUT_LIVE_STREAM_SECONDS
        },
    };
}