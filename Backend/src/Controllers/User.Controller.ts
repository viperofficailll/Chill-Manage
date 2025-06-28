import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import path from "path";
import { z } from "zod";

const requiredbody = z.object({
  Email: z.string().min(5).max(50).email(),
  Password: z.string().min(5).max(50),
});

config({
  path: path.resolve(__dirname, "../.env"),
});
const prisma = new PrismaClient();

export const Checking = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "all good" });
};

export const RegisterHandeler = async (req: Request, res: Response) => {
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
    const findUser = await prisma.user.findUnique({
      where: { Email },
    });

    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(Password, 10);

    const NewUser = await prisma.user.create({
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

    const token = Jwt.sign(payload, process.env.JWT_SECRET as string);
    console.log(NewUserid);

    res.status(201).json({
     token
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const LoginHandeler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const user = await prisma.user.findUnique({
      where: { Email },
    });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcryptjs.compare(Password, user.Password);

    if (!isPasswordValid) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }
    const payload = {
      UserId: user.Id,
    };
    const token = Jwt.sign(payload, process.env.JWT_SECRET as string);

    res.status(200).json({
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
