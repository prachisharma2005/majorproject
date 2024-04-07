const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listings.js");
const mongourl ="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongourl);
}

app.get("/testlisting",async (req,res)=>{
    let smapleListing = new listing({
        title:"my new villa",
        description:"by the beach",
        price:1200,
        location:"goa",
        country:"india",
    });

    await smapleListing.save();
    console.log("sample was saved");
    res.send("successful");
});



 
app.get("/",(req,res)=>{
    res.send("hiiii i am root");
});


app.listen(8080, ()=>{
    console.log("server working");
});