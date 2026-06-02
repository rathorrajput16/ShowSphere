import express from 'express';
import { createOrder, getOccupiedSeats, payExistingBooking, verifyPayment } from '../controllers/bookingController.js';


const bookingRouter=express.Router();

bookingRouter.get('/seats/:showId',getOccupiedSeats);
bookingRouter.post("/create-order", createOrder);
bookingRouter.post("/verify-payment", verifyPayment );
bookingRouter.post("/pay-existing-booking", payExistingBooking );
export default bookingRouter;