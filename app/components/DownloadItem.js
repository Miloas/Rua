// @flow
import JSONRpcClient from "JSONRpc";
import path from "path"
import { Image, List, Progress, Statistic, Icon } from "semantic-ui-react"
import React, { Component } from "react";
import styles from "./DownloadItem.css"


export default class DownloadItem extends Component {
  state = {
    speedUnit: this.props.speedUnit,
    speed: this.props.speed,
    completed: this.props.completed,
    filename: this.props.filename,
    status: this.props.status
  }
  componentDidMount() {
    this.client.callOverWs("aria2.tellStatus", [this.props.id], (err, ret) => {
      if (err)console.log(err)
      else {
        if (this.client && ret && ret.status === "complete") {
          this.client.closeWs()
        }
        // console.log(ret)
        if (ret) {
          this.setState({
            status: ret.status
          })
        }
        if (ret && (+ret.totalLength)) {
          let speed = +ret.downloadSpeed
          const speedUnits = ['b', 'kb', 'mb', 'gb']
          let i = 0
          while (Math.floor(speed / 1024)) {
            if (i < 1) speed = Math.floor(speed / 1024)
            else speed = +(speed / 1024).toFixed(2)
            i += 1
          }
          const speedUnit = speedUnits[i]
          this.setState({
            completed: Math.floor(((+ret.completedLength) * 100) / (+ret.totalLength)),
            filename: path.basename(ret.files[0].path),
            speed,
            speedUnit,
          })
        }
      }
    }, 500)
  }
  handleRemove = () => {
    if (this.client.wsClient !== null) {
      this.client.closeWs()
      this.client.call('aria2.remove', [this.props.id], (err, ret) => {
        if (err) console.log(err)
        else {
          console.log(ret)
          this.props.removeItem(this.props.id)
        }
      })
    } else {
      this.client.call('aria2.removeDownloadResult', [this.props.id], (err, ret) => {
        if (err) console.log(err)
        else {
          console.log(ret)
          this.props.removeItem(this.props.id)
        }
      })
    }
  }
  handleDoubleClick = () => {
    if (this.state.status === 'active') {
      this.client.call('aria2.pause', [this.props.id], (err, ret) => {
        if (err) console.log(err)
        else {
          console.log(ret)
          this.props.pauseItem(this.props.id)
        }
      })
    }
    if (this.state.status === 'paused') {
      this.client.call('aria2.unpause', [this.props.id], (err, ret) => {
        if (err) console.log(err)
        else {
          console.log(ret)
          this.props.resumeItem(this.props.id)
        }
      })
    }
  }
  client = new JSONRpcClient("localhost", 6800, "/jsonrpc")
  render() {
    return (
      <List.Item onDoubleClick={this.handleDoubleClick} className={styles.bg_color}>
        <List.Content floated="right" className={styles.padding_top}>
          {(() => {
            if (this.state.status === 'complete')
              return <Icon name="checkmark" size="big" color="green" />
            else if (this.state.status === 'paused')
              return <Icon name="pause" size="big" color="teal" />
            return <Statistic size="mini" label={`${this.state.speedUnit}/s`} color="teal" value={`${this.state.speed}`} />
          })()}
          <Icon name="remove" onClick={this.handleRemove} />
        </List.Content>
        <Image width="26px" src="finder.png" />
        <List.Content>
          <List.Header as="a" className={styles.item_max_width}>{this.state.filename}</List.Header>
          <Progress percent={this.state.completed} size="tiny" color="blue">
            {`${this.state.completed}%`}
          </Progress>
        </List.Content>
      </List.Item>
    )
  }
}

DownloadItem.propTypes = {
  speedUnit: React.PropTypes.string.isRequired,
  speed: React.PropTypes.number.isRequired,
  completed: React.PropTypes.number.isRequired,
  filename: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  removeItem: React.PropTypes.func.isRequired,
  pauseItem: React.PropTypes.func.isRequired,
  resumeItem: React.PropTypes.func.isRequired
}
