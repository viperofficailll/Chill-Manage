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
exports.RegisterHandeler = exports.Checking = void 0;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Checking = (req, res) => {
    res.status(200).json({ success: true, message: "all good" });
};
exports.Checking = Checking;
const RegisterHandeler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body();
        const hashedpassword = yield bcryptjs_1.default.hash(Password, 10);
        yield prisma.user.create({
            data: {
                Email: Email,
                Password: hashedpassword,
                Isverified: false,
            },
        });
        res.status(201).json({
            success: true, message: "User created successfully"
        });
    }
    catch (error) { }
});
exports.RegisterHandeler = RegisterHandeler;
