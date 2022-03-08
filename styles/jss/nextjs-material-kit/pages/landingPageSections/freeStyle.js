import { title, primaryColor, infoColor } from "styles/jss/nextjs-material-kit.js";

const freeStyle = {
  section: {
    padding: "20px 0px 40px 0px",
    textAlign: "center",
    backgroundColor: "Black"
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
  cardTitle : {
    ...title,
    marginTop: ".625rem",
  }
};

export default freeStyle;
