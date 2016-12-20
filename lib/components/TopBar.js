// @flow
import React, { Component } from "react";

export default class TopBar extends Component {
  render() {
    return (
      <div style={topbarHeader}>
        Dowloads
      </div>
    );
  }
}

const topbarHeader = {
  height: '40px',
  lineHeight: '40px',
  padding: '0 15px',
  fontSize: '14px',
  color: '#7F7F7F',
  backgroundColor: 'rgb(255,255,255,.9)',
  WebkitUserSelect: 'none'
}
// .topbar_header {
//     height: 40px;
//     line-height: 40px;
//     padding: 0 15px;
//     font-size: 14px;
//     color: #7F7F7F;
//     background-color: rgba(255, 255, 255, .9);
//     -webkit-user-select: none;
// }