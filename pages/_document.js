import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import i18next from 'i18next';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us" className="azure-header-static">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
              {/*  <!-- Robots --> */}
              <meta name="robots" content="all, noarchive" />
          <meta name="Description" content={i18next.t("meta.description")} />
          <meta name="Keywords" content={i18next.t("meta.keywords")} />
          {/*  <!-- Schema.org markup for Google+ --> */}
          <meta itemprop="title" content={i18next.t("meta.pageTitle")} />
          <meta itemprop="name" content={i18next.t("meta.pageTitle")} />
          <meta itemprop="description" content={i18next.t("meta.description")} />
          <meta itemprop="image" content="https://media.microsoft.com/img/AMS-Social.jpg" />
          {/*  <!-- Twitter Card data --> */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={i18next.t("meta.site")} />
          <meta name="twitter:title" content={i18next.t("meta.pageTitle")} />
          <meta name="twitter:description" content={i18next.t("meta.description")} />
          <meta name="twitter:creator" content="@microsoft" />
          <meta name="twitter:image:src" content="https://media.microsoft.com/img/AMS-Social.jpg" />
          {/*  <!-- Open Graph data --> */}
          <meta name="og:type" property="og:type" content="website"></meta>
          <meta property="og:title" content={i18next.t("meta.pageTitle")} />
          <meta property="og:description" content={i18next.t("meta.description")} />
          <meta property="og:url" content={i18next.t("meta.site")} />
          <meta property="og:image" content="http://media.microsoft.com/img/AMS-Social.jpg" />
          <meta property="og:image:type" content="image/jpeg" /> 
          <meta property="og:image:width" content="400" /> 
          <meta property="og:image:height" content="300" />
         {/*  <meta property="og:image:secure_url" content="https://media.microsoft.com/img/AMS-Social.jpg" /> */}
          <meta property="og:site_name" content={i18next.t("meta.pageTitle")} />
         {/* Bing site validation */}
          <meta name="msvalidate.01" content="DD1672A3419E713D6AFEE437B7EEC16A" />
          {/*  <!-- DNS prefetch --> */}
          <link rel="dns-prefetch" href="//microsoft.com" />
          <link rel="canonical" href="https://media.microsoft.com/"></link>
          <link rel="preconnect" href="//wcpstatic.microsoft.com" crossorigin></link>
          <link rel="shortcut icon" href="/img/ams.svg" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/apple-icon.png"
          />
          {/* Fonts and icons */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="https://azurecomcdn.azureedge.net/en-us/asset/footercss/"></link>

          <script type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "cbwra7gn5x");
              `,
            }}
          />

          <script type="text/javascript" src="https://wcpstatic.microsoft.com/mscc/lib/v2/wcp-consent.js"></script>
        </Head>
        <body>
          <div id="page-transition"></div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
