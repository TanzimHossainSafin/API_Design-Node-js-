import prisma from "../../../db";
//create restaurant

export const createrestaurant=async(req,res)=>{
    try{
   const {name,location}=req.body;
   const restaurant=await prisma.restaurant.create({
    data:{
        name,
        location,
        restaurant_visited_by_user:{
            connect:{
                id:req.user.id
            }
        }
    }
   });
   res.json({message:"restaurant created successfully",restaurant});
}catch(error){
    res.json({message:"restaurant not created",error});
}
}
//get restaurant by user id
export const getrestaurant=async(req,res)=>{
    try{
    const restaurant=await prisma.restaurant.findMany({
        include:{
            restaurant_visited_by_user:true
        }
    });
    res.json({message:"restaurant fetched successfully",restaurant});
}catch(error){
    res.json({message:"restaurant not fetched",error});
}
}
//get all restaurants
export const getallrestaurants = async (req, res) => {
    try{
    const restaurants = await prisma.restaurant.findMany({
        include: {
            reviews: { 
                include: {
                    reviewedByUser: true 
                }
            }
        }
    });
    res.json({ message: "restaurant fetched successfully", restaurants });
}catch(error){
    res.json({message:"restaurant not fetched",error});
}
}
