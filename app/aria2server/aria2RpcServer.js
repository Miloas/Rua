/* eslint-env node */
const { resolve } = require('path')
function startRpcServer(configPath) {
    const cp = require('child_process')
    // return cp.execFile('aria2c', [`--conf-path=${configPath}`])
    let execfile = process.platform === 'darwin' ? 'aria2c_mac' : 'aria2c.exe'
    let aria2Path = resolve(__dirname, execfile)
    return cp.execFile(aria2Path, [`--conf-path=${configPath}`])
}

module.exports = startRpcServer