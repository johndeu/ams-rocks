import { container } from "styles/jss/nextjs-material-kit.js";
import imagesStyle from "styles/jss/nextjs-material-kit/imagesStyles.js";

const tabsStyle = (theme) => ({
  section: {
    padding: "15px 0",
    paddingBottom: "42px",
    align: "center",
    textAlign: "left !important",
    [theme.breakpoints.down("xs")]: {
      "& div.MuiTabs-flexContainer": {
        overflowX: "scroll",
        width: "-webkit-fill-available"
      },
      "& div.MuiTabs-root": {
        width: "-webkit-fill-available"
      }
    }
  },
  container,
  textSection: {
    paddingTop: "15px",
    paddingLeft: "0px",
    textAlign: "left !important",
  },
  ...imagesStyle,
  imgIndustry: {

  }
});

export default tabsStyle;
