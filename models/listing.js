const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review =require("./review.js");
const listingSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
            type:String,
            set: (v)=> (v==="")?"https://static.vecteezy.com/system/resources/previews/023/308/053/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg":v,
            },
  
    price:{
        type:Number,
        default:1000,
    },
    location:{
        type:String,
    },
    country:{
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type : Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
         await Review.deleteMany({_id: {$in: listing.reviews}});
        }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;