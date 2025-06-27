import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const Checking = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "all good" });
};

export const RegisterHandeler = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { Email },
    });

    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
      return
    }

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

    // Optional: Generate token here (e.g. using JWT)

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.Id,
        email: user.Email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
