// @flow
import { List } from "semantic-ui-react"
import JSONRpcClient from "JSONRpc"
import React, { Component } from "react";
import styles from "./DownloadItemList.css"
import DownloadItemContainer from "../containers/DownloadItemContainer"

export default class DownloadItemList extends Component {
  componentDidMount() {
    this.client.callOverWs('aria2.tellActive', [], (err, ret) => {
      if (err) console.log(err)
      else if (ret) {
        const xs = ret.filter((v) => this.props.downloads.every((x) => x.id !== v.gid))
        xs.forEach((x) => this.props.addItem(x.gid))
      }
    }, 1000)
    this.client.callOverWs('aria2.tellWaiting', [0, 1000], (err, ret) => {
      if (err) console.log(err)
      else if (ret) {
        const xs = ret.filter((v) => this.props.downloads.every((x) => x.id !== v.gid))
        xs.forEach((x) => this.props.addItem(x.gid))
      }
    }, 1000)
  }
  client = new JSONRpcClient("localhost", 6800, "/jsonrpc")
  render() {
    return (
      <div className={styles.content_center}>
        <List selection divided relaxed="very">
          { this.props.downloads.map(item =>
            <DownloadItemContainer
              key={item.id}
              {...item}
            />) }
        </List>
      </div>
    )
  }
}

DownloadItemList.propTypes = {
  downloads: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    filename: React.PropTypes.string.isRequired,
    completed: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    speedUnit: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  })).isRequired,
  addItem: React.PropTypes.func.isRequired
}

