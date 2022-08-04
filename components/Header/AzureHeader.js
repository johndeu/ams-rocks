import React from "react";
import Head from "next/head";
// core components
import styles from "styles/jss/nextjs-material-kit/components/headerStyle.js";
import 'wcp-consent-init.js';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";

const useStyles = makeStyles(styles);

export default function AzureHeader(props) {

    const classes = useStyles();

    const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
    const headerClasses = classNames({
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed,
        "azureHeaderBar": true,
        "header-main": true,
    });

    const [_document, set_document] = React.useState(null)

    React.useEffect(() => {
        set_document(document)

        // Import jQuery as a global window object for the Azure Header scripts to work.
        window.jQuery = window.$ = require('jquery')
 
        window.$.ajax({
            url: 'https://azurecomcdn.azureedge.net/asset/header/' + '?hmin=included'
        })
            .done(function (headerMarkup) {
                $.getScript('https://azurecomcdn.azureedge.net/asset/menujs/');
                 $('.header-container').html(headerMarkup);

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
            document.getElementById("azure-header")
                .classList.remove(classes[color]);
            document.getElementById("azure-header")
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.getElementById("azure-header")
                .classList.add(classes[color]);
            document.getElementById("azure-header")
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    };

    const headerHtml = 
        <header id="azure-header" className={headerClasses} data-module="header">
        </header>
  

    const headerMinimumHtml = <div id="azure-header-minimum" class="header-minimum header-minimum--secondary" data-module="header-minimal" aria-hidden="true">

        <div class="header-minimum__container">
            <div class="nav-identity ">
                <a href="https://www.microsoft.com/" aria-label="Microsoft" data-bi-id="microsoft" data-bi-ct="l1-home" class="nav__link--microsoft" tabindex="-1">
                    <span class="icon icon-size2"><svg aria-hidden="true" role="presentation" data-slug-id="microsoft-square" viewBox="0 0 26 25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5708 0.981934H0.907471V12.3682H12.5708V0.981934Z" fill="#F25022" />
                        <path d="M25.4625 0.981934H13.7992V12.3682H25.4625V0.981934Z" fill="#7FBA00" />
                        <path d="M12.5708 13.5649H0.907471V24.9512H12.5708V13.5649Z" fill="#00A4EF" />
                        <path d="M25.4629 13.5649H13.7996V24.9512H25.4629V13.5649Z" fill="#FFB900" />
                    </svg></span>
                </a>
                <a href="https://azure.microsoft.com/en-us/" class="nav__link--home" data-bi-id="azure" data-bi-ct="l1-home" tabindex="-1">Azure</a>
            </div>
            <ul class="list--links-horizontal nav--free-account">
                <li>
                    <a href="/en-us/overview/contact-azure-sales/"
                        class="nav__link--contact-sales"
                        data-bi-id="contact-sales"
                        data-bi-ct="l1-utility"
                        tabindex="-1">
                        Contact Sales
                    </a>
                </li>
                <li>
                    <a href="https://azure.microsoft.com/en-us/free/"
                        class="nav__link--free-green"
                        data-bi-id="free-account"
                        data-bi-ct="l1-cta"
                        tabindex="-1">
                        Free account
                    </a>
                </li>
            </ul>
        </div>
    </div>

    return (
        <>
            <React.Fragment>
                <Head >
                    <script src="https://wcpstatic.microsoft.com/mscc/lib/v2/wcp-consent.js"></script>
                    
                </Head>
            </React.Fragment>
            <div id="cookie-banner"></div>
            <div className="header-container">
                <a href="#main" class="skip-nav">Skip Navigation</a>
                {headerHtml}
                {headerMinimumHtml}
            </div>
           
        </>
    );
}

