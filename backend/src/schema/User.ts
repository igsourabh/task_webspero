import mongoose from "mongoose";

interface Users {
  name: string;
  email: string;
  password: string;
  phone: number;
  zipcode: string;
  profilePic: string;
  lat: number;
  long: number;
  location?: {
    type: string;
    coordinates: [number];
  };
}

const userSchema = new mongoose.Schema<Users>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    zipcode: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    lat: { type: Number },
    long: { type: Number },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Make the location field not required
userSchema.index({ location: "2dsphere" }, { sparse: true });

const UserModel = mongoose.model<Users>("user", userSchema);

export default UserModel;
