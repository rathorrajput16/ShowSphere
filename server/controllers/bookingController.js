import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Razorpay from "razorpay";
import crypto from "crypto";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
//check availability of seats
const checkSeatsAvailability=async(showId,selectedSeats)=>{
    try{
       const showData=await Show.findById(showId)
           console.log("DB occupiedSeats =", showData.occupiedSeats);

       if(!showData)return false;
       const occupiedSeats=showData.occupiedSeats;
       const isAnySeatTaken=selectedSeats.some(seat=>occupiedSeats[seat])
       return !isAnySeatTaken;
    }
    catch(error){
      console.log(error);
      return false;
    }
}
export const createOrder = async (req,res)=>{
    try{
        console.log(req.body);
        const {showId,selectedSeats}=req.body;
         
        const isAvailable =
            await checkSeatsAvailability(
                showId,
                selectedSeats
            );

        if(!isAvailable){
            return res.json({
                success:false,
                message:"Selected seats not available"
            });
        }

        const showData =
            await Show.findById(showId);

        const amount =
            showData.showPrice *
            selectedSeats.length;
         console.log("amount =", amount);
         console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET ? "SECRET FOUND" : "NO SECRET");
        const order =
            await razorpay.orders.create({
                amount: amount * 100,
                currency:"INR",
                receipt:`receipt_${Date.now()}`
            });
            console.log("order =", order);

        res.json({
            success:true,
            order
        });

    }catch(error){
    console.log("RAZORPAY ERROR:");
    console.log(error);

    res.json({
        success:false,
        message:error.message
    });
}
}
export const verifyPayment = async (req,res)=>{
    try{
        console.log("VERIFY PAYMENT HIT");
        console.log(req.body);
        const {userId}=req.auth();

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            showId,
            selectedSeats
        } = req.body;

        const generatedSignature =
            crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");

        if(
            generatedSignature !==
            razorpay_signature
        ){
            return res.json({
                success:false,
                message:"Payment verification failed"
            });
        }

        const isAvailable =
            await checkSeatsAvailability(
                showId,
                selectedSeats
            );

        if(!isAvailable){
            return res.json({
                success:false,
                message:"Seats already booked"
            });
        }

        const showData =
            await Show.findById(showId)
            .populate("movie");

        await Booking.create({
            user:userId,
            show:showId,
            amount:
                showData.showPrice *
                selectedSeats.length,
            bookedSeats:selectedSeats,
            paymentId:razorpay_payment_id,
             isPaid: true
        });

        selectedSeats.forEach((seat)=>{
            showData.occupiedSeats[seat]=userId;
        });

        showData.markModified(
            "occupiedSeats"
        );

        await showData.save();

        res.json({
            success:true,
            message:"Booking successful"
        });

    }catch(error){

        res.json({
            success:false,
            message:error.message
        });

    }
}
export const createBooking=async(req,res)=>{
    try{
        const {userId}=req.auth();
        const {showId,selectedSeats}=req.body;
        const {origin}=req.headers;

        const isAvailable=await checkSeatsAvailability(showId,selectedSeats);
        if(!isAvailable){
            return res.json({success:false,message:"Selected seats are not available"});
        }   
         const showData=await Show.findById(showId).populate("movie");
         const booking=await Booking.create({
            user:userId,
            show:showId,
            amount:showData.showPrice*selectedSeats.length,
            bookedSeats:selectedSeats
         })
         selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat]=userId;

         })
         showData.markModified('occupiedSeats');
         await showData.save();
          
         res.json({success:true,message:"Booking created successfully",})
    }
    catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message})
    }
}
export const getOccupiedSeats=async(req,res)=>{
    try{
        const {showId} = req.params;
        const showData = await Show.findById(showId)
        const occupiedSeats = Object.keys(showData.occupiedSeats)
        res.json({success: true, occupiedSeats})

    }
    catch(error){ 
        console.error(error.message);
        res.json({success:false,message:error.message})
    }
}

