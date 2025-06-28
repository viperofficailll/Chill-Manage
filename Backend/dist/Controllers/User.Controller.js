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
exports.LoginHandeler = exports.RegisterHandeler = exports.Checking = void 0;
const dotenv_1 = require("dotenv");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
const requiredbody = zod_1.z.object({
    Email: zod_1.z.string().min(5).max(50).email(),
    Password: zod_1.z.string().min(5).max(50),
});
(0, dotenv_1.config)({
    path: path_1.default.resolve(__dirname, "../.env"),
});
const prisma = new client_1.PrismaClient();
const Checking = (req, res) => {
    res.status(200).json({ success: true, message: "all good" });
};
exports.Checking = Checking;
const RegisterHandeler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const parshedbody = requiredbody.safeParse(req.body);
        if (!parshedbody.success) {
            res.status(400).json({
                message: "Invalid credentials ",
                errors: parshedbody.error.errors,
            });
            return;
        }
        const findUser = yield prisma.user.findUnique({
            where: { Email },
        });
        if (findUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
        const NewUser = yield prisma.user.create({
            data: {
                Email,
                Password: hashedPassword,
                Isverified: false,
            },
        });
        const NewUserid = NewUser.Id;
        const payload = {
            UserId: NewUserid,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        console.log(NewUserid);
        res.status(201).json({
            token
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
const LoginHandeler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const user = yield prisma.user.findUnique({
            where: { Email },
        });
        if (!user) {
            res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(Password, user.Password);
        if (!isPasswordValid) {
            res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
            return;
        }
        const payload = {
            UserId: user.Id,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({
            token
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.LoginHandeler = LoginHandeler;
