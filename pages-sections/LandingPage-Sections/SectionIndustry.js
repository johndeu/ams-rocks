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

//Localization
import i18next from 'i18next';

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
                  tabName: i18next.t('industry.0.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Enterprise.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <div className={classes.textSection}>
                          <h3>{i18next.t('industry.0.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.0.body')}
                          </p>
                          {/* <a href="#">{i18next.t('industry.0.callToAction')}</a> */}
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: i18next.t('industry.1.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Shopping.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} >
                        <div className={classes.textSection}>
                          <h3>{i18next.t('industry.1.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.1.body')}
                          </p>
                         {/*  <a href="#">{i18next.t('industry.1.callToAction')}</a> */}
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: i18next.t('industry.2.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Fitness.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} >
                        <div className={classes.textSection}>
                          <h3>{i18next.t('industry.2.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.2.body')}
                          </p>
                          {/* <a href="#">{i18next.t('industry.2.callToAction')}</a> */}
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: i18next.t('industry.3.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Government.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.textSection}>
                          <h3>{i18next.t('industry.3.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.3.body')}
                          </p>
                          {/* <a href="#">{i18next.t('industry.3.callToAction')}</a> */}
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                } ,
                {
                  tabName: i18next.t('industry.4.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Education.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} >
                      <div className={classes.textSection}>
                          <h3>{i18next.t('industry.4.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.4.body')}
                          </p>
                        </div>
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabName: i18next.t('industry.6.title'),
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <img
                          src="/img/Landing/Healthcare.png"
                          alt="..."
                          className={imageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} >
                      <div className={classes.textSection}>
                          <h3>{i18next.t('industry.6.headline')}</h3>
                          <p className={classes.textLeft}>
                            {i18next.t('industry.6.body')}
                          </p>
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
