import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // Referencing the Class model
      required: true, // Ensure each user is associated with a class
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;
