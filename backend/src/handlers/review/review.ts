import prisma from "../../../db";
export const createreview = async (req, res) => {
    try {
        if (!req.body.restaurantId) {
            return res.status(400).json({ message: "restaurantId is required" });
        }
        const review = await prisma.review.create({
            data: {
                comment: req.body.comment,
                reviewedByUser: {
                    connect: { id: req.user.id }
                },
                restaurant: {
                    connect: { id: req.body.restaurantId }
                }
            }
        });
        res.json({ message: "review created successfully", review });
    } catch (error) {
        res.json({ message: "review not created", error: error.message });
    }
}
export const getreview = async (req, res) => {
    try {
        const review = await prisma.review.findMany({
            include: {
                reviewedByUser: true,
                restaurant: true
            }
        });
        res.json({ message: "review fetched successfully", review });
    } catch (error) {
        res.json({ message: "review not fetched", error: error.message });
    }
}
