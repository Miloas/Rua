/*eslint-env node*/
const { readFileSync, writeFileSync, existsSync } = require('fs')
const { resolve } = require('path')
const { homedir } = require('os')
const gaze = require('gaze')

const startRpc = require('./aria2server/aria2RpcServer')

const configPath = resolve(homedir(),'.aria2config')

function RpcConfig() {
  this.p = undefined
  this.init = () => {
    let defaultConfigName = process.platform === 'darwin' ? 'defaultConfig_mac' : 'defaultConfig_win'
    if(!existsSync(configPath)) {
      let defaultConfig = readFileSync(resolve(__dirname, 'aria2server', defaultConfigName))
      writeFileSync(configPath, defaultConfig)
    }
    this.p = startRpc(configPath)
    let that = this
    gaze(configPath, function (err) {
      if(err)throw err
      this.on('changed', () => {
        that.p.kill()
        that.p = startRpc(configPath)
      })
      this.on('error', () => {
        // Ignore file watching errors
      })
    })
  }
}

module.exports = RpcConfig