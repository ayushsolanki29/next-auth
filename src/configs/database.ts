import mongoose from "mongoose";
export async function connect_db() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => console.log("DB Connection Error:", err));

  } catch (error) {
    console.log("Something went wrong in conneting to DB :", error);
  }
}
