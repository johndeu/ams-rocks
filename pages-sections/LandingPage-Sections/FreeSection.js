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
                        <h2>Try Azure Media Services for free</h2>
                        <h4>
                            Start with a free account for up to 20 minutes of free file encoding.
                            For unlimited encoding and live streaming, create an Azure Media Services account with your own Azure subscription.
                        </h4>
                        <Button
                            color="success"
                            aria-label={i18next.t('menu.loginButton')}
                            href="https://azure.microsoft.com/free/"
                            target="">
                            {i18next.t('menu.loginButton')}<Icon className={classes.icons}>north_east</Icon>
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
