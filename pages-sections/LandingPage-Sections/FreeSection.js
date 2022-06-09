import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import i18next from 'i18next';

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/freeStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCompletedExamples() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h4 className= {classes.title}>Try Azure Media Services for free</h4>
                    <p className= {classes.description}>
                        Start with a free account for up to 20 minutes of free file encoding.
                        For unlimited encoding and live streaming, create an Azure Media Services account with your own Azure subscription.
                    </p>
                    <Button
                        color="info"
                        aria-label={i18next.t('landing.getStartedFree')}
                        href="https://azure.microsoft.com/free/"
                        target="">
                        {i18next.t('landing.getStartedFree')}
                    </Button>
                </GridItem>
            </GridContainer>
        </div>
    </div>
    );
}
