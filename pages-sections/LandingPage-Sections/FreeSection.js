import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";

// Fluent-UI components for React
import { PrimaryButton, DefaultButton } from '@fluentui/react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import i18next from 'i18next';

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/freeStyle.js";

const useStyles = makeStyles(styles);

export default function freeSection() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h4 className= {classes.title}>{i18next.t('tryFree.title')}</h4>
                    <p className= {classes.description}>
                        {i18next.t('tryFree.description')}
                    </p>
                    <DefaultButton
                        aria-label={i18next.t('landing.getStartedFree')}
                        href="https://azure.microsoft.com/free/"
                        target="_blank">
                        {i18next.t('tryFree.callToAction')}
                    </DefaultButton>
                </GridItem>
            </GridContainer>
        </div>
    </div>
    );
}
