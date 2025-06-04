import prisma from "../../../db";
export const deleteuser = async(req, res) => { 
    const {email}=req.query;
    try{
        const user=await prisma.user.delete({
            where:{
                email
            }
        })
        if(!user){
            res.status(404).json({message:"Sorry ser with this email address doesn't exist!"});
            return 
        };
        res.status(200).json({message:"User deleted successfully",user:{
            id:user.id,
            username:user.username,
            email:user.email
        }});
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    }
};