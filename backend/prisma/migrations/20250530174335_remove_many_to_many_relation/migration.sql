/*
  Warnings:

  - You are about to drop the column `rating` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `_UserReviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserReviews" DROP CONSTRAINT "_UserReviews_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserReviews" DROP CONSTRAINT "_UserReviews_B_fkey";

-- DropForeignKey
ALTER TABLE "restaurant" DROP CONSTRAINT "restaurant_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "updateuser" DROP CONSTRAINT "updateuser_userId_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "rating",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserReviews";

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "updateuser" ADD CONSTRAINT "updateuser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
