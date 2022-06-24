import { 
  container, 
  title, 
  section,
  primary, 
  secondary,
  danger,
  warning,
  rose,
  success,
  mainBlue,
  mainDarkBlue,
  raised
 } from "styles/jss/nextjs-material-kit.js";
 import tooltipsStyle from "styles/jss/nextjs-material-kit/tooltipsStyle.js";

const livePage = (theme) => ({
  section: {
    
  },
  container: {
    zIndex: "4",
    width:"100vw",
    color: "#FFFFFF",
    backgroundColor:"#fff",
    textAlign:"center",
    paddingTop: "15vh",
    ...container,
  },
  title: {
    ...title,
    width:"100vw",
    font: "Segoe UI !important",
    fontStyle: "normal !important",
    fontSize:"30px",
    fontWeight: "600",
    lineHeight:"54px",
    color: "#FFFFFF",
    textDecoration: "none !important",
    textDecorationStyle:"none !important",
    backgroundClip: "text",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    textAlign: "center !important"
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "24px",
    font: "Segoe UI",
    letterSpacing: "-0.015em",
    paddingTop: "20px",
    maxWidth: "35vw",
    align: "center",
    display:"inline-block",
    textAlign:"center !important",
    color:"#EDEBE9"
  },
  spacer : {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "10vh",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "10vh",
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "10vh",
    },
    [theme.breakpoints.down("lg")]: {
      paddingTop: "10vh",
    },
  },
  player : {
    padding:"30px 30px",
    paddingBottom:"12vh"
  },
  card : {
    backgroundColor:"gray",
    color:"#fff",
    textAlign: "center",
    padding: "5px 5px"
  },
  cardBody: {
    padding:"0px 0px",
    textAlign: "center",
  },
  icon: {
    width: "17px",
    height: "17px",
    marginRight: "4px",
  },
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0",
    letterSpacing: "normal",
  },
  ...tooltipsStyle,
});

export default livePage;
