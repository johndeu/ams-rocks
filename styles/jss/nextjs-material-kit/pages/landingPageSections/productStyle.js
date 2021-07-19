import { title, primaryColor, infoColor } from "styles/jss/nextjs-material-kit.js";

const productStyle = {
  section: {
    padding: "120px 0px 0px 0px",
    textAlign: "left",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: primaryColor
  },
  description: {
    marginBottom: "1rem",
    marginTop: "40px",
    color: "#999",
    fontSize:"1.4rem"
  },
};

export default productStyle;
