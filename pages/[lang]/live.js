import React, { useState, setState } from "react";
import dynamic from 'next/dynamic';

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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";

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
const STREAMS = [
  {
    name: 'Mux Live Low Latency',
    src:
      'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
    location: "Unknown"
  },
  {
    name: 'AMS LL-HLS Demo Stream',
    src: 'https://aka.ms/LowLatencyDemo.m3u8',
    location: "US West"
  },
  {
    name: 'Azure Media Services Promo',
    src: 'https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest(format=m3u8-cmaf)',
    location: "US West"
  }
];


export default function LandingPage(props) {
  const classes = useStyles();
  const router = useRouter();

  const { ...rest } = props;
  const ref = React.useRef();
  const [src, setSrc] = useState(STREAMS[1].src);
  const [location, setLocation] = useState(STREAMS[1].location);
  const [stats, setStats] = useState({});

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

  function onStatsUpdate(statsUpdate) {
    setStats(statsUpdate);
    //console.log("Got Stats from Player:");
  }

  return (
    <div style={{ backgroundImage: "url('/img/Mainheader_image-2.png')" }}>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={i18next.t('landing.title')}
        leftLinks={<HeaderLinksLeft />}
        rightLinks={<HeaderLinksRight />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.section}>
        <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>

                <GridContainer>
                  <Hidden xsDown>
                    <GridItem xs={12} sm={12} md={2}>
                      <Card className={classes.card}>
                        <Badge color="success">Latency</Badge>
                        <CardBody className={classes.cardBody}>
                          <h3>{stats.liveLatency ? stats.liveLatency.toPrecision(4) + 's' : 'measuring'}</h3>
                        </CardBody>
                      </Card>
                      <Card className={classes.card}>
                        <Badge color="success">Quality</Badge>
                        <CardBody className={classes.cardBody}>
                          <h3>{stats.height ? stats.height + 'p' : 'measuring'}</h3>
                        </CardBody>
                      </Card>
                      <Card className={classes.card}>
                        <Badge color="success">Streamed From</Badge>
                        <CardBody className={classes.cardBody}>
                          <h3>{location}</h3>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </Hidden>
                  <GridItem xs={12} sm={12} md={10} className={playerClasses} >

                    <ShakaPlayer
                      src={src}
                      posterUrl=""
                      stats={stats}
                      onStatsUpdate={onStatsUpdate}
                    />

                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          <div className={classNames(classes.mainBlue, classes.mainRaised)}>
            <div className={classes.containerBlue}>
              <FreeSection />
            </div>
          </div>
        </div>
        <Footer whiteFont logoColor="gray" />
      </div>
    </div>
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