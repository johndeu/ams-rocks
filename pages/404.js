import React, { Component } from "react";
import Router from "next/router";

// Translations
import i18next from 'i18next';

export default class _error extends Component {
  componentDidMount = () => {
    Router.push("/");  // For now, lets route any 404 errors back to the home page
  };

  render() {
    return <div />;
  }
}
