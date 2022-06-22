import React from 'react';
import PropTypes from 'prop-types';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";
import controlStyles from "shaka-player/dist/controls.css";

const classes = makeStyles(styles);

class ShakaPlayer extends React.PureComponent {

    constructor(props) {

        super(props);

        this.video = React.createRef();
        this.videoContainer = React.createRef();
    }

    componentDidMount() {

        var src = this.props.src;
        var licenseServer = this.props.licenseServer;

        let video = this.video.current;
        let videoContainer = this.videoContainer.current;

        var player = new shaka.Player(video);

        const ui = new shaka.ui.Overlay(player, videoContainer, video);
        const controls = ui.getControls();

        const uiConfig = {
            'controlPanelElements': [/*'play_pause', 'time_and_duration',*/ 'spacer', 'volume', 'mute', /*'fullscreen'*/],
            'addSeekBar': true,
            'seekBarColors': {
                base: 'rgba(255, 255, 255, 0.3)',
                buffered: 'rgba(255, 255, 255, 0.54)',
                played: 'rgb(255, 255, 255)',
            }
        }
        ui.configure(uiConfig);

        console.log(Object.keys(shaka.ui));

        player.configure({
            manifest: {
                dash: {
                    // autoCorrectDrift: true
                },
                hls: {
                    // ignoreManifestProgramDateTime : false,
                }
            },
            streaming: {
                //If true, low latency streaming mode is enabled. If lowLatencyMode is set to true, inaccurateManifestTolerance is set to 0 unless specified, and rebufferingGoal to 0.01 unless specified at the same time.
                lowLatencyMode: true,
                inaccurateManifestTolerance: 0,
                rebufferingGoal: 0.01,
                jumpLargeGaps: true,
                useNativeHlsOnSafari: false,
                gapDetectionThreshold: 0.5
            },
            drm: {
                servers: { 'com.widevine.alpha': licenseServer }
            }
        });


        const onError = (error) => {
            // Log the error.
            console.error('Error code', error.code, 'object', error);
        }

        player.load(src).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
        }).catch(onError);  // onError is executed if the asynchronous load fails.
    }

    render() {
        return (
            <div className="shadow-lg mx-auto max-w-full" ref={this.videoContainer} style={{ "width": "800px" }}>
                <video
                    id="video"
                    ref={this.video}
                    className="w-full h-full"
                    autoPlay
                    muted
                    style={{
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: "#5e5e5e",
                        borderRadius: "15px !important",
                        boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
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
    posterUrl: PropTypes.string
}

export default ShakaPlayer;