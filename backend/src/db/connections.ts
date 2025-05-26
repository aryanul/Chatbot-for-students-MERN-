import { connect, disconnect } from "mongoose";

async function connectDatabase() {
    try {
        await connect(process.env.MONGODB_URL as string);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from MongoDB");
    }
}

export { connectDatabase, disconnectDatabase };