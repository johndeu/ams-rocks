import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/components/featuresStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

// Localization
import i18next from 'i18next';

const useStyles = makeStyles(styles);


export default function Features(props) {
    const classes = useStyles();

    const liveFeatures = i18next.t('features.live.items');
    const processingFeatures = i18next.t('features.processing.items');
    const streamingFeatures = i18next.t('features.streaming.items');
    const managingFeatures = i18next.t('features.managing.items');

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <h3>{i18next.t('features.title')}</h3>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <NavPills
                            color="danger"
                            tabs={[
                                {
                                    tabButton: i18next.t('features.live.title'),
                                    tabContent: (
                                        <GridContainer>
                                            {liveFeatures.map(item =>
                                                <GridItem xs={12} sm={6} key={item.key}>
                                                    <h5>{item.title}</h5>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </GridItem>
                                            )}
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.processing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            {processingFeatures.map(item =>
                                                <GridItem xs={12} sm={6} key={item.key}>
                                                    <h5>{item.title}</h5>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </GridItem>
                                            )}
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.streaming.title'),
                                    tabContent: (
                                        <GridContainer>
                                            {streamingFeatures.map(item =>
                                                <GridItem xs={12} sm={6} key={item.key}>
                                                    <h5>{item.title}</h5>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </GridItem>
                                            )}
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.managing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            {managingFeatures.map(item =>
                                                <GridItem xs={12} sm={6} key={item.key}>
                                                    <h5>{item.title}</h5>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </GridItem>
                                            )}
                                        </GridContainer>
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

Features.propTypes = {
    title: PropTypes.string,
    features: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.object,
        })
    ),
};
