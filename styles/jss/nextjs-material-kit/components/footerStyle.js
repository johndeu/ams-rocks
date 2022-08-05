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
  logoMicrosoft: {
    height:"18px",
    width: "81px",
    color:"#F7F7F7",
    marginTop:"2px",
    top: "4px",
    position: "relative"
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
    backgroundColor: "#242424",
    display: "flex",
    zIndex: "2",
    position: "relative",
  },
  footerAnchor: {
    color:"#F7F7F7 !important",
    "&,&:hover,&:focus": {
      color: "#F7F7F7",
    },
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#F7F7F7",
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
