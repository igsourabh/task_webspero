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
exports.getcart = exports.deleteCart = exports.removeCartQty = exports.addtoCart = void 0;
const Cart_1 = __importDefault(require("../../schema/Cart"));
const addtoCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("object");
    try {
        const find = yield Cart_1.default.findOne({ ProductId: req.body.ProductId });
        if (find) {
            yield Cart_1.default.findByIdAndUpdate(find._id, {
                quantity: req.body.quantity + find.quantity,
            }, { new: true });
            const finds = yield Cart_1.default.find().populate("ProductId");
            let totalPrice = 0;
            let totalQuantity = 0;
            finds.forEach((cartItem) => {
                const product = cartItem.ProductId;
                const quantity = cartItem.quantity;
                const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
                totalPrice += quantity * productPrice;
                totalQuantity += quantity;
            });
            res.status(200).json({
                STATUS_MESSAGE: "SUCCESS",
                STATUS_RESPONSE: {
                    cartItems: finds,
                    totalQuantity: totalQuantity,
                    totalPrice: totalPrice.toFixed(2),
                },
            });
        }
        else {
            yield Cart_1.default.create(req.body);
            const finds = yield Cart_1.default.find().populate("ProductId");
            let totalPrice = 0;
            let totalQuantity = 0;
            finds.forEach((cartItem) => {
                const product = cartItem.ProductId;
                const quantity = cartItem.quantity;
                const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
                totalPrice += quantity * productPrice;
                totalQuantity += quantity;
            });
            res.status(200).json({
                STATUS_MESSAGE: "SUCCESS",
                STATUS_RESPONSE: {
                    cartItems: finds,
                    totalQuantity: totalQuantity,
                    totalPrice: totalPrice.toFixed(2),
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.addtoCart = addtoCart;
const removeCartQty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield Cart_1.default.findOne({ _id: req.params.id });
        if (!find) {
            return res.status(401).json({
                STATUS_MESSAGE: "SUCCESS",
                STATUS_RESPONSE: "YOUR CART IS EMPTY",
            });
        }
        if (find && (find === null || find === void 0 ? void 0 : find.quantity) == 0) {
            const findanddelete = yield Cart_1.default.findByIdAndDelete(find._id);
            return res.status(200).json({
                STATUS_MESSAGE: "SUCCESS",
                STATUS_RESPONSE: findanddelete,
            });
        }
        if (find) {
            const findandUpdate = yield Cart_1.default.findByIdAndUpdate(find._id, {
                quantity: find.quantity - 1,
            }, { new: true });
            res.status(200).json({
                STATUS_MESSAGE: "SUCCESS",
                STATUS_RESPONSE: findandUpdate,
            });
        }
        else {
            res.status(404).json({
                STATUS_MESSAGE: "FAILURE",
                STATUS_RESPONSE: "cart item not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.removeCartQty = removeCartQty;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Delete = yield Cart_1.default.findByIdAndDelete(req.params.id);
        const find = yield Cart_1.default.find().populate("ProductId");
        let totalPrice = 0;
        let totalQuantity = 0;
        find.forEach((cartItem) => {
            const product = cartItem.ProductId;
            const quantity = cartItem.quantity;
            const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
            totalPrice += quantity * productPrice;
            totalQuantity += quantity;
        });
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: {
                cartItems: find,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice.toFixed(2),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.deleteCart = deleteCart;
const getcart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield Cart_1.default.find().populate("ProductId");
        let totalPrice = 0;
        let totalQuantity = 0;
        find.forEach((cartItem) => {
            const product = cartItem.ProductId;
            const quantity = cartItem.quantity;
            const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
            totalPrice += quantity * productPrice;
            totalQuantity += quantity;
        });
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: {
                cartItems: find,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice.toFixed(2),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.getcart = getcart;
