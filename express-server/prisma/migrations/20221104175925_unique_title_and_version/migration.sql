/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Update` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[version]` on the table `Update` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Update_title_key" ON "Update"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Update_version_key" ON "Update"("version");
