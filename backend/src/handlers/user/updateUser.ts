import prisma from "../../../db";
import {hashPassword} from "../../utils/auth";
export const updateuser = async(req, res) => {
    const user = req.body;
    try{
        const existinguser = await prisma.user.findUnique({
            where: { email: user.email }
        });
        if (!existinguser) {
            return res.status(404).json({ message: "User not found" });
        } else {
            const updatedUser = await prisma.user.update({
                where: { email: user.email },
                data: {
                    password: await hashPassword(user.password)
                }
            });
            res.status(200).json({ message: "Password updated successfully", updatedUser });
        }

    }catch(error){
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};