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

const infoStyle = {
  infoArea: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "0px",
  },
  iconWrapper: {
    float: "left",
    marginTop: "24px",
    marginRight: "10px",
  },
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
    color: grayColor,
    overflow: "hidden",
    marginTop: "0px",
    marginBottom: "40px",
    fontSize: "16px",
  },
  iconWrapperVertical: {
    float: "none",
  },
  iconVertical: {
    width: "61px",
    height: "61px",
  },
};

export default infoStyle;
