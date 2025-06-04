import prisma from "../../../db";
export const getuser = async(req, res) => {
    const { email } = req.query;
    console.log(email)
    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        res.status(200).json({message:"User fetched successfully",user:{
               id:user.id,
               username:user.username,
               email:user.email
        }});  
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    } 
 };
