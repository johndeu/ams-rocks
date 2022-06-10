import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const tabsStyle = {
  section: {
    padding: "15px 25px 15px 0",
    align:"center",
    textAlign:"left !important",
    color:"#000"
  },
  container,
  textSection: {
    padding: "15px",
    textAlign: "left !important",
  },
  textRight: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
  },
  ...imagesStyle,

};

export default tabsStyle;
