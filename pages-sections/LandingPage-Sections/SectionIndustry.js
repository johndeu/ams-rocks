import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/sectionIndustryStyle.js";

const useStyles = makeStyles(styles);

export default function SectionIndustry() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
    classes.imgIndustry
  );
  return (
    <div className={classes.section}>
      <div id="nav-tabs">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              headerColor="primary"
              tabs={[
                {
                  tabName: "Fitness",
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <img
                          src="/img/Landing/Fitness.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={8}>
                        <div className={classes.textSection}>
                          <h3>Stay fit together</h3>
                          <p className={classes.textLeft}>
                            Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                            core movements.
                          </p>
                          <a href="#">Discover more</a>
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: "Enterprise",
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <img
                          src="/img/Landing/Enterprise.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={8} >
                        <div className={classes.textSection}>
                          <h3>Collaborate together</h3>
                          <p className={classes.textLeft}>
                            Help coworkers work closely together in this new hybrid environment. Have more interactive discussions pushing along the product roadmap.
                          </p>
                          <a href="#">Discover more</a>
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: "Live shopping",
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <img
                          src="/img/Landing/Shopping.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={8} >
                        <div className={classes.textSection}>
                          <h3>Sell your products </h3>
                          <p className={classes.textLeft}>
                            Empower your sellers to connect with their audience whether it be upvotes or instant advertising of new products. Influential connections mold a brand in seconds.
                          </p>
                          <a href="#">Discover more</a>
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: "Government",
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <img
                          src="/img/Landing/Government.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={8} >
                        <div className={classes.textSection}>
                          <h3>Engage your community </h3>
                          <p className={classes.textLeft}>
                            Ensure legislators with strong transparency and help them build public trust. Government officials now can feel more connected to join process decision-making.
                          </p>
                          <a href="#">Discover more</a>
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div >
    </div >
  );
}
