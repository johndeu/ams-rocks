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

const useStyles = makeStyles(styles);

export default function SimpleToUse() {
  const classes = useStyles();


  return (

      <div className={classes.section}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Headline1>Azure Media Services is</Headline1>
            <Headline2>simple to use.</Headline2>
            <h5 className={classes.description}>

              this is why is it so simple to use. because of all these things..
              Azure Media Services is a fully managed live streaming solution: simply stream to
              AMS, and the service does everything you need to make low-latency
              live video available to any viewer around the globe. Azure handles
              the ingestion, transcoding, packaging, and delivery of your live content,
              using the same battle-tested technology that powers LinkedIn, Stream, and the Olympics.
              With the included Azure Media Player SDK, your viewers will always get the best latency
              and quality of service wherever they may be, with no extra work required on your part.
            </h5>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <h3 className={classes.title}>Create your first live stream</h3>
          </GridItem>
        </GridContainer>
        <div >
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                  Azure Media Player
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Details about the Azure Media Player and how
                    to use it in the solution.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>

                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                  Azure Media Player
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Details about the Azure Media Player and how
                    to use it in the solution.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>

                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>
                  Azure Media Player
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Details about the Azure Media Player and how
                    to use it in the solution.
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
