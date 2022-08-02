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
        backgroundColor: "#F0F0F0",
    },
    container: {
        zIndex: "4",
        width: "100vw",
        minHeight: "80vh",
        color: "#FFFFFF",
        backgroundColor: "#F0F0F0",
        textAlign: "left",
        paddingTop: "80px",
        ...container,

        "&, & label": {
            color: "#000",
            fontSize: "14px",
            fontWeight: "600",
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
    introMessage: {
        textAlign: "left",
        backgroundColor: "#D4D4D4",
        color: "#000",
        align: "left",
        fontSize: "20px",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "15px 15px",
        border: "1px solid black",
        fontStyle: "normal",
        lineHeight: "24px",
        font: "Segoe UI",
    },
    videoContainer: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "5px",
        paddingBottom: "0px",
        maxWidth: "100%",
        zIndex: "5",

    },
    inputVideo: {
        visibility: "collapse",
        position: "absolute",
        left: "-100vw",
        marginBottom: "10px",
        "&,& video": {
            borderRadius: "14px",
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
            borderRadius: "14px 14px 0px 0px",
            height: "auto",
            width: "100%",
            display: "block",
        }
    },
    streamStatus: {
        paddingLeft: "1.2em",
        paddingRight: "1.2em",
        position: "absolute",
        top: "15px",
        left: "25px",
        fontColor: "#fff",
        borderRadius: "8px",
        backgroundColor: "gray",
        fontWeight: "400"
    },
    connected: {
        color: "#fff !important",
        backgroundColor: "#D24726"
    },
    disconnected: {
        color: "#fff !important",
        backgroundColor: "gray"
    },
    startButton: {
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
        lineHeight: "18px",
        textAlign: "center",
        alignItems: "center",
        marginTop: "8px",
        backgroundColor: "#0078D4",
        borderRadius: "2px",
        border: "1px solid #000",
        width: "100%",
        height: "32px",
        "&:hover": {
            textDecoration: "underline",
            backgroundColor: "#3293dc"
        },

        [theme.breakpoints.down("sm")]: {
            width: "80%",
            top: "15px",
            left: "10vw",
        },
    },
    enableContainer: {
        width: "50vw",
        marginLeft: "10vw",
        align: "center !important",
        maxWidth: "200px",
        [theme.breakpoints.down("md")]: {
            width: "50vw",
            marginLeft: "22vw",
        },
        [theme.breakpoints.down("sm")]: {
            width: "50vw",
            marginLeft: "20vw",
        },
    },
    enableCameraButton: {
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
        lineHeight: "18px",
        marginTop: "8px",
        textDecoration: "none",
        backgroundColor: "#0078D4",
        borderRadius: "2px",
        border: "1px solid #000",
        width: "100%",
        height: "32px",
        zIndex: "100",
        "&:hover": {
            textDecoration: "underline",
            backgroundColor: "#3293dc"
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "70px",
        },
    },
    shareButton: {
        color: "#000",
        fontSize: "13px",
        fontWeight: "600",
        lineHeight: "18px",
        textAlign: "center",
        alignItems: "center",
        margin: "10 auto",
        marginTop: "8px",
        backgroundColor: "#fff",
        borderRadius: "2px",
        border: "1px solid",
        width: "100%",
        height: "32px",
        minWidth: "100%",
        zIndex: "100",
    },
    getDemoSessions: {
        position: "relative",
        top: "25vh",
        left: "0vw",
        color: "#000",
        fontSize: "24px",
        fontWeight: "400",
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        height: "32px",
        zIndex: "10",
        paddingRight: "24px",
    },
    noEventsAvailable: {
        position: "relative",
        top: "40vh",
        left: "0vw",
        color: "#000",
        fontSize: "24px",
        fontWeight: "400",
        textAlign: "center",
        alignItems: "center",
        lineHeight: "38px",
        width: "100%",
        height: "32px",
        zIndex: "10",
        paddingRight: "24px",
    },
    videoTopBar: {
        align: "center",
        paddingLeft: "60px",
        paddingTop: "0px",
        paddingBottom: "15px",
        width: "100%",
        alignItems: "center",
    },
    clock: {
        position: "relative",
        top: "5px",
        paddingRight: "25px",
        font: "Segoe UI",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "24px"
    },
    clockLabel: {
        font: "Segoe UI",
        fontWeight: "400",
        fontSize: "18px",
        lineHeight: "24px"
    },
    videoSideNav: {

    },
    productTitle: {
        position:"relative",
        top:"-15px",
        color: "#323130 !important",
        fontWeight:"400",
        fontSize:"14px"
    },
    splashImage: {
        borderRadius: "8px",
        marginLeft: "5px",
        marginTop: "5px",
        width:"100%",
        height: "auto",
    },
    splashText: {
        fontWeight:"400",
        fontSize:"13px",
        lineHeight:"18px",
        fontColor:"#000",
    },
    modalFooter: {
        marginRight: "32px",
        marginBottom: "20px"
    },
    playerControls: {
        marginTop: "auto",
        marginBottom: "50px",
        backgroundColor: "#000",
        width: "100%",
        align: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0px 0px 14px 14px",
        padding: "8px 10px 8px 10px",
        zIndex: "10",
    },
    stopButton: {
        backgroundColor: "#D24726 !important",
        borderRadius: "15px",
        zIndex: "15",
        "&:hover": {
            backgroundColor: "#eca695 !important",
            textDecoration: "underline",
        },
        "&, &:hover": {
            backgroundColor: "#000",
        }
    },
    ...tooltipsStyle,
});

export default demoPage;