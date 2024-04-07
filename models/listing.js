const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
description:String,
    image:{
        type:String,
        set: (v)=>v ===""? "https://www.istockphoto.com/photo/passenger-airplane-flying-above-clouds-during-sunset-gm155439315-21435411" : v,
       
    },
    price:Number,
    location:String,
    country:String,
});

const listing = mongoose.model("listing",listingSchema);
module.exports=listing;