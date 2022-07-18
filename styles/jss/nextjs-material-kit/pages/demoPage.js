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
        color: "#FFFFFF",
        backgroundColor: "#fff",
        textAlign: "center",
        paddingTop: "2vh",
        ...container,
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
    info: {

    },
    videoContainer: {
        "&,& startButton" : {
            fontSize: "2em",
            margin: "0 auto",
            maxWidth: "50%",
            zIndex: "5"
        }
    },
    inputVideo: {
        "&,& video": {
            width: "100%",
            height: "auto",
            visibility: "visible"
        }
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
            height: "100%",
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

    },
    ...tooltipsStyle,
});

export default demoPage;