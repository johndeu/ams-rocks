import {
  hexToRGBAlpha,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from "styles/jss/nextjs-material-kit.js";
import { gray } from "tailwindcss/colors";

const navPillsStyle = (theme) => ({
  root: {
    marginTop: "20px",
    paddingLeft: "0",
    marginBottom: "0",
    overflow: "visible !important",
    lineHeight: "24px",
    fontSize: "12px",
    fontWeight: "500",
    position: "relative",
    display: "block",
    color: "inherit",
  },
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  displayNone: {
    display: "none !important",
  },
  fixed: {
    overflow: "visible !important",
  },
  horizontalDisplay: {
    display: "block",
  },
  pills: {
    float: "left",
    position: "relative",
    display: "block",
    borderRadius: "0px",
    minWidth: "100px",
    textAlign: "center",
    transition: "all .3s",
    padding: "10px 15px",
    fontWeight:"600px",
    fontSize: "16px",
    lineHeight: "22px",
    height: "auto",
    textTransform:"none",
    opacity: "1",
    maxWidth: "100%",
    margin: "0 5px",
    color: "#323130"
  },
  pillsWithIcons: {
    borderRadius: "4px",
  },
  tabIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "15px 0 !important",
    "&, & *": {
      letterSpacing: "normal !important",
    },
  },
  horizontalPills: {
    width: "100%",
    float: "none !important",
    "& + button": {
      margin: "10px 0",
    },
  },
  contentWrapper: {
    marginTop: "20px",
  },
  primary: {
    "&,&:hover": {
      color: "#FFFFFF",
      borderLeft: "3px solid",
      borderColor: primaryColor,
      backgroundColor: "#E5E5E5",
      /* backgroundColor: primaryColor, */
      /* boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        primaryColor,
        0.4
      )}`, */
    },
  },
  info: {
    "&,&:hover": {
      color: infoColor,
      borderColor: infoColor,
      backgroundColor: "#E5E5E5",
     /*  boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        infoColor,
        0.4
      )}`, */
    },
  },
  success: {
    "&,&:hover": {
      color: successColor,
      borderLeft: "3px solid",
      borderColor: successColor,
      backgroundColor: "#E5E5E5",
     /*  boxShadow: `0 2px 2px 0 ${hexToRGBAlpha(
        successColor,
        0.14
      )}, 0 3px 1px -2px ${hexToRGBAlpha(
        successColor,
        0.2
      )}, 0 1px 5px 0 ${hexToRGBAlpha(successColor, 0.12)}`,*/
    }, 
  },
  warning: {
    "&,&:hover": {
      color: warningColor,
      borderLeft: "3px solid",
      borderColor: warningColor,
      backgroundColor: "#E5E5E5",
     /*  boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        warningColor,
        0.4
      )}`, */
    },
  },
  danger: {
    "&,&:hover": {
      color: dangerColor,
      borderLeft: "3px solid",
      borderColor: dangerColor,
      backgroundColor: "#E5E5E5",
     /*  boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        dangerColor,
        0.4
      )}`, */
    },
  },
  rose: {
    "&,&:hover": {
      color: roseColor,
      backgroundColor: roseColor,
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        roseColor,
        0.4
      )}`,
    },
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabWrapper: {
    color: "inherit",
    position: "relative",
    fontSize: "12px",
    lineHeight: "24px",
    fontWeight: "500",
    "&,& *": {
      letterSpacing: "normal",
    },
  },
});

export default navPillsStyle;
