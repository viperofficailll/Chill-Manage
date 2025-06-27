import  express  from "express";
import { Checking, RegisterHandeler,LoginHandeler } from "../Controllers/User.Controller";
export const UserRouter = express.Router()
UserRouter.get("/test", Checking);
UserRouter.post("/signup", RegisterHandeler);
UserRouter.post("/login", LoginHandeler);