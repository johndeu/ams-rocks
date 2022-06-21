import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/sectionCustomers.js";
import i18next from "i18next";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();

  const customers = i18next.t('customers.list');

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>

        <GridContainer>
          <GridItem sm={10} md={10} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings} className={classes.customers}>
                {customers.map(item => 
                <div className={classes.customerSpacer}>
                  <img
                    src={"/img/customers/" + item.imgSrc}
                    alt={item.name}
                    height={60}
                    style = {{ 
                      paddingRight: '30px'
                    }}
                    className="slick-image"
                  />
                </div>
        
                )}
              </Carousel>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.trusted}>
            <div>
              {i18next.t('customers.subHeader')} <a target= "_blank" href="#" className={classes.action}> {i18next.t('customers.callToAction')}</a>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div >
  );
}
