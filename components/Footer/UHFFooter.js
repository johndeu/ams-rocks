import React from "react";
import Head from "next/head";
// core components
import styles from "styles/jss/nextjs-material-kit/components/headerStyle.js";

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
const uhfServiceUrl = `https://uhf.microsoft.com/${market}/shell/xml/${partnerId}?headerid=${headerId}&footerid=${footerId}`


export default function UHFFooter(props) {

    const classes = useStyles();

    const { color, fixed, absolute,} = props;
    const headerClasses = classNames({
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed
    });

    const [_document, set_document] = React.useState(null)

    React.useEffect(() => {
        set_document(document)

        // Import jQuery as a global window object for the Azure Header scripts to work.
        window.jQuery = window.$ = require('jquery')
 
        window.$.ajax({
            url: uhfServiceUrl
        })
            .done(function (xml) {
                //$.getScript('https://azurecomcdn.azureedge.net/asset/menujs/');
               
                var footerHtml = xml.getElementsByTagName('footerHtml')[0].childNodes[0].wholeText;
                $('#footer-container').html(footerHtml);

                var cssIncludes = xml.getElementsByTagName('cssIncludes')[0].childNodes[0].wholeText;
                $('head').append(cssIncludes);

                var javascriptIncludes = xml.getElementsByTagName('javascriptIncludes')[0].childNodes[0].wholeText;
                $('head').append(javascriptIncludes);

            }) 

    });

    return (
        <>
            <div id="footer-container"></div>
           
        </>
    );
}

