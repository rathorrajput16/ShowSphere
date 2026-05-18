import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(`connection error in mongodb ${error}`);
        process.exit(1);
    }
};

export default connectDB;