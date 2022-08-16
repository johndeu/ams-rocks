import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/components/sectionStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const useStyles = makeStyles(styles);

export default function SectionArea(props) {
  const classes = useStyles();
  const {
    titleNormal,
    titleHighlight,
    description,
    actionText,
    actionLink,
    imgSrc,
    imgAlt,
    align,
    imgRaised,
    imgRounded
  } = props;

  const imageClasses = classNames({
    [classes.imgRaised]: imgRaised,
    [classes.imgRounded]: imgRounded,
    [classes.imgFluid]: true
  });


  return (
    <div className={classes.section}>
      <GridContainer className={classes.sectionArea}>
        {align == "left" &&
          <GridItem xs={12} sm={6} md={6}>
            <img
              src={imgSrc}
              alt={imgAlt}
              className={imageClasses}
            />
          </GridItem>
        }
        <GridItem xs={12} sm={6} md={6}>
          <div className={classes.textSection}>
            <span className={classes.title}>{titleNormal}</span>
            <span className={classes.titleHighlight}>{titleHighlight}</span>
            <p className={classes.description}>
              {description}
            </p>
            {actionLink &&
              <a href={actionLink} rel="noreferrer" aria-label={actionText}>{actionText}</a>
            }
          </div>
        </GridItem>
        {align == "right" &&
          <GridItem xs={12} sm={6} md={6}>
            <img
              src={imgSrc}
              alt={imgAlt}
              className={imageClasses}
            />
          </GridItem>
        }
      </GridContainer>
    </div >
  );
}

SectionArea.defaultProps = {
  iconColor: "gray",
};

SectionArea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  actionLink: PropTypes.string
};
