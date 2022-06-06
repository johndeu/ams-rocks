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
                        <GridItem xs={12} sm={6} md={6}>
                          <img
                            src="/img/examples/studio-1.jpg"
                            alt="..."
                            className={imageClasses}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <h2>Stay fit together</h2> 
                          <p className={classes.textLeft}>
                            Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                            core movements.
                          </p>
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                  {
                    tabName: "Enterprise",
                    tabContent: (
                      <div>
                        <h2>Do Enterprise stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Live shopping",
                    tabContent: (
                      <div>
                        <h2>Live Shopping stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Government",
                    tabContent: (
                      <div>
                        <h2>Government stuff...</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Education",
                    tabContent: (
                      <div>
                        <h2>Education stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Energy",
                    tabContent: (
                      <div>
                        <h2>Energy stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Healthcare",
                    tabContent: (
                      <div>
                        <h2>Healthcare stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                  {
                    tabName: "Manufacturing",
                    tabContent: (
                      <div>
                        <h2>Manufacturing stuff</h2> 
                        <p className={classes.textLeft}>
                          Connect our athletes to one another. Build a leaderboard for everyone to keep track of their
                          core movements.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
    </div>
  );
}
