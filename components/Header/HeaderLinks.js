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
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText={i18next.t('menu.examples')}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/examples">
              <a className={classes.dropdownLink}>All examples</a>
            </Link>,
            <a
              href="https://docs.microsoft.com/en-us/azure/media-services/latest/samples-overview?tabs=net"
              target=""
              className={classes.dropdownLink}
            >
              Samples
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/live"
          color="transparent"
          target=""
          className={classes.navLink}
        >
          <Icon className={classes.icons}>camera</Icon> {i18next.t('menu.live')}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://azure.microsoft.com/en-us/pricing/details/media-services/"
          color="transparent"
          target=""
          className={classes.navLink}
        >
          <Icon className={classes.icons}>paid</Icon> {i18next.t('menu.pricing')}
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText={i18next.t('menu.quickLinks')}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="https://docs.microsoft.com/en-us/azure/media-services/">
              <a className={classes.dropdownLink}>Documentation</a>
            </Link>,
            <Link href="https://docs.microsoft.com/en-us/rest/api/media/">
              <a className={classes.dropdownLink}>API Reference</a>
            </Link>,
            <Link href="https://docs.microsoft.com/en-us/azure/media-services/latest/limits-quotas-constraints-reference">
              <a className={classes.dropdownLink}>Quotas and limits</a>
            </Link>,
            <Divider />,
            <Link href="https://docs.microsoft.com/en-us/azure/media-services/latest/live-event-obs-quickstart">
              <a className={classes.dropdownLink}>Quick Starts</a>
            </Link>,
            <Link href="https://docs.microsoft.com/en-us/azure/media-services/latest/samples-overview?tabs=net">
              <a className={classes.dropdownLink}>Samples</a>
            </Link>,
            <Divider />,
            <Link href="https://docs.microsoft.com/en-us/azure/media-services/latest/player-media-players-concept">
              <a className={classes.dropdownLink}>Players</a>
            </Link>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>

        <Button
          color="success"
          aria-label="Get started"
          href="https://docs.microsoft.com/en-us/azure/media-services/latest/media-services-overview"
          target=""
        >
          {i18next.t('menu.loginButton')}<Icon className={classes.icons}>north_east</Icon>
        </Button>

      </ListItem>
    </List >
  );
}
