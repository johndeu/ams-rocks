import React from 'react';
import PropTypes from 'prop-types';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";
import controlStyles from "shaka-player/dist/controls.css";

// nodejs library that concatenates classes
import classNames from "classnames";

const classes = makeStyles(styles);

class ShakaPlayer extends React.PureComponent {

    constructor(props) {

        super(props);

        this.video = React.createRef();
        this.videoContainer = React.createRef();
        this.state = {
            source: props.src,
            presentationStartTime: {},
            stats: [],
            bufferedInfo: {}
        }

    }

    componentDidMount() {

        var src = this.props.src;
        var licenseServer = this.props.licenseServer;
        var raised = this.props.raised;

        let video = this.video.current;
        let videoContainer = this.videoContainer.current;
        let player = new shaka.Player(video);
        document.addEventListener('shaka-ui-loaded', this.init(player, video, src));
        console.log("Shaka component mounted. Waiting for Shaka UI to load...")

        const ui = new shaka.ui.Overlay(player, videoContainer, video);
        const controls = ui.getControls();
        const uiConfig = {
            'controlPanelElements': ['play_pause', 'spacer', 'volume', 'mute', 'fullscreen'],
            'addSeekBar': true,
            'enableTooltips': true,
            'contextMenuElements': ['statistics'],
            'customContextMenu': true,
            'statisticsList': ['width', 'height', 'playTime', 'liveLatency', 'bufferingTime', 'droppedFrames', 'stallsDetected', 'manifestTimeSeconds', 'loadLatency'],
            'seekBarColors': {
                base: 'rgba(255, 255, 255, 0.3)',
                buffered: 'rgba(255, 255, 255, 0.54)',
                played: 'rgb(255, 255, 255)',
            }
        }
        ui.configure(uiConfig);

        player.configure({
            manifest: {
                dash: {
                    autoCorrectDrift: true
                },
                hls: {
                    ignoreManifestProgramDateTime: false,
                }
            },
            streaming: {
                lowLatencyMode: true,
                inaccurateManifestTolerance: 0,
                useNativeHlsOnSafari: true,
            },
            drm: {
                servers: { 'com.widevine.alpha': licenseServer }
            }
        });
    }

    init(player, video, src) {
        console.log("Shaka component Init()")

        // Event listeners
        player.addEventListener('loaded', this.onLoaded(video));
        player.addEventListener('onstatechange', this.onStateChange);
        player.addEventListener('emsg', this.onEventMessage); // fires when a timed metadata event is sent

        // Video tag listeners
        // Listen for  HTML5 Video Element events
        // Reference : https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
        video.addEventListener('pause', this.onPause);
        video.addEventListener('play', this.onPlay);
        video.addEventListener('canplay', this.onCanPlay(video));
        video.addEventListener('seeking', this.onSeeking(video));

        // Enable captions
        player.setTextTrackVisibility(true);

        player
            .load(src)
            .then(function () {
                // This runs if the asynchronous load is successful.
                console.log('The video has now been loaded!');
                player.setTextTrackVisibility(true);
            })
            .catch((error) => {
                // Log the error.
                console.error('Error code', error.code, 'object', error);
            });  // onError is executed if the asynchronous load fails.

        if (this.props.onInitPlayer) {
            // Pass the player up to parent if needed
            this.props.onInitPlayer(player);
        }

        this.timerID = setInterval(
            () => this.statsTick(player, video),
            1000
        );


    }

    statsTick(player, video) {
        if (video && video.isPaused) {
            console.log('Paused');
            return;
        }

        if (player !== undefined && video !== undefined) {

            var stats = player.getStats();
            var bufferedInfo = player.getBufferedInfo();
            var playHeadTime = player.getPlayheadTimeAsDate();

            var presentationStartTimeDate = player.getPresentationStartTimeAsDate();

            if (presentationStartTimeDate) {
                this.state.presentationStartTime = player.getPresentationStartTimeAsDate();

                var latency = (Date.now() - (player.getPresentationStartTimeAsDate().valueOf() + video.currentTime * 1000)) / 1000
            }

            // In theory this code SHOULD work, but it breaks Next.js on iOS for some reason. No clue why. 

            /*        if (video && video.getStartDate) {
                       const startDate = video.getStartDate();
                       if (isNaN(startDate.getTime())) {
                           console.error("EXT-X-PROGRAM-DATETIME required to get playhead time as date!");
                       }
                       console.log("StartDate:" + new Date(startDate.getTime + (player.playhead.getTime() * 1000)))
                   } else {
                       //console.log ("No start time");
                   } */

            if (bufferedInfo) {
                this.props.onBufferedInfoUpdate(bufferedInfo);
            }
            if (stats) {
                this.props.onStatsUpdate(stats, this.state.presentationStartTime);
            }
            if (playHeadTime) {
                this.props.onPlayHeadTimeUpdate(playHeadTime);
            }
            if (latency) {
                this.props.onLatencyUpdate(latency);
            }

        }
    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    // Event Handlers
    onLoaded(videoElement) {
        console.log('Shaka: Loaded');

    }

    onPause() {
        console.log('Shaka: Paused');
        this.isPaused = true;
    }

    onPlay() {
        console.log('Shaka: Playing');
        this.isPaused = false
    }

    onSeeking(video) {
        console.log('Video seeking...');
        video.play(); //used to force playback of LL-HLS demo from AMS
    }

    onCanPlay(video) {
        console.log('Video: CanPlay');
        
    }

    onStateChange(event) {
        console.log('Player State:', event.state);
    }

    onEventMessage(event) {
        console.log('Timed Metadata Event Message');
        console.log('emsg:', event);

        // emsg box information are in emsg.details
        const dataMsg = new TextDecoder().decode(emsg.detail.messageData);
        console.log('EMSG: Scheme = ' + emsg.detail.schemeIdUri);
        console.log('EMSG: StartTime = ' + emsg.detail.startTime);
        console.log('EMSG: endTime = ' + emsg.detail.endTime);
        console.log('EMSG: timescale = ' + emsg.detail.timescale);
        console.log('EMSG: duration = ' + emsg.detail.eventDuration);
        console.log('EMSG: message length = ' + emsg.detail.messageData.length);
        console.log('EMSG: message = ' + dataMsg);
    }

    render() {
        return (
            <div ref={this.videoContainer} data-shaka-player-cast-receiver-id="BBED8D28">
                <video
                    id="video"
                    ref={this.video}
                    autoPlay
                    playsInline
                    muted
                    style={{
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: "rgba(0,0,0,0.7)",
                    }}
                    poster={this.props.posterUrl}>
                </video>
            </div>
        );

    }
}

ShakaPlayer.propTypes = {
    licenseServer: PropTypes.string,
    src: PropTypes.string,
    posterUrl: PropTypes.string,
    onInitPlayer: PropTypes.func,
    onStatsUpdate: PropTypes.func,
    onBufferedInfoUpdate: PropTypes.func,
    onPlayHeadTimeUpdate: PropTypes.func,
    onLatencyUpdate: PropTypes.func,
    stats: PropTypes.object,
    className: PropTypes.string,
}

export default ShakaPlayer;