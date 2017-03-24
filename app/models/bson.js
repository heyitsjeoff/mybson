var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var BSONSchema = new Schema({
    bson: {
        type: Schema.Types.Mixed,
        required: [true, 'bson required'],
        index: true
    },
    userID: {
        type: Schema.Types.ObjectId, ref: 'User',
        index: true
    }
});

// BSONSchema.pre('save', function(next){
//
//     var bson = this;
//
//     // if a userid is set
//     if(bson.userID){
//
//       User.findById(bson.userID, function(err){
//
//           if(err){
//
//               return next(new Error('That user does not exist'));
//
//           }
//
//           next();
//
//       });
//
//     }
//
// });

module.exports = mongoose.model('BSON', BSONSchema);
