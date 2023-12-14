"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    zipcode: { type: String, required: true },
    profilePic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
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
}, {
    timestamps: true,
});
// Make the location field not required
userSchema.index({ location: "2dsphere" }, { sparse: true });
const UserModel = mongoose_1.default.model("user", userSchema);
exports.default = UserModel;
