"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({
    path: path_1.default.resolve(__dirname, '../.env')
});
const PORT = process.env.PORT;
app_1.app.listen(PORT, () => {
    console.log(`listening on port ${PORT} `);
});
