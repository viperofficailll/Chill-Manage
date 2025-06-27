import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

// Test handler
export const Checking = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "all good" });
};

// Register handler
export const RegisterHandeler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    // Check if user already exists
    const findUser = await prisma.user.findUnique({
      where: { Email },
    });

    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
      return
    }

    // Hash password and create user
    const hashedPassword = await bcryptjs.hash(Password, 10);

    await prisma.user.create({
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
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};
