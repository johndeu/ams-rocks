import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  title,
} from "styles/jss/nextjs-material-kit.js";

import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";


const sectionStyle = {
  sectionArea: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "0px",
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
    ...title,
    fontSize: "20px"
  },
  description: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
  },
};

export default sectionStyle;
