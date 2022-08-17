import React from "react";
import Head from "next/head";
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

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import AzureFooter from "components/Footer/AzureFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Parallax from "components/Parallax/Parallax.js";
import Features from "components/Features/Features.js";


// Need to dynamic load the Shaka Player since it imports a standard Javascript library
// See the documentation here - https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player
// const ShakaPlayer = dynamic(import("components/ShakaPlayer/ShakaPlayerClass.js"), { ssr: false });

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";
import IndustrySection from "pages-sections/LandingPage-Sections/SectionIndustry.js";
import GetStartedSection from "pages-sections/LandingPage-Sections/SectionGetStarted.js";
import FreeLive from "pages-sections/LandingPage-Sections/SectionFreeLive.js";
import SectionArea from "../../components/SectionArea/SectionArea";
import SectionCustomers from "pages-sections/LandingPage-Sections/SectionCustomers.js";
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
    console.log("use effect hook, InView = ", inView);
  }, [inView]);

  return (
    <div>
      <Head>
          {/*  <!-- Robots --> */}
          <meta name="robots" content="all, noarchive" />
          <meta name="Description" content={i18next.t("meta.description")} />
          <meta name="Keywords" content={i18next.t("meta.keywords")} />
          {/*  <!-- Schema.org markup for Google+ --> */}
          <meta itemprop="title" content={i18next.t("meta.pageTitle")} />
          <meta itemprop="name" content={i18next.t("meta.pageTitle")} />
          <meta itemprop="description" content={i18next.t("meta.description")} />
          <meta itemprop="image" content="https://media.microsoft.com/img/AzureMediaService.png" />
          {/*  <!-- Twitter Card data --> */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={i18next.t("meta.site")} />
          <meta name="twitter:title" content={i18next.t("meta.pageTitle")} />
          <meta name="twitter:description" content={i18next.t("meta.description")} />
          <meta name="twitter:creator" content="@microsoft" />
          <meta name="twitter:image:src" content="https://media.microsoft.com/img/AzureMediaService.png" />
          {/*  <!-- Open Graph data --> */}
          <meta name="og:type" property="og:type" content="website"></meta>
          <meta property="og:title" content={i18next.t("meta.pageTitle")} />
          <meta property="og:url" content={i18next.t("meta.site")} />
          <meta property="og:image" content="http://media.microsoft.com/img/AzureMediaService.png" />
          <meta property="og:image:secure_url" content="https://media.microsoft.com/img/AzureMediaService.png" />
          <meta property="og:description" content={i18next.t("meta.description")} />
          <meta property="og:site_name" content={i18next.t("meta.pageTitle")} />
          {/*  <!-- DNS prefetch --> */}
          <link rel="dns-prefetch" href="//microsoft.com" />
          <link rel="canonical" href="https://media.microsoft.com/en-us/"></link>
          <link rel="preconnect" href="//wcpstatic.microsoft.com" crossorigin></link>
      </Head>

      <Header
        color="white"
        routes={dashboardRoutes}
        fixed
        brand={i18next.t('landing.title')}
        leftLinks={<HeaderLinksLeft />}
        rightLinks={<HeaderLinksRight />}
        changeColorOnScroll={{
          height: 120,
          color: "white",
        }}
        {...rest}
      />
      <SnackbarContent
        message={
          <span>
            <b>New!</b> Low latency live streaming with LL-HLS is <a href="/live" aria-label="Try it now">now available. Try it now.</a>
          </span>
        }
        close
        color="azure"
        icon="new_releases_outline"
      />
      <Parallax responsive image="/img/Mainheader_image-2.jpg">

        <GridContainer className={classes.container}>
          <GridItem>
            <div className={classes.titleSection}>
              <span className={classes.title}>{i18next.t('landing.tagline1')}</span><br />
              <span className={classes.title2}>{i18next.t('landing.tagline2')} </span><br />
              <span className={classes.subtitle}>{i18next.t('landing.valueProp')}</span>
            </div>
            <br />
            <Button
              color="danger"
              size="lg"
              href="https://azure.microsoft.com/free/"
              target="_blank"
              rel="noreferrer"
              aria-label={i18next.t('landing.ctaButton')}
            >
              {i18next.t('landing.ctaButton')}
            </Button>
            <Button
              color="transparent"
              border="1px solid"
              size="lg"
              href="https://docs.microsoft.com/azure/media-services/"
              target="_blank"
              rel="noreferrer"
              aria-label={i18next.t('landing.readDocs')}
            >
              {i18next.t('landing.readDocs')}
            </Button>
          </GridItem>
        </GridContainer>

      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>

        <div className={classes.container}>


          <IndustrySection />

          <SectionArea
            align="right"
            titleNormal={i18next.t('landing.sections.0.title.normal')}
            titleHighlight={i18next.t('landing.sections.0.title.highlight')}
            description={i18next.t('landing.sections.0.description')}
            imgSrc="/img/Landing/Solution.png"
            imgAlt={i18next.t('landing.sections.0.imageAlt')}
            aria-label={i18next.t('landing.sections.0.title')}
          />
          <SectionArea
            align="right"
            titleNormal={i18next.t('landing.sections.1.title.normal')}
            titleHighlight={i18next.t('landing.sections.1.title.highlight')}
            description={i18next.t('landing.sections.1.description')}
            imgSrc="/img/Landing/lowlatencyfootball.jpg"
            imgAlt={i18next.t('landing.sections.1.imageAlt')}
            aria-label={i18next.t('landing.sections.1.title')}
          />
          <div className={classes.sectionBreak}></div>
          <FreeLive />
          <div className={classes.sectionBreak}></div>

          <SectionArea
            align="right"
            titleNormal={i18next.t('landing.sections.2.title.normal')}
            titleHighlight={i18next.t('landing.sections.2.title.highlight')}
            aria-label={i18next.t('landing.sections.2.title')}
            description={i18next.t('landing.sections.2.description')}
            imgSrc="/img/Landing/Security.png"
            imgAlt={i18next.t('landing.sections.2.imageAlt')}
          />
          <SectionArea
            align="right"
            titleNormal={i18next.t('landing.sections.3.title.normal')}
            titleHighlight={i18next.t('landing.sections.3.title.highlight')}
            aria-label={i18next.t('landing.sections.3.title')}
            description={i18next.t('landing.sections.3.description')}
            imgSrc="/img/Landing/Accessibility.png"
            imgAlt={i18next.t('landing.sections.3.imageAlt')}
          />
           <SectionArea
            align="right"
            titleNormal={i18next.t('landing.sections.4.title.normal')}
            titleHighlight={i18next.t('landing.sections.4.title.highlight')}
            aria-label={i18next.t('landing.sections.4.title')}
            description={i18next.t('landing.sections.4.description')}
            imgSrc="/img/video-indexer.png"
            imgAlt={i18next.t('landing.sections.4.imageAlt')}
            actionLink="https://vi.microsoft.com/"
            actionText={i18next.t('landing.sections.4.callToAction')}
          />

        </div>
      </div>

      {/*  <GetStartedSection /> */}
      <Features />
      <SectionCustomers />
      <div className={classNames(classes.mainBlue, classes.mainRaised)}>
        <div className={classes.containerBlue}>
          <FreeSection />
        </div>
      </div>

      <AzureFooter></AzureFooter>
      {/*  <Footer whiteFont logoColor="gray" /> */}
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