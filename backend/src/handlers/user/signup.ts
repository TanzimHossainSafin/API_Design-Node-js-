import prisma from "../../../db";
import bcrypt from "bcrypt";
export const signup = async(req, res) => {
     try{
     const { username, email, password } = req.body;
     const user=await prisma.user.create({
          data:{
               username,
               email,
               password:await bcrypt.hash(password,10)
          }
     }) 
     res.status(200).json({
          message:"User created successfully",
          user
     })
     }catch(error){
          res.status(500).json({
               message:"User creation failed",
               error
          })
     }
};
