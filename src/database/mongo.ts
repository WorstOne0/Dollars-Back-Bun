import mongoose from "mongoose";
// Database SUPER ADMIN
import initSuperAdmin from "./init_super_admin.js";

const mongoDBConnect = async () => {
  mongoose.connection.on("connected", () => console.log("MongoDB :: Connected"));
  mongoose.connection.on("disconnected", () => console.log("MongoDB :: Disconnected"));

  // Database Connect
  const database = await mongoose.connect(process.env.MONGO_DB as string);

  // Add the super admin to the database
  initSuperAdmin();
};

export { mongoDBConnect };
