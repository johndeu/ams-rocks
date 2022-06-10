import { container } from "styles/jss/nextjs-material-kit.js";

const getStartedStyle = (theme) => ({
  section: {
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
    },
    textAlign:"center",
    color:"#000",
    backgroundColor: "#004578",
    width: "100%",
  },
  ready: {
    [theme.breakpoints.down("xs")]: {
      textAlign:"center",
      padding:"10px 0px"
    },
    textAlign:"right",
    padding: "20px 5px 20px",
    margin: "0 0",
    lineHeight:"46px",
    color:"#f3f2f1"
  },
  getStartedContainer: {
    padding: "20px 24px",
    [theme.breakpoints.down("xs")]: {
      textAlign:"center",
      padding:"10px 0px"
    },
    textAlign:"left",
  },
 
  getStartedButton: {
    padding: "10px 10px",
    verticalAlign:"bottom",
    color:"#fff",
  },
  container,
});

export default getStartedStyle;
