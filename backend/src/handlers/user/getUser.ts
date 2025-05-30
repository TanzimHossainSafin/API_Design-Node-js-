import prisma from "../../../db";
export const getuser = async(req, res) => {
    const {email}=req.body;
    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        res.status(200).json({message:"User fetched successfully",user});  
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    } 
 };
