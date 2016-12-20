// @flow
import { Grid, Button, Icon, Modal, Form, Input, Divider } from "semantic-ui-react"
import React, { Component } from "react";
import JSONRpcClient from "JSONRpc";


export default class BottomMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, uri: "", torrentFilePath: undefined }
    this.client = new JSONRpcClient("localhost", 6800, "/jsonrpc")
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.handleURIInputChange = this.handleURIInputChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleActiveAll = this.handleActiveAll.bind(this)
    this.handlePauseAll = this.handlePauseAll.bind(this)
  }
  show () { this.setState({ open: true }) }
  close () { this.setState({ open: false }) }
  handleURIInputChange (e) { this.setState({ uri: e.target.value }) }
  handleUpload (e) {
    const file = e.target.files[0]
    const fileExtension = file.name.split(".").pop()
    console.log(fileExtension)
    const reader = new FileReader()
    reader.onload = (upload) => {
      const base64Data = btoa(upload.target.result)
      console.log(base64Data)
    }
    reader.readAsText(file)
  }
  handleSubmit () {
    if (this.state.torrentFilePath === undefined) {
      this.client.call("aria2.addUri", [[this.state.uri]], (err, ret) => {
        if (err) console.log(err)
        else {
          console.log(ret)
          this.props.addItem(ret)
          this.setState({ open: false })
        }
      })
    } else {
      console.log(this.state.torrentFilePath)
    }
  }
  handleActiveAll () {
    this.props.activeAll()
    this.client.call("aria2.unpauseAll", [], (err, ret) => {
      if (err) console.log(err)
      else console.log(ret)
    })
  }
  handlePauseAll () {
    this.props.pauseAll()
    this.client.call("aria2.pauseAll", [], (err, ret) => {
      if (err) console.log(err)
      else console.log(ret)
    })
  }
  render() {
    const { open } = this.state
    return (
      <div style={bottomFixed}>
        <div style={bottomVertival}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={14} >
                <Button fluid color="teal" onClick={this.show}><Icon name="magnet" />添加下载链接</Button>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
          <Modal size="small" open={open} onClose={this.close}>
            <Modal.Content>
              <Form>
                <Input fluid icon="linkify" iconPosition="left" onChange={this.handleURIInputChange} placeholder="Fill download URI here." />
                {/*<Divider horizontal>Or</Divider>
                <Input fluid type="file" accept=".torrent" label="torrent" onChange={this.handleUpload.bind(this)} />*/}
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button basic size="small" onClick={this.close}>
                Cancel
              </Button>
              <Button basic color="green" icon="checkmark" onClick={this.handleSubmit} labelPosition="right" content="Ok" size="small" />
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    )
  }
}

BottomMenu.propTypes = {
  addItem: React.PropTypes.func.isRequired,
  pauseAll: React.PropTypes.func.isRequired,
  activeAll: React.PropTypes.func.isRequired
}


const bottomFixed = {
  position: "fixed",
  left: 0,
  bottom: '26px',
  width: '100%',
  height: '72px',
  borderStyle: 'solid',
  borderWidth: '1px 0px',
  borderColor: '#D8D8D8'
}

const bottomVertival = {
  paddingTop: '20px'
}

/*
    bottom-fixed
*/
// .bottom_fixed {
//     position: fixed;
//     left: 0;
//     bottom: 26px;
//     width: 100%;
//     height: 72px;
//     border-style: solid;
//     border-width: 1px 0px;
//     border-color: #D8D8D8	
// }

// .bottom_vertical {
//   padding-top: 20px;
// }
