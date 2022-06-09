import { container, primaryColor } from "styles/jss/nextjs-material-kit.js";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "0.3rem",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  helloFromSeattle: {
    padding: "20px 0"

  },
  left: {
    padding: "12px 0",
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right!important",
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF",
    },
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px",
  },
};
export default footerStyle;
