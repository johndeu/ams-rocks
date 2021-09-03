import React, { Component } from "react";
import Router from "next/router";

// Translations
import i18next from 'i18next';

export default class _error extends Component {


  render() {
    return <div >
         {i18next.t('404.message')}
    </div>;
  }
}
