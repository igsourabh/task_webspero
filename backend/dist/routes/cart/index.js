"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../../controller/cart");
const router = (0, express_1.Router)();
router.post("/", cart_1.addtoCart);
router.put("/removeqty/:id", cart_1.removeCartQty);
router.delete("/:id", cart_1.deleteCart);
router.get("/", cart_1.getcart);
exports.default = router;
