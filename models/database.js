var mongoose = require('mongoose');

var CeibaDBSchema = mongoose.Schema({
  light : {type : String, required: true},
  airPress : {type : String, required: true},
  temp : {type : String, required: true},
  humidity : {type : String, required: true},
  date : {type : Date, required: true, default: Date.now},
});

// Find all data of a certain type
CeibaDBSchema.statics.findData = function(req, res, next) {
  mongoose.model('CeibaDB').find({}, (req.body.sensor||req.params.sensor) , function(err, data){
    if(err){
      next(err)
    }
    else {
      req.data = data
      next();
    }
  })
};

// CeibaDBSchema.statics.findData = function(req, res, next) {
//   mongoose.model('CeibaDB').findById('5b109b2d627ea9258dc8a352', function(err, data){
//     if(err){
//       next(err)
//     }
//     else {
//       // data.date.getMonth()+1;  // dateStr you get from mongodb
//       var date0 = (data.date)
//       var date1 = (data.date).getMonth()+1
//       var hour = (data.date).getHours()
//       console.log(date0)
//       console.log(date1)
//       console.log(hour)
//       // var time= date1.getTime();
//       // console.log(time);
//       // console.log(date1.getMonth());
//       req.data = data
//       next();
//     }
//   })
// };

// CeibaDBSchema.statics.findDataPeriod = function(req, res, next) {
//     var ReqDate = (req.body.day || req.params.day)
//     var dd = ReqDate.substring(8)
//     var mm = ReqDate.substring(5,7)
//     var yyyy = ReqDate.substring(0,4)
//     mm = parseInt(mm, 10)
//     mm = mm-1
//     console.log(yyyy)
//     console.log(mm)
//     console.log(dd)
//     var currentDate = new Date(yyyy,mm,dd)
//     var nextDay = new Date(currentDate);
//     nextDay.setDate(currentDate.getDate()+1);
//     var query = mongoose.model('CeibaDB').find({$and:[{date:{$gte:currentDate}},{date:{$lt:nextDay}}]}, function(err, data){
//     if(err){
//       next(err)
//     }
//     else {
//       req.data = data
//       next();
//     }
//   }).sort({date: 1})
// };
//

CeibaDBSchema.statics.findDataPeriod = function(req, res, next) {
    var ReqDate = (req.body.myDate || req.params.myDate)
    var dd = ReqDate.substring(8)
    var mm = ReqDate.substring(5,7)
    var yyyy = ReqDate.substring(0,4)
    mm = parseInt(mm, 10)
    mm = mm-1
    console.log(yyyy)
    console.log(mm)
    console.log(dd)
    var currentDate = new Date(yyyy,mm,dd)
    var nextDay = new Date(currentDate);
    console.log(currentDate)
    nextDay.setDate(currentDate.getDate()+1);
    console.log(nextDay)
    mongoose.model('CeibaDB').find({$and:[{date:{$gte:currentDate}},{date:{$lt:nextDay}}]},"light humidity airPress temp date",function(err, data){
    if(err){
      next(err)
    }
    else {
      req.data = data.sort({date: 1})
      next();
    }
  })
};






module.exports = mongoose.model('CeibaDB', CeibaDBSchema);
