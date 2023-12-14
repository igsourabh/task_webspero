"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    ProductId: { type: mongoose_1.default.Schema.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
});
const CartModel = mongoose_1.default.model("cart", cartSchema);
exports.default = CartModel;
