import {
    hexToRGBAlpha,
    grayColor,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
  } from "styles/jss/nextjs-material-kit.js";
  
  const playerStyle = {
    span: {
        color: grayColor
    },
    playerRaised: {
      boxShadow:  "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      borderRadius: "6px !important",
      backgroundColor:"#fff"
    }
  }

  export default playerStyle;