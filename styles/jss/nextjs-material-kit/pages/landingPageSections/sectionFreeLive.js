import { responsiveFontSizes } from "@material-ui/core";
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
    padding:"20px 20px"
  },
  ready: {
    [theme.breakpoints.down("xs")]: {
      textAlign:"center",
      padding:"10px 0px"
    },
    textAlign:"center",
    padding: "20px 5px 20px",
    lineHeight:"40px",
    color:"#f3f2f1",
    fontSize: "28px",
    fontWeight: "600"
  },
  getStartedContainer: {
    padding: "20px 24px",
    [theme.breakpoints.down("xs")]: {
      textAlign:"center",
      padding:"10px 0px"
    },
    textAlign:"left",
  },
 
  freeButton: {
    padding: "10px 10px",
    marginLeft: "20px",
    color:"#fff",
  },
  container,
});

export default getStartedStyle;
