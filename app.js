const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override")
const ejsMate = require("ejs-mate");


app.engine("ejs", ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));


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

// app.get("/testlisting",async (req,res)=>{
//     let smapleListing = new listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"india",
//     });

//     await smapleListing.save();
//     console.log("sample was saved");
//     res.send("successful");
// });
//index route
app.get("/listings", async (req,res)=>{
    const alllistings = await Listing.find({});
    res.render("./listings/index.ejs" , {alllistings});
  });


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
 
  //show route
  app.get("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
  })

  //create route
  app.post("/listings" , async (req,res)=>{
 
     const newlisting=new Listing(req.body.listing);
     await newlisting.save();

res.redirect("/listings");

  })

  //edit route
  app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);

    res.render("./listings/edit.ejs",{listing})
  })

  //update route
  app.put("/listings/:id", async (req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
    
  })


  //delete route

  app.delete("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
  })
app.get("/",(req,res)=>{
    res.send("hiiii i am root");
});


app.listen(8080, ()=>{
    console.log("server working");
});