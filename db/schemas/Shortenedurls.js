let mongoose=require('mongoose');

// const mongoose = require("mongoose");
const schema = mongoose.Schema;
let ShortenedurlsSchema = new schema({
   originalurl:{
         type:String
   },
    shortenedurl:{
        type:String
    },
    visited:{
        type:Number
    },
    created:{
        type:Date,
    },


})
module.exports = mongoose.model("Shortenedurls", ShortenedurlsSchema);