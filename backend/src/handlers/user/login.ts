import prisma from '../../../db';
import {comparePasswords,createJWT} from "../../utils/auth";
export const login = async(req, res) => {
     const {email,password}=req.body;
     try{
        const user=await prisma.user.findUnique({
            where:{
                 email
            }
       })
       if (!user){
          res.send("user not found");
       }
       const verify=await comparePasswords(password,user.password);
       if(!verify){
        res.send({
            message:"Sorry worng password Try again!",
           
        })
       }
       else{
        const token=await createJWT(user);
        res.status(200).json({
            message:"User logedin successfully",
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            },
            token
       })
       }
     }catch(error){
        res.status(404).send({
            message:"sorry failed to login",
            error
        });
     }
};
