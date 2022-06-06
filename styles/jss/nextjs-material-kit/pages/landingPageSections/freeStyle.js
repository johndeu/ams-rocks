import { title } from "styles/jss/nextjs-material-kit.js";

const freeStyle = {
  section: {
    textAlign: "center",
    backgroundColor: "#004578",
    padding: "5px"
  },
  title: {
    ...title,
    textAlign:"center",
    color:"#fff",

  },
  description: {
    fontSize:"1.4rem"
  },
  cardTitle : {
    ...title
  }
};

export default freeStyle;
