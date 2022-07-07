import React from "react";
import Link from "next/link";

// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

// core components
import styles from "styles/jss/nextjs-material-kit/components/headerStyle.js";

import i18next from 'i18next';

import CustomButton from "../CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const brandComponent = (
    <Link href="/" as="/">
      <Button className={classes.title}>{brand}</Button>
    </Link>
  );

  const msftLogo = (
    <Hidden xsDown smDown implementation="css">
      <svg className={classes.logoMicrosoft}>
        <title>Microsoft</title>
        <use href="/img/microsoft-color.svg?v=1.4.0.20220523.1#microsoft-logo">
        </use>
      </svg>
    </Hidden>
  );

  const msftBox = (
    <a href="https://www.microsoft.com/" aria-label="Microsoft" data-bi-id="microsoft" data-bi-ct="l1-home" class="nav__link--microsoft" tabindex="-1">
      <span className={classes.msftIcon}><svg aria-hidden="true" role="presentation" data-slug-id="microsoft-square" viewBox="0 0 26 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5708 0.981934H0.907471V12.3682H12.5708V0.981934Z" fill="#F25022" />
        <path d="M25.4625 0.981934H13.7992V12.3682H25.4625V0.981934Z" fill="#7FBA00" />
        <path d="M12.5708 13.5649H0.907471V24.9512H12.5708V13.5649Z" fill="#00A4EF" />
        <path d="M25.4629 13.5649H13.7996V24.9512H25.4629V13.5649Z" fill="#FFB900" />
      </svg></span>
    </a>
  )

  return (
    <AppBar className={appBarClasses} >
      <Toolbar className={classes.container}>
        <Hidden mdUp>
          <CustomButton
            color="azure2"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 65">
              <rect width="100" height="10"></rect>
              <rect y="30" width="100" height="10"></rect>
              <rect y="60" width="100" height="10"></rect>
            </svg>
          </CustomButton>
          <Hidden xsDown>
            <div className={classes.msftIconCenter}>{msftBox}</div>
          </Hidden>
        </Hidden>
        <Hidden smDown implementation="css">
          {msftBox}
        </Hidden>

        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <>

              <Hidden smDown implementation="css">
                <div className={classes.leftLinkGap}>
                  {leftLinks}
                </div>
              </Hidden>

            </>
          ) : (
            brandComponent
          )}
        </div>

        <Hidden implementation="css">
          {rightLinks}
        </Hidden>

      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is higher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
