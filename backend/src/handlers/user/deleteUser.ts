import prisma from "../../../db";
export const deleteuser = async(req, res) => { 
    const {email}=req.body;
    try{
        const user=await prisma.user.delete({
            where:{
                email
            }
        })
        res.status(200).json({message:"User deleted successfully",user});
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    }
};