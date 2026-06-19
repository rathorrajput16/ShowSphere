import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { inngest } from "../inngest/index.js";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
//check availability of seats
const checkSeatsAvailability=async(showId,selectedSeats)=>{
    try{
       const showData=await Show.findById(showId)
         

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
export const createOrder = async (req, res) => {
  try {

    const { showId, selectedSeats } = req.body;
    const { userId } = req.auth();

   // Atomic seat lock
const query = { _id: showId };
const update = {};

selectedSeats.forEach((seat) => {
  query[`occupiedSeats.${seat}`] = { $exists: false };
  update[`occupiedSeats.${seat}`] = userId;
});

const lockResult = await Show.updateOne(
  query,
  {
    $set: update
  }
);

if (lockResult.modifiedCount === 0) {
  return res.json({
    success: false,
    message: "One or more selected seats are already booked"
  });
}

const showData = await Show.findById(showId);

if (!showData) {
  return res.json({
    success: false,
    message: "Show not found"
  });
}

const amount =
  showData.showPrice *
  selectedSeats.length;

// Create unpaid booking
const booking = await Booking.create({
  user: userId,
  show: showId,
  amount,
  bookedSeats: selectedSeats,
  isPaid: false
});

    // Trigger Inngest timer
    await inngest.send({
      name: "app/checkpayment",
      data: {
        bookingId: booking._id
      }
    });

    // Create Razorpay order
    const order =
      await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${booking._id}`
      });

    // Save order id
    booking.razorpayOrderId = order.id;
    await booking.save();

    return res.json({
      success: true,
      order,
      bookingId: booking._id
    });

  } catch (error) {

    console.log(error);

    return res.json({
      success: false,
      message: error.message
    });

  }
};
export const verifyPayment = async (req,res)=>{
    try{

        const {
            bookingId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
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

        const booking =
            await Booking.findById(
                bookingId
            );

        if(!booking){
            return res.json({
                success:false,
                message:"Booking not found"
            });
        }

        booking.isPaid = true;

        booking.paymentId =
            razorpay_payment_id;

        await booking.save();

        return res.json({
            success:true,
            message:"Booking successful"
        });

    }catch(error){

        return res.json({
            success:false,
            message:error.message
        });

    }
}
export const payExistingBooking = async (req, res) => {
  try {

    const { bookingId } = req.body;

    const booking =
      await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.isPaid) {
      return res.json({
        success: false,
        message: "Booking already paid"
      });
    }

    const order =
      await razorpay.orders.create({
        amount: booking.amount * 100,
        currency: "INR",
        receipt: `receipt_${booking._id}`
      });

    booking.razorpayOrderId = order.id;

    await booking.save();

    return res.json({
      success: true,
      order
    });

  } catch (error) {

    console.log(error);

    return res.json({
      success: false,
      message: error.message
    });

  }
};
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

