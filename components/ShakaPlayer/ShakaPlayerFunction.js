// This Shaka Player component for Next.js is based on the 
// following sample https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player 

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";
import controlStyles from "shaka-player/dist/controls.css";

// this imports the npm shaka-player dist package. The page loading this has to dynamic load this component
// const ShakaPlayer=dynamic(import ("components/ShakaPlayer/ShakaPlayerFunction.js"),{ssr:false});
const shaka = require('shaka-player/dist/shaka-player.ui.js');
const classes = makeStyles(styles);

function ShakaPlayer({ 
    src, 
    className, 
    licenseServer, 
    rounded, 
    raised, 
    config, 
    posterUrl, 
    ...rest },
     ref) {

    const uiContainerRef = React.useRef(null);
    const videoRef = React.useRef(null);

    const [player, setPlayer] = React.useState(null);
    const [ui, setUi] = React.useState(null)

    // Import the control styles from the Shaka player dist for controls.css
    makeStyles(controlStyles);

    React.useEffect(() => {
        const player = new shaka.Player(videoRef.current);
        setPlayer(player);

        const ui = new shaka.ui.Overlay(
            player,
            uiContainerRef.current,
            videoRef.current
        )
        setUi(ui);

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

        const onError = (error) => {
            // Log the error.
            console.error('Error code', error.code, 'object', error);
        }

        // OPTIONAL - log the default configuration settings. 
        console.log("Shaka Player Default configuration");
        console.log(player.getConfiguration());

        // See https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#StreamingConfiguration
        player.configure({
            manifest: {
                dash: {
                    // autoCorrectDrift: true
                },
                hls : {
                    // ignoreManifestProgramDateTime : false,

                }
            },
            streaming: {
                //If true, low latency streaming mode is enabled. If lowLatencyMode is set to true, inaccurateManifestTolerance is set to 0 unless specified, and rebufferingGoal to 0.01 unless specified at the same time.
                lowLatencyMode: true,
                inaccurateManifestTolerance:0,
                rebufferingGoal: 0.01,
                jumpLargeGaps: true,
                useNativeHlsOnSafari: false,
                gapDetectionThreshold: 0.5
            },
            drm: {
                servers: { 'com.widevine.alpha': licenseServer }
            }
        });

        // OPTIONAL - log the default configuration settings. 
        console.log("Shaka Player Updated configuration");
        console.log(player.getConfiguration());

        player.setTextTrackVisibility(true);

        player.load(src).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('Shaka: The video has now been loaded!');
        }).catch(onError);  // onError is executed if the asynchronous load fails.

        player.addEventListener('error', function (event) {
            // Extract the shaka.util.Error object from the event.
            let error = event.detail;
            console.error('Shaka error code', error.code, 'object', error);
        });

        player.addEventListener('loaded', function (event) {
            player.play();
            console.log('Shaka: Playing');
        });

        return () => {
            player.destroy();
            if (ui) {
                ui.destroy();
            }
        };

    }, []);

    // Keep shaka.Player.configure in sync.
    React.useEffect(() => {
        if (player && config) {
            player.configure(config);
        }
    }, [player, config]);

    // Load the source url when we have one.
    React.useEffect(() => {
        if (player && src) {
            player.load(src);
        }
    }, [player, src]);


    React.useImperativeHandle(
        ref,
        () => ({
            get player() {
                return player;
            },
            get ui() {
                return ui;
            },
            get videoElement() {
                return videoRef.current;
            }
        }),
        [player, ui]
    )

    return (
        <div id="shakaPlayerRoot">
            <div ref={uiContainerRef} className={classes.playerRaised} >
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    style={{
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor:"#5e5e5e",
                        borderRadius: "15px !important",
                        boxShadow:  "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
                    }}
                    muted
                    poster={posterUrl}
                    {...rest}
                />
            </div>
        </div>);
}

export default React.forwardRef(ShakaPlayer);

