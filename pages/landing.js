import React from "react";
import { GetStaticPropsContext } from 'next';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import SimpleToUse from "../pages-sections/LandingPage-Sections/SimpleToUse";
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";
// import BlogSection from "pages-sections/LandingPage-Sections/BlogSection.js";


// Translations
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const t = useTranslations('landing');
  const { locale } = useRouter();


  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Azure IVS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{t('title')}</h1>
              <h4>
                {t('sectionText')}
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=0AnFcdIhGE0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                {t('buttonText')}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SimpleToUse />
          <ProductSection />
          <TeamSection />
          {/* <BlogSection/> */}
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../locales/${locale}.json`),
      }
    }
  };
}

