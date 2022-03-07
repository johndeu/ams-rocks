import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";
import Headline1 from "components/Typography/Headline1.js";
import Headline2 from "components/Typography/Headline2.js";

// Translations
import i18next from 'i18next';


const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        <Headline1>{i18next.t('product.headline1')}</Headline1>
        <Headline2>{i18next.t('product.headline2')}</Headline2>
          <h5 className={classes.description}>
             {i18next.t('simpleToUse.description')}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.1.title')}
              description= {i18next.t('product.card.1.description')}
              icon={Chat}
              iconColor="info"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.2.title')}
              description= {i18next.t('product.card.2.description')}
              icon={VerifiedUser}
              iconColor="success"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.3.title')}
              description= {i18next.t('product.card.3.description')}
              icon={Fingerprint}
              iconColor="danger"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.1.title')}
              description= {i18next.t('product.card.1.description')}
              icon={Chat}
              iconColor="info"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.2.title')}
              description= {i18next.t('product.card.2.description')}
              icon={VerifiedUser}
              iconColor="success"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.3.title')}
              description= {i18next.t('product.card.3.description')}
              icon={Fingerprint}
              iconColor="danger"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.1.title')}
              description= {i18next.t('product.card.1.description')}
              icon={Chat}
              iconColor="info"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.2.title')}
              description= {i18next.t('product.card.2.description')}
              icon={VerifiedUser}
              iconColor="success"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.3.title')}
              description= {i18next.t('product.card.3.description')}
              icon={Fingerprint}
              iconColor="danger"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.1.title')}
              description= {i18next.t('product.card.1.description')}
              icon={Chat}
              iconColor="info"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.2.title')}
              description= {i18next.t('product.card.2.description')}
              icon={VerifiedUser}
              iconColor="success"
              horizontal
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title= {i18next.t('product.card.3.title')}
              description= {i18next.t('product.card.3.description')}
              icon={Fingerprint}
              iconColor="danger"
              horizontal
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
