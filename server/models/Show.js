import mongoose from "mongoose";
const showSchema=new mongoose.Schema({
    movie:{type:String,required:true},
    showDateTime:{type:String,required:true},
    showPrice:{type:Number,required:true},
    occupiedSeats:{type:Object,default:{}}
})
const Show=mongoose.model("Show",showSchema);
export default Show;