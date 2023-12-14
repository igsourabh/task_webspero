"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderPlacedSchema = new mongoose_1.default.Schema({
    orderId: { type: String, require: true },
    items: [
        {
            ProductId: { type: mongoose_1.default.Schema.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
    itemsPurchaseHistory: [],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const OrderPlacedModel = mongoose_1.default.model("OrderPlaced", OrderPlacedSchema);
exports.default = OrderPlacedModel;
