import React from "react";
import Head from "next/head";
// core components
import styles from "styles/jss/nextjs-material-kit/components/headerStyle.js";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";

const useStyles = makeStyles(styles);

const partnerId = "MSMedia"
const headerId = "MSMediaHeader";
const footerId = "MSMediaFooter";
const market = i18next.language;
const uhfServiceUrl = `https://uhf.microsoft.com/${market}/shell/xml/${partnerId}?headerid=${headerId}&footerid=${footerId}&CookieComplianceEnabled=true`


export default function UHFHeader(props) {

    const classes = useStyles();

    const { fixed } = props;
    const headerClasses = classNames({

        [classes.fixed]: fixed
    });

    const [_document, set_document] = React.useState(null)

    React.useEffect(() => {
        set_document(document)

        if (props.changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        // Import jQuery as a global window object for the Azure Header scripts to work.
        window.jQuery = window.$ = require('jquery')

        window.$.ajax({
            url: uhfServiceUrl
        })
            .done(function (xml) {
                var headerHtml = xml.getElementsByTagName('headerHtml')[0].childNodes[0].wholeText;
                $('#header-container').html(headerHtml);

                var cssIncludes = xml.getElementsByTagName('cssIncludes')[0].childNodes[0].wholeText;
                $('head').append(cssIncludes);

                var javascriptIncludes = xml.getElementsByTagName('javascriptIncludes')[0].childNodes[0].wholeText;
                $('head').append(javascriptIncludes);

            })

        return function cleanup() {
            if (props.changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        };
    });


    const headerColorChange = () => {
        const { color, changeColorOnScroll } = props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.getElementById("header-container")
                .classList.remove(classes[color]);
            document.getElementById("header-container")
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.getElementById("header-container")
                .classList.add(classes[color]);
            document.getElementById("header-container")
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    };


    return (
        <div id="header-container" className={headerClasses}></div>
    );
}

UHFHeader.defaultProp = {
    color: "white",
    fixed: true,
    changeColorOnScroll: {
        height: 50,
        color: "primary"
    }
};

UHFHeader.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark",
    ]),
    fixed: PropTypes.bool,
    // this will cause the sidebar to change the color from
    // props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is higher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // props.color (see above)
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "transparent",
            "white",
            "rose",
            "dark",
        ]).isRequired,
    }),
}
