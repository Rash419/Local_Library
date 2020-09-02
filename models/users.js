var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("user",UserSchema);