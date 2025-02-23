/*
  Warnings:

  - You are about to drop the column `cost` on the `Sub` table. All the data in the column will be lost.
  - Added the required column `price` to the `Sub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sub" DROP COLUMN "cost",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
