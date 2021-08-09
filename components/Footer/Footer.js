/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Use the react-intersection-observer to trigger animations when stuff is in view
import {useInView} from "react-intersection-observer";


// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const {ref, inView, entry} = useInView({threshold:0});

  React.useEffect(() => {
    console.log("Footer Component: use effect hook Footer is InView = ", inView);
  }, [inView]);

  return (
    <footer ref={ref} className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.helloFromSeattle}>
              Hello from Seattle.
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a rel="noreferrer" href="https://azure.microsoft.com/en-us/overview/contact-azure-sales/" target="_blank">Contact us</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a rel="noreferrer" href="https://feedback.azure.com/forums/169396-azure-media-services" target="_blank">Feedback</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a rel="noreferrer" href="https://privacy.microsoft.com/privacystatement" target="_blank">Privacy and Cookies</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a rel="noreferrer" href="https://docs.microsoft.com/legal/termsofuse" target="_blank">Terms of use</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a rel="noreferrer" href="https://www.microsoft.com/trademarks" target="_blank">Trademarks</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <img src="/img/microsoft.svg"></img>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              &nbsp;|&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <h6>©&nbsp;Microsoft 2021</h6>
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
