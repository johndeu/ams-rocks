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
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.0.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.0.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.1.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.1.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.2.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.2.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.3.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.3.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.4.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.4.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.5.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.5.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.6.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.6.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.live.items.7.title')}</h5>
                                                <p>
                                                    {i18next.t('features.live.items.7.description')}
                                                </p>
                                            </GridItem>

                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.processing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.0.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.0.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.1.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.1.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.2.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.2.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.3.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.3.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.4.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.4.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.5.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.5.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.6.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.6.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.processing.items.7.title')}</h5>
                                                <p>
                                                    {i18next.t('features.processing.items.7.description')}
                                                </p>
                                            </GridItem>
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.streaming.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.0.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.0.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.1.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.1.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.2.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.2.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.3.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.3.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.4.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.4.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.5.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.5.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.6.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.6.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.streaming.items.7.title')}</h5>
                                                <p>
                                                    {i18next.t('features.streaming.items.7.description')}
                                                </p>
                                            </GridItem>
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.managing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.0.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.0.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.1.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.1.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.2.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.2.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.3.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.3.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.4.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.4.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.5.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.5.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.6.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.6.description')}
                                                </p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                                <h5>{i18next.t('features.managing.items.7.title')}</h5>
                                                <p>
                                                    {i18next.t('features.managing.items.7.description')}
                                                </p>
                                            </GridItem>
                                          
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
