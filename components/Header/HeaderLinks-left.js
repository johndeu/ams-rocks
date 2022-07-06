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
          buttonText={i18next.t('menu.examples.title')}
          hoverColor="azure"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
  /*           <Link href={"/examples"}>
              <a className={classes.dropdownLink}>{i18next.t('menu.examples.allSamples')}</a>
            </Link>, */
            <a
              href="https://docs.microsoft.com/azure/media-services/latest/samples-overview"
              target="_blank"
              className={classes.dropdownLink}
            >
              {i18next.t('menu.examples.samples')}
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText={i18next.t('menu.docs.title')}
          hoverColor="azure"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            <Link href="https://docs.microsoft.com/azure/media-services/">
              <a className={classes.dropdownLink} target="_blank" >{i18next.t('menu.docs.documentation')}</a>
            </Link>,
            <Link href="https://docs.microsoft.com/rest/api/media/">
              <a className={classes.dropdownLink} target="_blank">{i18next.t('menu.docs.api')}</a>
            </Link>,
            <Link href="https://docs.microsoft.com/azure/media-services/latest/limits-quotas-constraints-reference">
              <a className={classes.dropdownLink} target="_blank">{i18next.t('menu.docs.quotas')}</a>
            </Link>,
            <Divider />,
            <Link href="https://docs.microsoft.com/azure/media-services/latest/live-event-obs-quickstart">
              <a className={classes.dropdownLink} target="_blank">{i18next.t('menu.docs.quickStarts')}</a>
            </Link>,
            <Link href="https://docs.microsoft.com/azure/media-services/latest/samples-overview">
              <a className={classes.dropdownLink} target="_blank">{i18next.t('menu.docs.samples')}</a>
            </Link>,
            <Divider />,
            <Link href="https://docs.microsoft.com/azure/media-services/latest/player-media-players-concept">
              <a className={classes.dropdownLink} target="_blank">{i18next.t('menu.docs.players')}</a>
            </Link>,
          ]}
        />
      </ListItem>
          
      <ListItem className={classes.listItem}>
        <Button
          href={"/live"}
          color="transparent"
          target=""
          className={classes.navLink}
        >
          {i18next.t('menu.live.title')}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://azure.microsoft.com/pricing/details/media-services/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          {i18next.t('menu.pricing.title')}
        </Button>
      </ListItem>

     
    </List >
  );
}
