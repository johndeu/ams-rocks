import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js"
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

// core Typography components
import Small from "components/Typography/Small.js";
import Danger from "components/Typography/Danger.js";
import Warning from "components/Typography/Warning.js";
import Success from "components/Typography/Success.js";
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import Muted from "components/Typography/Muted.js";
import Quote from "components/Typography/Quote.js";
import Headline1 from "components/Typography/Headline1.js";
import Headline2 from "components/Typography/Headline2.js";


// Translations
import i18next from 'i18next';


const useStyles = makeStyles(styles);

export default function SimpleToUse() {
  const classes = useStyles();

  return (

      <div className={classes.section}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Headline1>{i18next.t('simpleToUse.headline1')}</Headline1>
            <Headline2>{i18next.t('simpleToUse.headline2')}</Headline2>
            <h5 className={classes.description}>
              {i18next.t('simpleToUse.description')}
            </h5>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <h3 className={classes.title}>{i18next.t('simpleToUse.callToAction')}</h3>
          </GridItem>
        </GridContainer>
        <div >
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                  {i18next.t('simpleToUse.card.1.title')}
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    {i18next.t('simpleToUse.card.1.description')}
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                  {i18next.t('simpleToUse.card.2.title')}
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    {i18next.t('simpleToUse.card.2.description')}
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>

                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                 {i18next.t('simpleToUse.card.3.title')}
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    {i18next.t('simpleToUse.card.3.description')}
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>

                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>

        </div>
      </div>
  );
}
