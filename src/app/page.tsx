"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8EvKOqlvfJk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveLine } from "@nivo/line"

import React from "react";
import UserGrowthTrend from "@/components/Dashboard/UserGrowthTrend";
import DrivingHoursPerDriver from "@/components/Dashboard/DrivingHoursPerDriver";
import MonthlyBookingPerDay from "@/components/Dashboard/MonthlyBookingPerDay";





interface User {
  id_User: string;
  full_name: string;
  image?: string[];
  driving_hours?: string;
  createdAt: Date;
}

interface Booking {
  id_Booking: number;
  user_id: string;
  depart_Time: string;
  depart_Date: string;
  Adress_lnt?: number;
  Adress_lng?: number;
  bookedAt?: Date;
  bus_id: number;
  bookingStatus?: string;
}


export default function Component() {
  return (




    <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-8">
        
        <DrivingHoursPerDriver />
      
      
        <UserGrowthTrend />
      
      
        <MonthlyBookingPerDay />


        
      
    </div>
  );
}


