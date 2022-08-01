import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import i18next from 'i18next';

import styles from "styles/jss/nextjs-material-kit/pages/interactiveDemoSections/productsSection.js";

const useStyles = makeStyles(styles);

export default function productsSection() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <span className={classes.title}>Products</span>
                <GridContainer justify="left">
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer className={classes.productBox}>
                            <GridItem xs={12} sm={12} md={4} className={classes.imageProduct}>
                                <img src="/img/products/product-1.jpg"></img>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <span className={classes.description}>Contoso Studios dark grey mini shoulder...</span><br></br>
                                <span className={classes.price}>$334.99</span><br></br>
                                <span className={classes.seller}>Walmart.com</span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer className={classes.productBox}>
                            <GridItem xs={12} sm={12} md={4} >
                                <img src="/img/products/product-2.jpg"></img>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8} >
                                <span className={classes.description}>Contoso Studios cognac brown dist...</span><br></br>
                                <span className={classes.price}>$790.99</span><br></br>
                                <span className={classes.seller}>Walmart.com</span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer className={classes.productBox}>
                            <GridItem xs={12} sm={12} md={4} >
                                <img src="/img/products/product-3.jpg"></img>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8} >

                                <span className={classes.description}>Contoso Studios black mini shoulder bag</span><br></br>
                                <span className={classes.price}>$220.99</span><br></br>
                                <span className={classes.seller}>Walmart.com</span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer className={classes.productBox}>
                            <GridItem xs={12} sm={12} md={4}>
                                <img src="/img/products/product-4.jpg"></img>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8} >
                                <span className={classes.description}>Ami de Coeur backpack</span><br></br>
                                <span className={classes.price}>$480.99</span><br></br>
                                <span className={classes.seller}>Farfetch</span>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
