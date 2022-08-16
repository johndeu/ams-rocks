import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blueColor,
  title,
} from "styles/jss/nextjs-material-kit.js";

import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";


const sectionStyle = {
  sectionArea: {
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  section: {
    padding: "40px 20px 0",
    align:"center",
    textAlign:"left !important", 
    color:"#000",
  },
  container,
  textSection: {
    padding: "15px",
    textAlign: "left !important",
  },
  ...imagesStyle,
  primary: {
    color: primaryColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  info: {
    color: infoColor,
  },
  rose: {
    color: roseColor,
  },
  gray: {
    color: grayColor,
  },
  icon: {
    width: "36px",
    height: "36px",
  },
  descriptionWrapper: {
    color: grayColor,
    overflow: "hidden",
  },
  title:{
    color: "#000",
    fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "54px",
  },
  titleHighlight:{
    color: blueColor,
    fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "54px",
  },
  description: {
    fontWeight: "400",
    fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "24px",
  },
};

export default sectionStyle;
