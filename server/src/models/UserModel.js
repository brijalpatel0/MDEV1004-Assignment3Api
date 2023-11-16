// models/UserModel.js
import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: "Missing username",
    trim: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: "Missing password",
    trim: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = model("User", userSchema);

export default User;
