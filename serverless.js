'use strict';
const app = require('./lib/app')
const { Server } = require('@webserverless/fc-express')

let server
exports.init = function (context, cb) { 
  if (!server) { 
    server = new Server(app.callback(), () => {
      cb(null, 'finish init'); 
    })
    server.startServer() 
  }
 }

exports.main = (event, context, callback) => {
  server.proxy(event, context, callback)
}
