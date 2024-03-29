
import { container } from "styles/jss/nextjs-material-kit.js";


const featuresStyle = (theme) => ({
    section: {
        padding: "40px 20px 0",
        align: "center",
        textAlign: "left !important",
        color: "#000 !important",
        backgroundColor: "#FAF9F8",
        [theme.breakpoints.down("xs")]: {
            "& div.MuiTabs-root": {
                paddingBottom: "60px"
            }
        }
    },
    textSection: {
        padding: "15px",
        textAlign: "left !important",
    },
    navBox: {
        borderRadius: "0px",
    },

    container
});



export default featuresStyle;
