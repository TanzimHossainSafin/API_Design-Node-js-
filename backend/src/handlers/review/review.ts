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
//delete review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "review id is required" });
        }
        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) {
            return res.status(404).json({ message: "review not found" });
        }
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own review" });
        }
        await prisma.review.delete({
            where: { id },
        });
        res.json({ message: "review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "review not deleted", error: error.message });
    }
}
export const updatereview = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) {
            return res.status(404).json({ message: "review not found" });
        }
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only update your own review" });
        }
        const updatedReview = await prisma.review.update({
            where: { id },
            data: { comment },
        });
        res.json({ message: "review updated successfully", review: updatedReview });
    } catch (error) {
        res.json({ message: "review not updated", error: error.message });
    }
}
