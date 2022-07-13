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
    paddingTop: "2vh",
    ...container,
  },
  subHeaderBanner : {
    paddingTop: "10vh",
    paddingBottom: "3vh",
    color: "#FFFFFF",
    backgroundColor:"#000",
    textAlign: "center",
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
    padding:"10px 10px",
    paddingBottom:"12vh"
  },
  card : {
    backgroundColor:"white",
    color:"rgba(0, 0, 0, 0.80)",
    textAlign: "left",
    padding:"4px",
    boxShadow:
    "0px 2.81768px 13px rgba(0, 0, 0, 0.15);",
  },
  cardBody: {
    padding:"0px 10px",

  },
  icon: {
    width: "17px",
    height: "17px",
    marginRight: "4px",
  },
  localTime : {
    color: "rgba(0, 0, 0, 0.80)",
    fontSize: "26px",
    fontFamily:"Consolas, Terminus, monospace",
    transition: "0.3s ease all",
    fontWeight: "600",
    lineHeight:"1.3em",
    letterSpacing: "0.05em",
  },
  localTimeTitle : {
    paddingTop:"25px",
    color: "rgba(0, 0, 0, 0.80)",
    fontWeight: "400",
    fontSize: "24px"
  },
  label: {
    color: "rgba(0, 0, 0, 0.80)",
    fontSize: "12px",
    textAlign:"left",
    transition: "0.3s ease all",
    fontWeight: "600",
    letterSpacing: "tight",
    padding:"10px,10"
  },  
  utcTimeBox: {
    backgroundColor:"white",
    color:"rgba(0, 0, 0, 0.80)",
    textAlign: "center !important",
    padding:"4px",
    boxShadow:
    "0px 2.81768px 13px rgba(0, 0, 0, 0.15);",
  },
  utcTimeLabel: {
    textAlign: "center !important",
  },
  metric: {
    color: "#1a1a1f",
    fontSize: "24px",
    transition: "0.3s ease all",
    fontWeight: "600",
    lineHeight:"1.75em",
    letterSpacing: "0.006em",
  },
  statsContainer : {
    textAlign: "left",
    itemAlign: "left",
    width: "100%",
    padding: "10px 10px",
  },
  statsItem : {
    lineHeight: "1em",
    paddingLeft:"20px",
    textAlign:"left",
    fontSize : "14px",
    fontWeight: "400",
  },
  featureHeader : {
    textAlign: "center !important",
    fontSize : "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor:"#1f1f1a",
    border:"4px solid #1f1f1a",
    borderRadius: "6px",
  },
  featureBody: {
    textAlign: "left !important",
    fontSize : "13px",
    fontWeight: "500"
  },
  ...tooltipsStyle,
});

export default livePage;
