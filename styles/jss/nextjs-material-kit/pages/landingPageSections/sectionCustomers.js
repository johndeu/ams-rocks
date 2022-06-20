import { container } from "styles/jss/nextjs-material-kit.js";

const carouselStyle = {
  section: {
    padding: "40px 0",
    backgroundColor: "#fff"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  customers: {
    height:"50px",
  },
  trusted: {
    align: "center",
    textAlign: "center",
    paddingBottom : "80px",
    paddingTop: "15px",
    fontSize: "16px",
    fontWeight: "400",
  },
  action: {
    fontWeight: "600",
  }
};

export default carouselStyle;
