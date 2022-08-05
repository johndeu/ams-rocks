/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import i18next from "i18next";

// Use the react-intersection-observer to trigger animations when stuff is in view
import {useInView} from "react-intersection-observer";


// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont, logoColor } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  var logoRef = "black";

  if (logoColor == "gray"){
    logoRef ="microsoft-logo-gray"
  }else if (logoColor == "black"){
    logoReg = "microsoft-logo-black"
  }
  const {ref, inView, entry} = useInView({threshold:0});

  React.useEffect(() => {
    console.log("Footer Component: use effect hook Footer is InView = ", inView);
  }, [inView]);

  return (
    <footer ref={ref} className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <svg className = {classes.logoMicrosoft}>
                <title>Microsoft</title>
                <use href={"/img/microsoft-color.svg?v=1.4.0.20220523.1#" + logoRef} >
                </use>
              </svg>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              &nbsp;|&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <h6>©&nbsp;Microsoft 2022</h6>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
              <a className={classes.footerAnchor} rel="noreferrer" href="https://privacy.microsoft.com/privacystatement" target="_blank" >{i18next.t("footer.privacy")}</a> &nbsp;&nbsp;
            </ListItem>
            { i18next.language == 'de' &&  
              <ListItem className={classes.inlineBlock}>
                <a className={classes.footerAnchor}  rel="noreferrer" href="https://aka.ms/impressum_de" target="_blank">Impressum</a> &nbsp;&nbsp;
              </ListItem>
            }
            { i18next.language == 'fr' &&  
              <ListItem className={classes.inlineBlock}>
                <a className={classes.footerAnchor}  rel="noreferrer" href="https://go.microsoft.com/fwlink/?linkid=2121428" target="_blank">Accessibilité : partiellement
                    conforme</a> &nbsp;&nbsp;
              </ListItem>
            }
            <ListItem className={classes.inlineBlock}>
              <a className={classes.footerAnchor}  rel="noreferrer" href="https://docs.microsoft.com/legal/termsofuse" target="_blank">{i18next.t("footer.termsOfUse")}</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a className={classes.footerAnchor}  rel="noreferrer" href="https://www.microsoft.com/trademarks" target="_blank">{i18next.t("footer.trademarks")}</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a className={classes.footerAnchor}  rel="noreferrer" href="https://feedback.azure.com/forums/169396-azure-media-services" target="_blank">{i18next.t("footer.feedback")}</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a className={classes.footerAnchor}  rel="noreferrer" href="https://azure.microsoft.com/en-us/overview/contact-azure-sales/" target="_blank">{i18next.t("footer.contact")}</a> &nbsp;&nbsp;
            </ListItem>
          </List>
        </div>
      </div>
    </footer >
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
