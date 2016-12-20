/* eslint-env node */
const { resolve } = require('path')
function startRpcServer(configPath) {
    const cp = require('child_process')
    // return cp.execFile('aria2c', [`--conf-path=${configPath}`])
    let aria2Path = resolve(__dirname, 'aria2c_mac')
    return cp.execFile(aria2Path, [`--conf-path=${configPath}`])
}

module.exports = startRpcServer