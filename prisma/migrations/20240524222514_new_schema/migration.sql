-- CreateEnum
CREATE TYPE "status" AS ENUM ('inactive', 'active');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('staff', 'student', 'driver');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Completed', 'Missed');

-- CreateEnum
CREATE TYPE "DutyStatus" AS ENUM ('Pending', 'Scanning', 'Driving', 'Completed');

-- CreateTable
CREATE TABLE "User" (
    "id_User" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "status" DEFAULT 'active',
    "default_Adress_lat" DOUBLE PRECISION,
    "default_Adress_lng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "default_time" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_User")
);

-- CreateTable
CREATE TABLE "Provider" (
    "userId" TEXT NOT NULL,
    "provider_Id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("provider_Id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id_Booking" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "depart_Time" TEXT NOT NULL,
    "depart_Date" TEXT NOT NULL,
    "Adress_lnt" DOUBLE PRECISION,
    "Adress_lng" DOUBLE PRECISION,
    "bookedAt" TIMESTAMP(3),
    "bus_id" INTEGER NOT NULL,
    "bookingStatus" "BookingStatus",

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id_Booking")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id_Bus" SERIAL NOT NULL,
    "bus_Number" INTEGER NOT NULL,
    "bus_Name" TEXT NOT NULL,
    "id_Driver" INTEGER NOT NULL,
    "bus_Capacity" INTEGER NOT NULL,
    "bus_Status" "status" NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id_Bus")
);

-- CreateTable
CREATE TABLE "TravelTimes" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "TravelTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id_Duty" SERIAL NOT NULL,
    "duty_Time" TEXT NOT NULL,
    "duty_Date" TEXT NOT NULL,
    "duty_Status" "DutyStatus",
    "bus_id" INTEGER NOT NULL,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id_Duty")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reportedUserId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "comment" TEXT,
    "report_Status" "status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "busId" INTEGER,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_User") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_User") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id_Bus") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id_User") ON DELETE RESTRICT ON UPDATE CASCADE;
