
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import { Router, useRouter } from "next/router";
//import { I18nProvider } from 'next-localization';
import { NextIntlProvider } from 'next-intl';

import PageChange from "components/PageChange/PageChange.js";

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {



  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    const { lngDict, ...rest } = pageProps;

    return (
      <NextIntlProvider

        // To achieve consistent date, time and number formatting
        // across the app, you can define a set of global formats.
        formats={{
          dateTime: {
            short: {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }
          }
        }}
        // Messages can be received from individual pages or configured
        // globally in this module (`App.getInitialProps`). Note that in
        // the latter case the messages are available as a top-level prop
        // and not nested within `pageProps`.
        messages={pageProps.messages}
        // Providing an explicit value for `now` ensures consistent formatting of
        // relative values regardless of the server or client environment.
        now={new Date(pageProps.now)}
      >
        <React.Fragment>

          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Azure AMS - Low latency live streaming at scale</title>
          </Head>
          <Component {...pageProps} />

        </React.Fragment>
      </NextIntlProvider >
    );
  }
}
