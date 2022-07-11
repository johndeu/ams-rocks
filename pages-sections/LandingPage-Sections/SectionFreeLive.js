import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";


import i18next from 'i18next';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/sectionFreeLive.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function SectionFreeLive() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
    classes.imgIndustry
  );
  return (
    <div className={classes.section}>
      <span className={classes.ready}>{i18next.t('freeLive.title')}
      <Button 
            color="danger" 
            size = "lg" 
            className={classes.freeButton} 
            href="https://azure.microsoft.com/free/"
            target="_blank">
            {i18next.t('freeLive.callToAction')}
          </Button>
          </span>
    </div >
  );
}
