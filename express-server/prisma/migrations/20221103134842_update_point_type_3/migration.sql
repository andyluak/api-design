/*
  Warnings:

  - You are about to drop the column `type` on the `UpdatePoint` table. All the data in the column will be lost.
  - Added the required column `updataPointTypeId` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "type",
ADD COLUMN     "updataPointTypeId" TEXT NOT NULL;
