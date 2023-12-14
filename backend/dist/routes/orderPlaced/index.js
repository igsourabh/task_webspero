"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderPlaced_1 = require("../../controller/orderPlaced");
const router = (0, express_1.Router)();
router.get("/", orderPlaced_1.getAllOrderPlaced);
router.post("/", orderPlaced_1.PlaceOrder);
exports.default = router;
