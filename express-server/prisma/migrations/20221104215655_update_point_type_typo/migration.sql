/*
  Warnings:

  - You are about to drop the column `updataPointTypeId` on the `UpdatePoint` table. All the data in the column will be lost.
  - You are about to drop the `UpdataPointType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatePointTypeId` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UpdataPointType" DROP CONSTRAINT "UpdataPointType_updatePointId_fkey";

-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "updataPointTypeId",
ADD COLUMN     "updatePointTypeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UpdataPointType";

-- CreateTable
CREATE TABLE "UpdatePointType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "UPDATE_POINT_TYPE" NOT NULL DEFAULT 'FEATURES',
    "updatePointId" TEXT NOT NULL,

    CONSTRAINT "UpdatePointType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpdatePointType" ADD CONSTRAINT "UpdatePointType_updatePointId_fkey" FOREIGN KEY ("updatePointId") REFERENCES "UpdatePoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
