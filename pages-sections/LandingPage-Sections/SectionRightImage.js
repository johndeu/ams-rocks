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

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/sectionRightImage.js";

const useStyles = makeStyles(styles);

export default function SectionRightImage() {
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
          <GridItem xs={12} sm={8} md={8}>
            <div className={classes.textSection}>
              <h3>Stay fit together</h3>
              <p className={classes.textRight}>
                Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                core movements.
              </p>
            </div>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <img
              src="/img/Landing/Fitness.png"
              alt="..."
              className={imageClasses}
            />
          </GridItem>
        </GridContainer>
    </div >
  );
}
