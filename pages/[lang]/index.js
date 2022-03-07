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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";

// Need to dynamic load the Shaka Player since it imports a standard Javascript library
// See the documentation here - https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player
const ShakaPlayer = dynamic(import("components/ShakaPlayer/ShakaPlayer.js"), { ssr: false });

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import SimpleToUse from "pages-sections/LandingPage-Sections/SimpleToUse";
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";
// import BlogSection from "pages-sections/LandingPage-Sections/BlogSection.js";


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
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax responsive filter image="/img/nicolas-lb-uVSyr0EUaLY-unsplash.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <motion.h1
                className={classes.title}
                initial={{
                  scale: 0.75,
                  opacity: 0,
                  y: -50
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}>
                {i18next.t('landing.tagline')}
              </motion.h1>

              <h4>
                {i18next.t('landing.valueProp')}
              </h4>
              <br />
              <Button
                color="danger"
                size="sm"
                href="https://azure.microsoft.com/en-us/free/"
                target=""
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                {i18next.t('landing.ctaButton')}
              </Button>
              <Button
                color="info"
                size="sm"
                href="https://docs.microsoft.com/en-us/azure/media-services/"
                target=""
                rel="noopener noreferrer"
              >
                <i className="fas fa-book" />
                {i18next.t('landing.readDocs')}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* <Card>
            <ShakaPlayer manifestUrl={src} />
          </Card> */}
          <SimpleToUse />
          <ProductSection />
         { /*<TeamSection /> */}
          {/* <BlogSection/> */}
          {/* <WorkSection /> */}
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