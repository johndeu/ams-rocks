/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';


const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <Hidden mdDown >
        <ListItem className={classes.listItem}>
          <Button
            href="https://azure.microsoft.com/overview/contact-azure-sales/"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            {i18next.t('menu.contactSales')}
          </Button>
        </ListItem>
      </Hidden>
      <Hidden smDown >
        <ListItem className={classes.listItem}>
          <Button
            color="azure"
            size="sm"
            border="4xpx solid #6f9e02"
            aria-label={i18next.t('menu.freeAccount')}
            href="https://azure.microsoft.com/free/"
            target=""
          >
            {i18next.t('menu.freeAccount')}
          </Button>
        </ListItem>
      </Hidden>
      <ListItem className={classes.listItem}>
        <Button
          href="https://portal.azure.com/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          {i18next.t('menu.signIn')}
        </Button>
      </ListItem>
    </List >
  );
}
