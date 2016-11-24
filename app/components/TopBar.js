// @flow
import React, { Component } from "react";
import Styles from "./TopBar.css"

export default class TopBar extends Component {
  render() {
    return (
      <div className={Styles.topbar_header}>
        Dowloads
      </div>
    );
  }
}
