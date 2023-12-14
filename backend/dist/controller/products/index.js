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
exports.deleteProduct = exports.updateProduct = exports.addProduction = exports.getSingleProduction = exports.getAllProduction = void 0;
const Products_1 = __importDefault(require("../../schema/Products"));
const getAllProduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield Products_1.default.find();
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
exports.getAllProduction = getAllProduction;
const getSingleProduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield Products_1.default.findById(req.params.id);
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
exports.getSingleProduction = getSingleProduction;
const addProduction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const create = yield Products_1.default.create(data);
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
exports.addProduction = addProduction;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const update = yield Products_1.default.findByIdAndUpdate(req.params.id, data, {
            new: true,
        });
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: update,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield Products_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: update,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
