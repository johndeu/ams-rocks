import { container } from "styles/jss/nextjs-material-kit.js";

const carouselStyle = {
  section: {
    paddingTop: "40px",
    backgroundColor: "#fff"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  trusted: {
    align: "center",
    textAlign: "center",
    paddingBottom : "80px",
    paddingTop: "15px",
    fontSize: "16px",
    fontWeight: "400",
  },
  customerImage  : {
    webkitFilter: "grayscale(100%)", /* Safari 6.0 - 9.0 */
    filter: "grayscale(100%)",
  },
  action: {
    fontWeight: "600",
  }
};

export default carouselStyle;
