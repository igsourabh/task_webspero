"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connnectDb_1 = require("./db/connnectDb");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config;
const index_1 = __importDefault(require("./routes/User/index"));
(0, connnectDb_1.connectDB)();
const app = (0, express_1.default)();
const port = 5005;
const allowedOrigins = ["http://localhost:5173", "http://13.127.199.56:8082"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
}));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.get("/health", (req, res) => {
    res.send("Api is Working Fine");
});
app.use("/user", index_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
