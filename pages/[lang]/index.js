import React from "react";
import dynamic from 'next/dynamic';
import { GetStaticPropsContext } from 'next';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Use framer-motion
import { motion } from "framer-motion";
// Use the react-intersection-observer to trigger animations when stuff is in view
import { useInView } from "react-intersection-observer";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";

// Need to dynamic load the Shaka Player since it imports a standard Javascript library
// See the documentation here - https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player
const ShakaPlayer = dynamic(import("components/ShakaPlayer/ShakaPlayer.js"), { ssr: false });

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import SimpleToUse from "pages-sections/LandingPage-Sections/SimpleToUse";
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";
import IndustrySection from "pages-sections/LandingPage-Sections/SectionIndustry.js";
import GetStartedSection from "pages-sections/LandingPage-Sections/SectionGetStarted.js";
import SectionArea from "../../components/SectionArea/SectionArea";
// import SectionBlog from "pages-sections/LandingPage-Sections/SectionBlog.js";

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';


const dashboardRoutes = [];

const STREAMS = [
  {
    name: 'Azure Media Services Promo',
    src:
      'https://amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest(format=m3u8-cmaf)'
  }
];


const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
    classes.imgIndustry
  );
  const router = useRouter();

  const { ...rest } = props;

  const ref = React.useRef();
  const [src, setSrc] = React.useState(STREAMS[0].src);

  const { playerRef, inView, entry } = useInView({ threshold: 0 });

  React.useEffect(() => {
    //window.getShakaInst = () => playerRef.current;
    console.log("use effect hook, InView = ", inView);
  }, [inView]);

  return (
    <div>
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
      <Parallax responsive image="/img/Mainheader_image.png">
        <GridContainer className={classes.container}>
          <GridItem>
            <div className={classes.spacer}></div>
            <div >
              <span className={classes.title}>{i18next.t('landing.tagline1')}</span><br />
              <span className={classes.title2}>{i18next.t('landing.tagline2')} </span><br />
              <span className={classes.subtitle}>{i18next.t('landing.valueProp')}</span>
            </div>
            <br />
            <Button
              color="danger"
              size="lg"
              href="https://azure.microsoft.com/en-us/free/"
              target=""
              rel="noopener noreferrer"
            >
              {i18next.t('landing.ctaButton')}
            </Button>
            <Button
              color="transparent"
              border="1px solid"
              size="lg"
              href="https://docs.microsoft.com/en-us/azure/media-services/"
              target=""
              rel="noopener noreferrer"
            >
              {i18next.t('landing.readDocs')}
            </Button>
          </GridItem>
        </GridContainer>

      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* <Card>
            <ShakaPlayer manifestUrl={src} />
          </Card> */}
          <IndustrySection />
          <div className={classes.sectionBreak}></div>
          <GetStartedSection />
          <SectionArea
            align="right"
            title="A full, end-to-end solution"
            description="Azure Media Services is a full solution that manages the ingestion, transcoding, packaging, and delivery of your live content, the same technology that powers Teams and LinkedIn."
            imgSrc="/img/Landing/Solution.png"
            imgAlt="Solution"
            actionText="Create a live event"
            actionLink="#"
          />
          <SectionArea
            align="left"
            title="Make your live content accessible, with real-time transcription"
            description="Automatic real-time transcription in 100+ languages without sacrificing latency."
            imgSrc="/img/Landing/Accessibility.png"
            imgAlt="Accessibility"
            actionText="Try it now"
            actionLink="#"
          />
          <SectionArea
            align="right"
            title="Uncompromising commitment to privacy and security"
            description="Protect your content from upload to playback. Enable your viewing restrictions with Digital Rights Management, Geo-blocking, and URL token signing."
            imgSrc="/img/Landing/Security.png"
            imgAlt="Security"
            actionText="Find out more"
            actionLink="#"
          />
          <SectionArea
            align="left"
            title="Low latency live streaming at global scale"
            description="Less than 5 seconds of delay, delivered to all your viewers, devices and platforms. Whether it’s a dozen to milions of streams, you can rest assured your viewers will always watch with less buffering and watch your live streams near-realtime."
            imgSrc="/img/Landing/Lowlatency.png"
            imgAlt="Lowlatency"
            actionText="Try it out"
            actionLink="#"
          />
          <div className={classes.sectionBreak}></div>
          { /*<TeamSection /> */}
          {/* <SectionBlog/> */}
          {/* <WorkSection /> */}

        </div>
      </div>

      <div className={classNames(classes.mainBlue, classes.mainRaised)}>
        <div className={classes.containerBlue}>
          <FreeSection />
        </div>
      </div>

      <Footer />
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