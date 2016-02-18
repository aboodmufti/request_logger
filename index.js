
var util = require('util');
var onFinished = require('on-finished')


var logger = {}


logger.logReqRes = function(err){
    var diff = process.hrtime(logger._startAt)
    var nanoDiff = diff[0] * 1e9 + diff[1]
    var printableDiff = (nanoDiff * 0.000001).toFixed(2)
    var currMill = Date.now();
    console.log('---------------------------------');
    console.log('TIME:', logger.readable);
    console.log("REQUEST:" )
    console.log("         "+logger.request.method +" "+logger.request.url + " - "+logger.response.statusCode+" - " + printableDiff +" ms")
    for(prop in logger.request.headers){
      console.log("         "+prop+": "+ logger.request.headers[prop])
    }
    console.log('---------------------------------');
  }


logger.start = function (req, res, next) {
    logger._startAt = process.hrtime()
    logger.now = new Date()
    logger.readable = logger.now.toString()
    logger.request = req
    logger.response = res
    onFinished(res, logger.logReqRes)
    next();
  }


module.exports = logger