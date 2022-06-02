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

// Blog components
import { getAllPosts } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import HeroPost from 'components/Blog/HeroPost'
import BlogIndex from 'components/Blog/blogIndex'


// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Examples(allPosts) {
  const classes = useStyles();
  const ref = React.useRef();

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={i18next.t('landing.title')}
        rightLinks={<HeaderLinksRight />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      <Parallax responsive image="/img/keagan-henman-pPxJTtxfV1A-unsplash.jpg">
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
                Examples
              </motion.h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
            <BlogIndex allPosts={allPosts}></BlogIndex>
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

export async function getStaticProps() {
  const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'type',
      'author',
      'coverImage',
      'excerpt',
  ])
  return {
      props: { allPosts },
  }
}