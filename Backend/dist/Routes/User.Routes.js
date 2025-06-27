"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../Controllers/User.Controller");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.get("/test", User_Controller_1.Checking);
exports.UserRouter.post("/signup", User_Controller_1.RegisterHandeler);
exports.UserRouter.post("/login", User_Controller_1.LoginHandeler);
