import React from 'react';
import PropTypes from 'prop-types';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";
import controlStyles from "shaka-player/dist/controls.css";
import { type } from 'os';

const classes = makeStyles(styles);

class ShakaPlayer extends React.PureComponent {

    constructor(props) {

        super(props);

        this.video = React.createRef();
        this.videoContainer = React.createRef();
        this.state = {
            presentationStartTime: {},
            stats: [],
            bufferdInfo: {}
        }


    }

    componentDidMount() {

        var src = this.props.src;

        var licenseServer = this.props.licenseServer;
        var raised = this.props.raised;

        let video = this.video.current;
        let videoContainer = this.videoContainer.current;

        var player = new shaka.Player(video);

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

        //console.log(Object.keys(shaka.ui));

        player.configure({
            manifest: {
                dash: {
                    autoCorrectDrift: true
                },
                hls: {
                    ignoreManifestProgramDateTime : false,
                }
            },
            streaming: {
                lowLatencyMode: true,
                inaccurateManifestTolerance: 0,
                useNativeHlsOnSafari: true,
                gapDetectionThreshold: 0.5,
            },
            drm: {
                servers: { 'com.widevine.alpha': licenseServer }
            }
        });

        const onError = (error) => {
            // Log the error.
            console.error('Error code', error.code, 'object', error);
        }

        player.load(src, null, "application/vnd.apple.mpegURL").then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
        }).catch(onError);  // onError is executed if the asynchronous load fails.

        // Event listeners
        player.addEventListener('loaded', this.onLoaded(this.video.current));


        this.timerID = setInterval(
            () => this.statsTick(player, this.video.current),
            1000
        );
    }

    statsTick(player, video) {
        if (player !== undefined) {
            var stats = player.getStats();
            var bufferedInfo = player.getBufferedInfo();
            var playHeadTime = player.getPlayheadTimeAsDate();

            this.state.presentationStartTime = player.getPresentationStartTimeAsDate();

            if (video && video.getStartDate) {
                const startDate = video.getStartDate();
                if (isNaN(startDate.getTime())) {
                    console.error("EXT-X-PROGRAM-DATETIME required to get playhead time as date!");
                }
                console.log ("StarDate:" + new Date( startDate.getTime + (player.playhead.getTime() * 1000))) 
            }else {
                //console.log ("No start time");
            }

            if (bufferedInfo) {
                this.props.onBufferedInfoUpdate(bufferedInfo);
            }
            if (stats) {
                this.props.onStatsUpdate(stats, this.state.presentationStartTime );
            }
            if (playHeadTime) {
                this.props.onPlayHeadTimeUpdate(playHeadTime);
            }

        }
    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    // Event Handlers
    onLoaded(currentPlayer) {
        currentPlayer.play();
        //console.log('Shaka: Playing');

    }


    render() {
        return (
            <div ref={this.videoContainer} >
                <video
                    id="video"
                    ref={this.video}
                    autoPlay
                    muted
                    loop
                    playsInline
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
    onStatsUpdate: PropTypes.func,
    onBufferedInfoUpdate: PropTypes.func,
    onPlayHeadTimeUpdate: PropTypes.func,
    stats: PropTypes.object,
    raised: PropTypes.bool,
}

export default ShakaPlayer;