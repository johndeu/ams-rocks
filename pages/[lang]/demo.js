// Notices of usage - this page is using code from the Muxlabs/wocket project on github - https://github.com/MuxLabs/wocket
// This uses code from that demo project to stream from the browser over RTMP to Azure Media Services.
// It also includes portions of the pull request from @dugaraju to support streaming to any RTMP server - https://github.com/MuxLabs/wocket/pull/20

import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head';
import moment from 'moment';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';

const dashboardRoutes = [];

import styles from "styles/jss/nextjs-material-kit/pages/demoPage.js";
const useStyles = makeStyles(styles);


const CAMERA_CONSTRAINTS = {
    audio: true,
    video: true,
    video: { facingMode: "user", aspectRatio: 1.777 }, // force 16:9 aspect
    width: { min: 640, ideal: 1280, max: 1280 },
    height: { min: 360, ideal: 720, max: 720 },
};


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

    const [connected, setConnected] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [streamKey, setStreamKey] = useState(null);
    const [streamUrl, setStreamUrl] = useState(null);
    const [textOverlay, setTextOverlay] = useState('Live from the browser!');
    const [cameras, setVideoInputs] = useState([]);
    const [microphones, setAudioInputs] = useState([]);
    const [canvas, setCanvas] = useState([]);

    const inputStreamRef = useRef();
    const videoRef = useRef();
    const canvasRef = useRef();
    const wsRef = useRef();
    const mediaRecorderRef = useRef();
    const requestAnimationRef = useRef();
    const nameRef = useRef();



    const enableCamera = async () => {
        inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
            CAMERA_CONSTRAINTS
        );

        videoRef.current.srcObject = inputStreamRef.current;

        await videoRef.current.play();

/*         // If we support offscreen canvas, move it there to improve performance
       var canvas = 'OffscreenCanvas' in window
                ? canvasRef.current.transferControlToOffscreen()
                : canvasRef.current; */

        // set the width and height for the offscreen canvas 
        //canvas.style = {width: videoRef.current.clientWidth, height: videoRef.current.clientHeight};

        // We need to set the canvas height/width to match the video element.
        canvasRef.current.height = videoRef.current.clientHeight;
        canvasRef.current.width = videoRef.current.clientWidth;

        //spawn a worker thread off main
        /* if (window.Worker) {
        const worker = new Worker('/scripts/demoworker.js');
        worker.postMessage({ canvas: canvas, ended: videoRef.current.ended}, [ canvas]);

        //requestAnimationRef.current = worker.requestAnimationFrame(updateCanvas);
        } else {
            requestAnimationRef.current = requestAnimationFrame(updateCanvas);
        }
        */
        requestAnimationRef.current = requestAnimationFrame(updateCanvas);
        setCameraEnabled(true);
    };

    const updateCanvas = () => {
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

        ctx.fillStyle = '#FFF';
        ctx.font = '24px Segoe UI';
        const date = new Date();
        const dateText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds().toString().padStart(3, '0')}`;
        ctx.fillText(`${nameRef.current}${dateText}`, 10, 50, canvasRef.current.width - 20);

        requestAnimationRef.current = requestAnimationFrame(updateCanvas);
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

    const startStreaming = () => {
        setStreaming(true);
        const settings = getRecorderSettings();

        // use the CONTAINER_APP_URL as the main URL 
        // this is obtained on the Overview blade for the container App in Azure portal, under the Application Url. 
        const containerWsUrl = props.CONTAINERAPPURL.replace('http', 'ws');
        const wsUrl = new URL(`${containerWsUrl}/rtmp?key=${streamKey}`);

        wsUrl.searchParams.set('video', settings.video);
        wsUrl.searchParams.set('audio', settings.audio);

        if (streamUrl) {
            wsUrl.searchParams.set('url', streamUrl);
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
            videoBitsPerSecond: 3000000,
        });

        mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
            wsRef.current.send(e.data);
        });

        mediaRecorderRef.current.addEventListener('stop', () => {
            stopStreaming();
            wsRef.current.close();
        });

        mediaRecorderRef.current.start(1000);
    };

    // This effect only gets called on first load of page. 
    useEffect(() => {

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

        return () => {
            cancelAnimationFrame(requestAnimationRef.current);
        };
    }, [])

    // This effect is called when the textOverlay value changes
    useEffect(() => {
        nameRef.current = textOverlay;
    }, [textOverlay]);


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
                        <GridItem xs={12} sm={12} md={8}>
                            <div className={`${classes.videoContainer} ${cameraEnabled && classes.cameraEnabled
                                }`}
                            >
                                {!cameraEnabled && (
                                    <button className={classes.startButton} onClick={enableCamera}>
                                        Enable Camera
                                    </button>
                                )}
                                <div className={classes.inputVideo}>
                                    <video ref={videoRef} muted playsInline></video>
                                </div>
                                <div className={classes.outputCanvas}>
                                    <canvas ref={canvasRef}></canvas>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            {cameraEnabled &&
                                (streaming ? (
                                    <div>
                                        <span
                                            className={`${classes.streamStatus} ${connected ? classes.connected : classes.disconnected
                                                }`}
                                        >
                                            {connected ? 'Connected' : 'Disconnected'}
                                        </span>
                                        <input
                                            placeholder="Text Overlay"
                                            type="text"
                                            value={textOverlay}
                                            onChange={(e) => setTextOverlay(e.target.value)}
                                        />
                                        <button onClick={stopStreaming}>Stop Streaming</button>
                                    </div>
                                ) : (
                                    <>
                                        <label>Nickname</label><br />
                                        <input
                                            className={classes.inputTextBox}
                                            placeholder="Enter your nickname"
                                            type="text"
                                            onChange={(e) => setNickname(e.target.value)} />
                                        <br />
                                        <label>Camera input</label><br />
                                        <select

                                            placeholder="finding devices..."
                                            type="text"
                                            onChange={(e) => setCamera(e.target.value)}>

                                            {cameras.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}

                                        </select>



                                        <br />

                                        <label>Microphone input</label><br />
                                        <select
                                            placeholder="finding devices..."
                                            type="text"
                                            onChange={(e) => setMicrophone(e.value)}>
                                            {microphones.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
                                        </select>
                                        <br />
                                        <label>RTMP/S stream URL</label><br />
                                        <input
                                            className={classes.inputTextBox}
                                            placeholder="rtmps://"
                                            type="text"
                                            onChange={(e) => setStreamUrl(e.target.value)}
                                        /><br />
                                        <label>Stream key</label><br />
                                        <input
                                            className={classes.inputTextBox}
                                            placeholder="Stream key"
                                            type="text"
                                            onChange={(e) => setStreamKey(e.target.value)}
                                        /><br />
                                        <button
                                            className={classes.startButton}
                                            disabled={!streamKey}
                                            onClick={startStreaming}
                                        >
                                            Start Streaming
                                        </button><br />
                                        <button
                                            disabled
                                            className={classes.shareButton}
                                        >
                                            Share event with viewers
                                        </button>
                                    </>
                                ))}

                        </GridItem>
                    </GridContainer>
                </div>
                <FreeSection />
                <Footer whiteFont logoColor="gray" />
            </div>
        </div>
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
    const TIMEOUT = process.env.TIMEOUT

    return {
        props: {
            language,
            CONTAINERAPPURL,
            TIMEOUT
        },
    };
}