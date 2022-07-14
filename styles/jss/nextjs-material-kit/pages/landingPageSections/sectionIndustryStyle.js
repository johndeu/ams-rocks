import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const tabsStyle = {
  section: {
    padding: "15px 0",
    paddingBottom: "42px",
    align:"center",
    textAlign:"left !important"
  },
  container,
  textSection: {
    paddingTop: "15px",
    paddingLeft: "0px",
    textAlign: "left !important",
  },
  ...imagesStyle,
  imgIndustry : {
   
  }
};

export default tabsStyle;
