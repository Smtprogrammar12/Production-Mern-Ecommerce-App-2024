import dotenv from "dotenv"
import mongoose from "mongoose";


dotenv.config();

 const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(
            `Conneted To Mongodb Databse succesfully!! ${connect.connection.host}`.bgMagenta.white
        );
    } catch (error) {
        console.log(`Errro in Mongodb ${error}`.bgRed.white);
    }
};

export default dbConnect;
// module.exports = dbConnect;

