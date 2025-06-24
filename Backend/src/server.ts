import { config } from "dotenv";
import { app } from "./app";
import path from 'path'
config({
    path:path.resolve(__dirname,'../.env')
})
const PORT = process.env.PORT;

app.listen( PORT,()=>{
    console.log(`listening on port ${PORT} `)

})