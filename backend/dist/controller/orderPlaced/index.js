"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrder = exports.getAllOrderPlaced = void 0;
const OrderPlaced_1 = __importDefault(require("../../schema/OrderPlaced"));
const Cart_1 = __importDefault(require("../../schema/Cart"));
const getAllOrderPlaced = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield OrderPlaced_1.default.find().populate({
            path: "items.ProductId",
            model: "Product",
        }).sort({ createdAt: -1 });
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: find,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.getAllOrderPlaced = getAllOrderPlaced;
const PlaceOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        function generateRandomOrderId() {
            // Prefix for the order ID (optional)
            const prefix = 'ORD';
            // Get the current timestamp
            const timestamp = new Date().getTime();
            // Generate a random 3-digit number
            const randomPart = Math.floor(Math.random() * 1000);
            // Combine the prefix, timestamp, and random number
            const orderId = `${prefix}${timestamp}${randomPart}`;
            return orderId;
        }
        // Example usage
        const randomOrderId = generateRandomOrderId();
        const find = yield Cart_1.default.find().populate("ProductId").sort({ createdAt: -1 });
        if (!find.length) {
            return res.status(200).json({
                STATUS_MESSAGE: "WARNING",
                STATUS_RESPONSE: "NO ITEM ADDED IN CART TO PLACE ORDER",
            });
        }
        const map = find.map((e) => {
            return { ProductId: e.ProductId._id, quantity: e.quantity };
        });
        const itemsPurchaseHistory = find.map((e) => {
            return Object.assign({}, e);
        });
        let totalPrice = 0;
        let totalQuantity = 0;
        find.forEach((cartItem) => {
            const product = cartItem.ProductId;
            const quantity = cartItem.quantity;
            const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
            totalPrice += quantity * productPrice;
            totalQuantity += quantity;
        });
        // console.log(itemsPurchaseHistory);
        const create = yield OrderPlaced_1.default.create({
            orderId: randomOrderId,
            items: map,
            itemsPurchaseHistory: itemsPurchaseHistory,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            shippingAddress: "ss",
        });
        find.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
            yield Cart_1.default.findByIdAndDelete(e._id);
            // console.log(e._id);
        }));
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: create,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.PlaceOrder = PlaceOrder;
