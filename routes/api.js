var express = require('express');
var router = express.Router();
var db = require('../models/database')

router.get('/', function(req, res, next){
  db.find({}).then(function(err, data){
    if(err){
      res.send(err);
    }
    res.send(data);
  })
})

router.post('/', function (req, res, next) {
    var newData = new db();
      newData['light'] = req.body.light
      newData['airPress'] = req.body.airPress
      newData['temp'] = req.body.temp
      newData['humidity'] = req.body.humidity
    newData.save().then(function(err, data){
      if(err){
        res.send(err)
      }
      else {
        res.send({
          message : "Data uploaded!"
        })
      }
    })
})

//Require all data from one sensor
router.get('/:sensor', db.findData, function(req, res, next){
  if(req.data){
    res.send({
      payload : req.data
    })
  }
  else {
    res.send({
      message : "Data not found!"
    })
  }
})

//Require all sensors data for a period of time
// router.get('/period/:day', db.findDataPeriod, function(req, res, next){
//   if(req.data){
//     res.send({
//       payload : req.data
//     })
//   }
//   else {
//     res.send({
//       message : "Data not found!"
//     })
//   }
// })

//Plot all sensors data of a day
router.post('/plot',db.findDataPeriod,function (req, res, next) {
  if(req.data){
    var points = getPoints(req.data)
    res.send(points);
  }
  else {
    res.send({
      message : "Data not found!"
    })
  }
})

function getPoints(dataQuery){

  var dataHumidity = {};
  dataHumidity["humidity"] = [];
  var dataLight = {};
  dataLight["light"] = [];
  var dataTemp = {};
  dataTemp["temp"] = [];
  var dataAirPress = {};
  dataAirPress["airPress"] = [];
  var j=0

  for (var i in dataQuery) {
      dataLight["light"].push({x:dataQuery[i].date, y:dataQuery[i].light})
      dataTemp["temp"].push({x:dataQuery[i].date, y:dataQuery[i].temp})
      dataHumidity["humidity"].push({x:dataQuery[i].date, y:dataQuery[i].humidity})
      dataAirPress["airPress"].push({x:dataQuery[i].date, y:dataQuery[i].airPress})
      j++
  }

  dataLight=JSON.stringify(dataLight)
  dataTemp=JSON.stringify(dataTemp)
  dataHumidity=JSON.stringify(dataHumidity)
  dataAirPress=JSON.stringify(dataAirPress)

  var finalObj = dataLight.substring(0,dataLight.length-1) + "," + dataTemp.substring(1,dataLight.length-1) + "," + dataHumidity.substring(1,dataHumidity.length-1) + "," + dataAirPress.substring(1,dataAirPress.length)
  return finalObj
}


module.exports = router
