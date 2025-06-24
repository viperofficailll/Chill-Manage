import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'




export const Checking = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "all good" });
};

export const RegisterHandeler =  async(req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body();
    const hashedpassword =  await bcryptjs.hash(Password,10)
     await prisma.user.create({
      data: {
        Email: Email,
        Password: hashedpassword,
        Isverified: false,
      },
    }
) ;
res.status(201).json({
    success:true ,message:"User created successfully"
})
  } catch (error) {}
};
