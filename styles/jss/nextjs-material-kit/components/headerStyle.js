import {
  container,
  hexToRGBAlpha,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth,
} from "styles/jss/nextjs-material-kit.js";

const headerStyle = {
  appBar: {
    display: "flex",
    width: "100%",
    color: "#1a1a1f",
    backgroundColor:"white !important",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0px 8px -1px",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
  },

  iconButton: {
    color:"#1a1a1f !important",
    backgroundColor:"#444",
    "& &.MuiButton-label" : {
      color:"blue !important",
    }
  },
  button: {
    backgroundColor:"#fff !important"
  },
  absolute: {
    position: "absolute",
    zIndex: "1100",
  }, 
  fixed: {
    position: "fixed",
    zIndex: "1100",
  },
  container: {
    ...container,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
  },
  leftLinkGap: {
    paddingLeft:"48px"
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "24px",
    fontStyle:"normal",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 8px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent",
    },
  },

  logoMicrosoft: {
    height:"68px",
    width: "81px",
    color:"#ffffff",
    verticalAlign: "middle",
    float:"left",
    marginTop: "2px",
    display: "list-item",
  },
  logo: {
    width:"30px",
    height:"30px",
    verticalAlign: "middle",
    float:"left",
    marginTop: "2px",
  },
  appResponsive: {
    margin: "20px 10px",
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      primaryColor,
      0.46
    )}`,
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      infoColor,
      0.46
    )}`,
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      successColor,
      0.46
    )}`,
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      warningColor,
      0.46
    )}`,
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      dangerColor,
      0.46
    )}`,
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      roseColor,
      0.46
    )}`,
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: "#000",
  },
  azureMedia: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    paddingTop: "25px",
    color: "#fff",
    backgroundImage: "url('/img/Mainheader_image-2.jpg')",
  },
  dark: {
    color: "#fff !important",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)",
  },
  white: {
    border: "0",
    marginBottom: "0px",
    color: "#000 !important",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition,
  },
  msftIcon : {
    height:"24px",
    width: "24px",
    display:"inline-block",
    lineHeight:"0px",
    verticalAlign: "middle"
  },
  msftIconCenter : {
    position:"fixed",
    left:"50vw",
  }
};

export default headerStyle;
