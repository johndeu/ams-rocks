import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
} from "styles/jss/nextjs-material-kit.js";

const badgeStyle = {
  badge: {
    marginRight: "3px",
    borderRadius: "5px",
    padding: "4px 12px",
    textTransform: "normal",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1",
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    display: "inline-block",
  },
  primary: {
    backgroundColor: primaryColor,
  },
  warning: {
    backgroundColor: warningColor,
  },
  danger: {
    backgroundColor: dangerColor,
  },
  success: {
    backgroundColor: successColor,
  },
  info: {
    backgroundColor: infoColor,
  },
  rose: {
    backgroundColor: roseColor,
  },
  gray: {
    backgroundColor: "#6c757d",
  },
  azure : {
    backgroundColor: "#2899F5",
  },
};

export default badgeStyle;
