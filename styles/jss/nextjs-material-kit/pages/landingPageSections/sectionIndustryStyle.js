import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const tabsStyle = {
  section: {
    padding: "15px 0",
    align:"center",
    textAlign:"left !important"
  },
  container,
  textSection: {
    padding: "15px",
    textAlign: "left !important",
  },
  ...imagesStyle,
  imgIndustry : {

  }
};

export default tabsStyle;
