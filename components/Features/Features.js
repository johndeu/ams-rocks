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
                           
                            horizontal={{
                                tabsGrid: { xs: 12, sm: 2, md: 2 },
                                contentGrid: { xs: 12, sm: 10, md: 10 },
                            }}
                            tabs={[
                                {
                                    tabButton: i18next.t('features.live.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.live.0.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.0.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.live.1.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.1.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.live.2.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.2.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.live.3.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.3.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.live.4.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.4.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.live.5.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.5.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.live.6.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.6.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.live.7.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.live.7.description')}
                                                    </p>
                                                    <br />
                                                </span>
                                            </GridItem>
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.processing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.processing.0.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.0.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.processing.1.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.1.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.processing.2.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.2.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.processing.3.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.3.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.processing.4.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.4.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.processing.5.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.5.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.processing.6.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.6.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.processing.7.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.processing.7.description')}
                                                    </p>
                                                    <br />
                                                </span>
                                            </GridItem>
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.streaming.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.streaming.0.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.0.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.streaming.1.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.1.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.streaming.2.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.2.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.streaming.3.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.3.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.streaming.4.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.4.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.streaming.5.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.5.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.streaming.6.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.6.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.streaming.7.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.streaming.7.description')}
                                                    </p>
                                                    <br />
                                                </span>
                                            </GridItem>
                                        </GridContainer>
                                    ),
                                },
                                {
                                    tabButton: i18next.t('features.managing.title'),
                                    tabContent: (
                                        <GridContainer>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.managing.0.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.0.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.managing.1.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.1.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.managing.2.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.2.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.managing.3.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.3.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.managing.4.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.4.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.managing.5.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.5.description')}
                                                    </p>
                                                </span>
                                            </GridItem>
                                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                                <span>
                                                    <h5>{i18next.t('features.managing.6.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.6.description')}
                                                    </p>
                                                    <br />
                                                    <h5>{i18next.t('features.managing.7.title')}</h5>
                                                    <p>
                                                        {i18next.t('features.managing.7.description')}
                                                    </p>
                                                    <br />
                                                </span>
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
    title: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.object,
        })
    ),
};
