import React, { useState, setState, useEffect, useRef } from "react";
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
import UHFHeader from "components/Header/UHFHeader.js";
import UHFFooter from "components/Footer/UHFFooter.js";
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
import ProductSection from "pages-sections/InteractiveDemo-Sections/ProductsSection.js";


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
const STREAMS = [
  {
    name: 'AMS LL-HLS Demo Stream',
    src: 'https://aka.ms/LowLatencyDemo.m3u8',
    location: "US West"
  }
];

export default function basicPage(props) {
  const classes = useStyles();
  const router = useRouter();

  const { ...rest } = props;
  const ref = useRef();
  const chartRef = useRef();
  const [src, setSrc] = useState(STREAMS[0].src);
  const [location, setLocation] = useState(STREAMS[0].location);
  const [userAgent, setUserAgent] = useState("");
  const [isIos, setIsIos] = useState(false);

  // On page loaded
  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setIsIos(/iPhone/.test(userAgent));
  })

  const productSelected = (product) => {
    console.log("PRODUCT SELECTED at root page: " + product)
  }

  return (
    <div >
      <UHFHeader
        color="white"
        fixed
        changeColorOnScroll={{
          height: 120,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.subHeaderBanner} >
        <h3>{i18next.t("liveDemo.title")}</h3>
      </div>
      <div className={classes.section}>
        <div className={classes.container}>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12}  >


                  <ProductSection onProductSelected={productSelected}></ProductSection>

                </GridItem>

              </GridContainer>
            </GridItem>
          </GridContainer>

        </div>
        <FreeSection />
        <UHFFooter
          color="white"
          fixed
          changeColorOnScroll={{
            height: 60,
            color: "danger",
          }}
        ></UHFFooter>
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