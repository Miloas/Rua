// @flow
import React, { Component } from "react";

// import { Link } from "react-router";
// import styles from "./Home.css";
import BottomMenuContainer from "../containers/BottomMenuContainer"
import TopBar from "./TopBar"
import VisibleDownloadList from "../containers/VisibleDownloadList"

export default class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <VisibleDownloadList />
        <BottomMenuContainer />
      </div>
    );
  }
}
