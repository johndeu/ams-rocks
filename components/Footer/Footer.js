/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <img src="/img/microsoft.svg"></img>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            &nbsp;|&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <h6>©&nbsp;2021&nbsp;Microsoft</h6>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a  rel="noreferrer" href="https://privacy.microsoft.com/privacystatement" target="_blank">Privacy and Cookies</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a  rel="noreferrer" href="https://docs.microsoft.com/legal/termsofuse" target="_blank">Terms of use</a> &nbsp;&nbsp;
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a  rel="noreferrer" href="https://www.microsoft.com/trademarks" target="_blank">Trademarks</a> &nbsp;&nbsp;
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
