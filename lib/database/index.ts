import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

// Cache the connection for better performance in a serverless environment
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    // Create a connection promise if one doesn't exist
    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URI, {
            dbName: "evenza",
            bufferCommands: false,
        });

    cached.conn = await cached.promise;

    // Example: Create a collection and insert data to ensure the DB is created
    const exampleSchema = new mongoose.Schema({ name: String, value: String });
    const ExampleModel =
        mongoose.models.Example || mongoose.model("Example", exampleSchema);

    // Insert a document (optional, for testing or initialization)
    await ExampleModel.create({ name: "Test", value: "Initial data" });

    return cached.conn;
};
