//Adding an Alias for use to the whole project
import * as Alias from "module-alias"
Alias.addAlias("", __dirname)

import Express from "express"
import Driver from "/lib/driver"
import Log from "/lib/log"

let Arduino = new Driver("COM4", 9600)
let server = Express()

server.post("/get_raw_data", (req, res) => {
  res.send({
    isConnected: Arduino.isConnected,
    data: parseFloat(Arduino.outputString)
  })
})

Log.clear()
Log.writeLine("Preparing server.", 1)

//Static Page
let staticPath = __dirname.replace(/\\backend\\prod$/gi, "\\frontend")
console.log(staticPath)
server.use(Express.static(staticPath))

server.use((req, res, next) => {
  //Configure Headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200)
  }
  else {
    next()
  }
})

server.listen(80, () => {
  Log.writeLine("Server is Ready, listening...", 2)
})
