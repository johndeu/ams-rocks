import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/sectionGetStarted.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function SectionLeftImage() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
    classes.imgIndustry
  );
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <h3 className={classes.ready}>Ready to start?</h3>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} className={classes.getStartedContainer}>
          <Button color="danger" size = "md" className={classes.getStartedButton}>
              Get started free
          </Button>
        </GridItem>
      </GridContainer>
    </div >
  );
}
