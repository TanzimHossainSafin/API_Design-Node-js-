/*
  Warnings:

  - You are about to drop the `updateuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "updateuser" DROP CONSTRAINT "updateuser_userId_fkey";

-- DropTable
DROP TABLE "updateuser";
