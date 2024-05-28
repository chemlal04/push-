/*
  Warnings:

  - You are about to drop the column `image` on the `Bus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_Driver]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('accident', 'breakdown');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'Checked';

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "busId" INTEGER;

-- CreateTable
CREATE TABLE "Issue" (
    "id_issue" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "issueType" "IssueType" NOT NULL,
    "bus_id" INTEGER NOT NULL,
    "reported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id_issue")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_id_Driver_key" ON "Bus"("id_Driver");

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_id_Driver_fkey" FOREIGN KEY ("id_Driver") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;
