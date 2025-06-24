import  express  from "express";
import { Checking, RegisterHandeler } from "../Controllers/User.Controller";
export const UserRouter = express.Router()
UserRouter.get("/test", Checking);
UserRouter.post("/signup", RegisterHandeler);