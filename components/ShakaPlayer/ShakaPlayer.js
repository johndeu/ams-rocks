// This Shaka Player component for Next.js is based on the 
// following sample https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player 

import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/playerStyle.js";

// this imports the npm shaka-player dist package. The page loading this has to dynamic load this component
// const ShakaPlayer=dynamic(import ("components/ShakaPlayer/ShakaPlayer.js"),{ssr:false});
const shaka = require('shaka-player/dist/shaka-player.ui.js');

class ShakaPlayer extends React.Component  {

    constructor(props){

        super(props);

        this.video = React.createRef();
        this.videoContainer = React.createRef();
        this.classes = makeStyles(styles);
    }

    componentDidMount(){

        var manifestUri = this.props.manifestUrl;
        var licenseServer = this.props.licenseServer;
        
        let video = this.video.current;
        let videoContainer = this.videoContainer.current;

        var player = new shaka.Player(video);

        const ui = new shaka.ui.Overlay(player, videoContainer, video);
        const controls = ui.getControls();
        
        console.log(Object.keys(shaka.ui));

        player.configure({
            drm: {
              servers: { 'com.widevine.alpha': licenseServer }
            }
          });

        const onError = (error) => {
            // Log the error.
            console.error('Error code', error.code, 'object', error);
        }

        player.load(manifestUri).then(function() {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
            video.play();
          }).catch(onError);  // onError is executed if the asynchronous load fails.
    }

    render() {
        return <div ref={this.videoContainer} >
            <span className={this.classes.span}>Player Component {this.manifestUri} </span>
            <video
                id="video"
                ref={this.video}
                playsInline
                autoPlay
                style={{
                    maxWidth: '100%',
                    width: '100%'
                }}
                poster={this.props.posterUrl}
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

