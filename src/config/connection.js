import mongoose from "mongoose";

const mongoClient = async () => {
  try {
    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      return console.log(
        "Please add mongoDB connection in env variable MONGO_CLIENT"
      );
    }
    const con = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (con) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default mongoClient;
