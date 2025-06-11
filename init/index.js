const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to the DB")
}).catch((err)=>{                  
    console.log(err)
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

const initDB = async() =>{
    await Listing.deleteMany({});  // it delet if there exist any data
    initData.data = initData.data.map((obj)=>({...obj,owner:'6842c814b88f9e4b91b6668c'}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized ");
    
}
initDB();
