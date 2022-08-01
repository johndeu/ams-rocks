import { container, title } from "styles/jss/nextjs-material-kit.js";

const productSection = {
    container: {
      ...container,
      zIndex: "2",
      position:"relative",

    },
    imageProduct :{
      position:"relative",
      translate:"-18%",
      transform: "scale(105%,115%)",
      objectFit:"fill",
      width: "auto",
      maxHeight:"auto"
    },
    title : {
      color: "#323130 !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "20px",
      fontStyle:"normal",
      width:"100%",
    },
    description: {
      fontWeight: "700",
      fontSize: "13px",
      lineHeight: "18px",
      color: "#111111 !important",
      textOverflow : "ellipsis",
      width:"100%",
    },
    productBox : {
      backgroundColor: "#FFFFFF",
      color: "#111111 !important",
      boxShadow: " 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);",
      borderRadius: "6px",
      width:"100%",
      display:"flex",
      justifyContent: "left",
      alignItems:"left",
      overflow: "hidden",
      textOverflow : "ellipsis",
      marginTop: "10px",
      marginBottom:"auto",
    },
    price : {
      color: "#111111 !important",
      fontWeight: "400",
      fontSize: "10px",
      lineHeight: "12px",
      fontStyle:"normal",
      textOverflow : "ellipsis",
    },
    seller : {
      color: "#111111 !important",
      fontWeight: "300",
      fontSize: "10px",
      lineHeight: "10px",
      fontStyle:"normal",
      textOverflow : "ellipsis",
    }

}

export default productSection;