import React, { useState, setState, useEffect, useRef } from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import moment from "moment";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Use framer-motion
import { motion } from "framer-motion";
// Use the react-intersection-observer to trigger animations when stuff is in view
import { useInView } from "react-intersection-observer";


// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import Button from "components/CustomButtons/Button.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";
import FreeLive from "pages-sections/LandingPage-Sections/SectionFreeLive.js";

// Need to dynamic load the Shaka Player since it imports a standard Javascript library
// See the documentation here - https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player
const ShakaPlayer = dynamic(import("components/ShakaPlayer/ShakaPlayerClass.js"), { ssr: false });

import styles from "styles/jss/nextjs-material-kit/pages/livePage.js";
import Hidden from "@material-ui/core/Hidden";

// Sections for this page

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';
const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function basicPage(props) {
  const classes = useStyles();
  const router = useRouter();

  const { ...rest } = props;
  const [src, setSrc] = useState(router.query.hls);
  const [userAgent, setUserAgent] = useState("");
  const [isIos, setIsIos] = useState(false);
  const [stats, setStats] = useState({});
  const [bufferTime, setBufferTime] = useState(30); //default for Shaka player is 30 seconds of buffer
  const [playHeadTime, setPlayHeadTime] = useState(moment.utc());

  const playerRef = useRef();
  const videoRef = useRef();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const playerClasses = classNames(
    classes.player,
    classes.imgRaised,
    classes.imgRoundedCircle,
  );

  // On page loaded
  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setIsIos(/iPhone/.test(userAgent));

    // Get the playback url
    if (router.query.hls) {
      // set the HLS path
      setSrc(router.query.hls)
      console.log(`HLS path found : ${router.query.hls}`)
    } else {
      console.log(`No HLS path`)
    }
  })

  const onInitPlayer = (player) => {
    // Attach the player and video element to the window for easy debugging in browser console.
    window.player = player
    playerRef.current = player;
    console.log("Got the player object from Shaka player");

/*     window.analyticsTool = new AzurePlayerAnalytics.ShakaPlayerAnalytics(player, player.getMediaElement(), {
      endpoint: "https://amsts631.sf.media.azure-test.net:9025/ClientAnalytics",
      token: 'johndeumdflkdsmflkdsmdflsdkljbd',
      pollingInterval: 15,
    })  */
  }

  const onStatsUpdate = (stats) => {

  }

  const onBufferedInfoUpdate = (bufferInfo) => {

  }

  const onPlayHeadTimeUpdate = (playHeadTime) => {

  }

  return (
    <>
      <React.Fragment>
        <Head>
          <script src="https://unpkg.com/azure-media-playeranalytics@1.0.1/dist/shaka.js"></script>
          <link href="https://unpkg.com/tabulator-tables@5.2.3/dist/css/tabulator_bootstrap4.min.css" rel="stylesheet"/>
          <script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.2.3/dist/js/tabulator.min.js"></script>
        </Head>
      </React.Fragment>
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
        <div className={classes.subHeaderBanner} >
          <h3>Watch your live stream</h3>
        </div>
        <div className={classes.section}>
          <div className={classes.container}>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={2} md={1}></GridItem>
                  <GridItem xs={12} sm={10} md={10} className={playerClasses} >

                    <ShakaPlayer
                      src={src}
                      ref={playerRef}
                      posterUrl=""
                      stats={stats}
                      raised
                      onInitPlayer={onInitPlayer}
                      onStatsUpdate={onStatsUpdate}
                      onBufferedInfoUpdate={onBufferedInfoUpdate}
                      onPlayHeadTimeUpdate={onPlayHeadTimeUpdate}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={2} md={1}></GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>

          </div>
          <FreeSection />
          <Footer whiteFont logoColor="gray" />
        </div>

      </div></>
  );
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}