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

const demoPage = (theme) => ({
    section: {

    },
    container: {
        zIndex: "4",
        width: "100vw",
        minHeight:"80vh",
        color: "#FFFFFF",
        backgroundColor: "#fff",
        textAlign: "left",
        paddingTop: "120px",
        ...container,

        "&, & label": {
            color:"#000",
            fontSize:"14px",
            fontWeight:"600",
        },
    },
    subHeaderBanner: {
        paddingTop: "10vh",
        paddingBottom: "3vh",
        color: "#FFFFFF",
        backgroundColor: "#000",
        textAlign: "center",
    },
    title: {
        paddingTop: "50px",
        font: "Segoe UI !important",
        fontStyle: "normal !important",
        fontSize: "30px",
        fontWeight: "600",
        lineHeight: "54px",
        color: "#000",
        textDecoration: "none !important",
        textDecorationStyle: "none !important",
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
        display: "inline-block",
        textAlign: "center !important",
        color: "#EDEBE9"
    },
    introMessage :{
        textAlign: "center !important",
        color: "#000",
        align: "center",
        fontSize: "16px",
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: "24px",
        font: "Segoe UI",
    },
    videoContainer: {
        paddingTop:"5px",
        paddingBottom:"5px",
        maxWidth: "100%",
        zIndex: "5",

    },
    inputVideo: {
        visibility:"collapse",
        position:"absolute",
        left: "-100vw",
        marginBottom: "10px",
        "&,& video": {
            borderRadius:"14px",
            width: "100%",
            height: "auto",
            visibility: "collapse"
        }
    },
    inputTextBox: {
        backgroundColor: "#F3F2F1",
        border: "1px solid #605E5C",
        borerRadius: "2px",
        width: "100%",
            height: "auto",
    },
    learnMore: {
        color: "#000",
        fontSize: "18px",
        fontWeight: "500",
        paddingTop: "24px",
        paddingBottom: "24px",
    },
    cameraEnabled: {
        "&,& canvas": {
            display: "block",
        }
    },
    outputCanvas: {
        zIndex: "1",
        "&,& canvas": {
            borderRadius:"14px",
            height: "auto",
            width: "100%",
            display: "block",
        }
    },
    streamStatus: {
        paddingLeft: "1.5em",
        position: "relative",
        fontColor:"#000",
        "&, &::before": {
            position: "absolute",
            left: "0em",
            content: '',
            display: "block",
            height: "1em",
            width: "1em",
            borderRadius: "1em",
            backgroundColor: "#000",
            fontColor:"#000"
        },
        "&, & .connected::before": {
            color:"#000 !important",
            backgroundColor: "#8fe1d3"
        },
        "&, & .disconnected::before": {
            color:"#000 !important",
            backgroundColor: "#fb3c4e"
        }
    },
    connected : {
        color:"#000 !important",
        backgroundColor: "#8fe1d3"
    },
    disconnected: {
        color:"#000 !important",
        backgroundColor: "#fb3c4e"
    },
    startButton  : {
       
        color:"#fff",
        fontSize: "13px",
        fontWeight:"600",
        lineHeight:"18px",
        textAlign:"center",
        alignItems:"center",
        marginTop:"8px",
        backgroundColor: "#0078D4",
        borderRadius: "2px",
        border:"1px solid #000",
        width:"100%",
        height:"32px",
        "&:hover" : {
            textDecoration: "underline",
            backgroundColor: "#3293dc"
        },
        [theme.breakpoints.down("sm")]: {
            width:"80%",
            top: "20vh",
            left: "10vw",
        },
    },
    enableCameraButton  : {
    
        color:"#fff",
        fontSize: "13px",
        fontWeight:"600",
        lineHeight:"18px",
        textAlign:"center",
        alignItems:"center",
        marginTop:"8px",
        textDecoration: "none",
        backgroundColor: "#0078D4",
        borderRadius: "2px",
        border:"1px solid #000",
        width:"100%",
        height:"32px",
        zIndex:"100",
        "&:hover" : {
            textDecoration: "underline",
            backgroundColor: "#3293dc"
        },
        [theme.breakpoints.down("sm")]: {
            width:"80%",
            top: "20vh",
            left: "10vw",
        },
    },
    shareButton  : {
        color:"#000",
        fontSize: "13px",
        fontWeight:"600",
        lineHeight:"18px",
        textAlign:"center",
        alignItems:"center",
        margin: "10 auto",
        marginTop:"8px",
        backgroundColor: "#fff",
        borderRadius: "2px",
        border:"1px solid",
        width:"100%",
        height:"32px",
        minWidth:"100%",
        zIndex:"100",
    },
    getDemoSessions : {
        position:"absolute",
        top: "25vh",
        left: "10vw",
        color:"#000",
        fontSize: "24px",
        fontWeight:"400",
        textAlign:"center",
        alignItems:"center",
        width:"100%",
        height:"32px",
        zIndex:"10",
        paddingRight: "24px",
    },
    noEventsAvailable : {
        position:"absolute",
        top: "30vh",
        left: "10vw",
        color:"#000",
        fontSize: "24px",
        fontWeight:"400",
        textAlign:"center",
        alignItems:"center",
        lineHeight: "38px",
        width:"100%",
        height:"32px",
        zIndex:"10",
        paddingRight: "24px",
    },
    videoSideNav : {
        
    },
    ...tooltipsStyle,
});

export default demoPage;