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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Test handler
const Checking = (req, res) => {
    res.status(200).json({ success: true, message: "all good" });
};
exports.Checking = Checking;
// Register handler
const RegisterHandeler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        // Check if user already exists
        const findUser = yield prisma.user.findUnique({
            where: { Email },
        });
        if (findUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        // Hash password and create user
        const hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
        yield prisma.user.create({
            data: {
                Email,
                Password: hashedPassword,
                Isverified: false,
            },
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration",
        });
    }
});
exports.RegisterHandeler = RegisterHandeler;
