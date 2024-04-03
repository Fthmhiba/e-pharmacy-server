import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DataBase connected:",
            connect.connection.host,
            connect.connection.port,
            connect.connection.name
        );
    } catch (err) {
        console.log('DB error', err);
    }

}


export default connectDb;