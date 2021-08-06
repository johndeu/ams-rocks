// This Shaka Player component for Next.js is based on the 
// following sample https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player 

import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";
import controlStyles from "shaka-player/dist/controls.css";

// this imports the npm shaka-player dist package. The page loading this has to dynamic load this component
// const ShakaPlayer=dynamic(import ("components/ShakaPlayer/ShakaPlayer.js"),{ssr:false});
const shaka = require('shaka-player/dist/shaka-player.ui.js');
 

class ShakaPlayer extends React.Component {

    constructor(props) {

        super(props);

        this.video = React.createRef();
        this.videoContainer = React.createRef();
        
        // Import the playerStyle.js 
        this.classes = makeStyles(styles);

        // Import the control styles from the Shaka player dist for controls.css
        makeStyles(controlStyles);
    }

    componentDidMount() {
        var manifestUri = this.props.manifestUrl;
        var licenseServer = this.props.licenseServer;

        let video = this.video.current;
        let videoContainer = this.videoContainer.current;

        var player = new shaka.Player(video);

        const ui = new shaka.ui.Overlay(player, videoContainer, video);
        const uiConfig = {
            'controlPanelElements' : ['play_pause','time_and_duration', 'spacer','volume','mute','fullscreen','quality'],
            'addSeekBar': true,
            'seekBarColors': {
                base: 'rgba(255, 255, 255, 0.3)',
                buffered: 'rgba(255, 255, 255, 0.54)',
                played: 'rgb(255, 255, 255)',
              }
        }
        ui.configure (uiConfig);
        const controls = ui.getControls();

        console.log(Object.keys(shaka.ui));

        const onError = (error) => {
            // Log the error.
            console.error('Error code', error.code, 'object', error);
        }

        player.configure({
            manifest: {
                dash: {
                    // autoCorrectDrift: true
                }
            },
            streaming: {
                lowLatencyMode: true,
                stallEnabled: true,
                //bufferingGoal: 10,
                //rebufferingGoal: 2,
                //bufferBehind: 12,
                jumpLargeGaps: true,
                useNativeHlsOnSafari: true,
                gapDetectionThreshold: 0.5
            },
            drm: {
                servers: { 'com.widevine.alpha': licenseServer }
            }
        });

        player.setTextTrackVisibility(true);

        player.load(manifestUri).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');

            // Trigger play.
            video.play();

        }).catch(onError);  // onError is executed if the asynchronous load fails.
    }

    render() {
        return <div ref={this.videoContainer} >
          <video
                id="video"
                ref={this.video}
                autoPlay
                style={{
                    maxWidth: '100%',
                    width: '100%'
                }}
                poster={this.props.posterUrl}
                {...this.props} // ...rest
            />
        </div>;
    }
}

ShakaPlayer.propTypes = {
    licenseServer: PropTypes.string,
    manifestUrl: PropTypes.string,
    posterUrl: PropTypes.string
}

export default ShakaPlayer

