-- CreateEnum
CREATE TYPE "UPDATE_POINT_TYPE" AS ENUM ('FEATURES', 'BUG_FIXES', 'IMPROVEMENTS');

-- CreateTable
CREATE TABLE "UpdataPointType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "UPDATE_POINT_TYPE" NOT NULL DEFAULT 'FEATURES',
    "updatePointId" TEXT NOT NULL,

    CONSTRAINT "UpdataPointType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpdataPointType" ADD CONSTRAINT "UpdataPointType_updatePointId_fkey" FOREIGN KEY ("updatePointId") REFERENCES "UpdatePoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
