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

export default function AzureFooter(props) {

    const classes = useStyles();

    const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
    const headerClasses = classNames({
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed,
    });

    const [_document, set_document] = React.useState(null)

    React.useEffect(() => {
        set_document(document)

        // Import jQuery as a global window object for the Azure Header scripts to work.
        window.jQuery = window.$ = require('jquery')

        window.$.ajax({
            url: 'https://azurecomcdn.azureedge.net/asset/footer/' + '?fmin=only'
        })
            .done(function (footerMarkup) {
                $.getScript('https://azurecomcdn.azureedge.net/en-us/asset/footerjs/');
                $('.footer-container').html(footerMarkup);

                  // Hide or change some stuff on the footer...
                document.querySelector("[data-bi-id='sitemap']").style.display='none'
                document.querySelector("[data-bi-id='terms-of-use']").href="https://docs.microsoft.com/legal/termsofuse";
                document.querySelector("[data-bi-id='feedback']").href="https://feedback.azure.com/forums/169396-azure-media-services"
                document.querySelector("[data-bi-id='contact-us']").href="https://azure.microsoft.com/en-us/overview/contact-azure-sales/"
                
            })

      
        return function cleanup() {
        };
    });



    return (
        <>
            <React.Fragment>
                <Head >
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://azurecomcdn.azureedge.net/en-us/asset/footercss/"></link>

                </Head>
            </React.Fragment>
            <div className="footer-container">
            </div>
        </>
    );
}

