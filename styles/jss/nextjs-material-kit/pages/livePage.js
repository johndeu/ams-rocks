import { container, title } from "styles/jss/nextjs-material-kit.js";

const livePage = {
  container: {
    zIndex: "4",
    width:"100vw",
    color: "#FFFFFF",
    textAlign:"center",
    ...container,
  },
  title: {
    ...title,
    width:"100vw",
    marginTop: "40px",
    font: "Segoe UI !important",
    fontStyle: "normal !important",
    fontSize:"50px",
    fontWeight: "600",
    lineHeight:"54px",
    paddingTop: "50px",
    color: "#FFFFFF",
    //background: "linear-gradient(89.28deg, #FBCED8 31.84%, #EBD7E4 38.83%, #B7F0FE 51.56%, #3ADBE5 66.26%)",
    textDecoration: "none !important",
    textDecorationStyle:"none !important",
    backgroundClip: "text",
    //textFillColor: "transparent",
    "-webkit-background-clip": "text",
    //"-webkit-text-fill-color": "transparent",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    textAlign: "center !important"
  },

};

export default livePage;
