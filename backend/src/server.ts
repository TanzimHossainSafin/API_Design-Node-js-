import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import reviewRouter from './router/reviewRouter';
import restaurantRouter from "./router/restaurantRouter";
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
app.use("/app/v1/api/user",userRouter);
app.use("/app/v1/review",reviewRouter);
app.use("/app/v1/restaurant",restaurantRouter);
export default app