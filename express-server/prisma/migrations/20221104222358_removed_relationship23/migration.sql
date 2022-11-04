/*
  Warnings:

  - You are about to drop the column `updatePointTypeId` on the `UpdatePoint` table. All the data in the column will be lost.
  - You are about to drop the `UpdatePointType` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UPDATE_POINT_TYPE2" AS ENUM ('FEATURE', 'BUG_FIXE', 'IMPROVEMENT');

-- DropForeignKey
ALTER TABLE "UpdatePointType" DROP CONSTRAINT "UpdatePointType_updatePointId_fkey";

-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "updatePointTypeId",
ADD COLUMN     "type" "UPDATE_POINT_TYPE2" NOT NULL DEFAULT 'FEATURE';

-- DropTable
DROP TABLE "UpdatePointType";
