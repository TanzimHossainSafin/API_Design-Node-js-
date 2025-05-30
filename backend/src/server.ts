import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
const app=express();
app.use(cors(
    //{
    //origin:process.env.FRONTEND_URL,
    //credentials:true
//}
));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.use("/api/v1/user",userRouter)
export default app