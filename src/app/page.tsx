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

//     <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
//        <Card className="col-span-1 lg:col-span-1">
//          <CardHeader>
//            <CardTitle>Driving Hours per Driver</CardTitle>
//          </CardHeader>
//          <CardContent className="flex flex-col items-center justify-center pt-15px">
//          <DrivingHoursPerDriver />
//                   </CardContent>
//        </Card>
//        <Card className="col-span-1 lg:col-span-2">
//         <CardHeader>
// <CardTitle>User Growth Trend</CardTitle>
//         </CardHeader>
//          <CardContent>
//          <UserGrowthTrend />
//          </CardContent>
//        </Card>
//        <Card className="col-span-1 lg:col-span-3">
//            <CardHeader>
//             <CardTitle>{`Monthly Booking per Day (Month: ${monthYear})`}</CardTitle>
//            </CardHeader>
//            <CardContent>
//            <MonthlyBookingPerDay />
//            </CardContent>
//          </Card>
//      </div>



    <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-8">
        
        <DrivingHoursPerDriver />
      
      
        <UserGrowthTrend />
      
      
        <MonthlyBookingPerDay />


        
      
    </div>
  );
}


// export default function Component() {
//   const [driverData, setDriverData] = useState([]);
//   const [studentData, setStudentData] = useState([]);
//   const [bookingData, setBookingData] = useState([]);
//   const [month, setMonth] = useState("");
//   const [monthYear, setMonthYear] = useState("");
//   const [bookingsPerDay, setBookingsPerDay] = useState([]);

//   useEffect(() => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
//     const currentYear = currentDate.getFullYear();
//     setMonthYear(`${currentMonth} ${currentYear}`);
//   }, []);

//   useEffect(() => {
//     async function fetchStudentData() {
//       try {
//         const response = await fetch("/api/User/getStudents");
//         if (!response.ok) {
//           throw new Error("Failed to fetch student data");
//         }
//         const data = await response.json();
//         setStudentData(data);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     }

//     fetchStudentData();
//   }, []);

//   // Process student data to get the count of students created per day
//   const getNewUsersPerDay = () => {
//     const newUserPerDay = {};
//     let cumulativeSum = 0;
//     studentData.forEach(student => {
//       const date = new Date(student.createdAt).toLocaleDateString();
//       cumulativeSum++;
//       newUserPerDay[date] = cumulativeSum;
//     });
//     return Object.entries(newUserPerDay).map(([date, count]) => ({ x: date, y: count }));
//   };

//   const newUsersPerDay = getNewUsersPerDay();

//   useEffect(() => {
//     async function fetchDriverData() {
//       try {
//         const response = await fetch("/api/User/getDrivers");
//         if (!response.ok) {
//           throw new Error("Failed to fetch driver data");
//         }
//         const data = await response.json();
//         setDriverData(data);
//       } catch (error) {
//         console.error("Error fetching driver data:", error);
//       }
//     }

//     fetchDriverData();
//   }, []);

//   useEffect(() => {
//     async function fetchBookingData() {
//       try {
//         const response = await fetch("/api/Booking/getBooking");
//         if (!response.ok) {
//           throw new Error("Failed to fetch booking data");
//         }
//         const data = await response.json();
//         setBookingData(data);
        
//         // Find the latest booking date
//         const latestBooking = new Date(Math.max(...data.map(booking => new Date(booking.bookedAt))));
//         const month = latestBooking.toLocaleString('default', { month: 'long' });
//         const year = latestBooking.getFullYear();
//         setMonthYear(`${month} ${year}`);
//       } catch (error) {
//         console.error("Error fetching booking data:", error);
//       }
//     }
  
//     fetchBookingData();
//   }, []);
  
//   useEffect(() => {
//     const getBookingsPerDay = () => {
//       const currentDate = new Date();
//       const currentMonth = currentDate.getMonth();
//       const currentYear = currentDate.getFullYear();
    
//       const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the total number of days in the current month
//       const bookingsPerDay = Array.from({ length: daysInMonth }, (_, i) => ({ x: i + 1, y: 0 })); // Initialize each day with 0 bookings
    
//       bookingData.forEach(booking => {
//         const date = new Date(booking.bookedAt).getDate();
//         if (bookingsPerDay[date - 1]) {
//           bookingsPerDay[date - 1].y++;
//         }
//       });
    
//       return bookingsPerDay;
//     };
  
//     setBookingsPerDay(getBookingsPerDay());
//   }, [bookingData]);
  

//   // Calculate total driving hours
//   const totalDrivingHours = driverData.reduce((total, driver) => total + parseFloat(driver.driving_hours), 0);

//   // Calculate percentage of driving hours for each driver
//   const driverHoursWithPercentage = driverData.map(driver => ({
//     id: driver.full_name,
//     label: driver.full_name,
//     value: parseFloat(driver.driving_hours),
//     image: driver.image ? driver.image[0]:"" , // Default image path
//     percentage: ((parseFloat(driver.driving_hours) / totalDrivingHours) * 100).toFixed(2),
//   }));

//   return (
// <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
//       <Card className="col-span-1 lg:col-span-1">
//         <CardHeader>
//           <CardTitle>Driving Hours per Driver</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center pt-15px">
//             <PieChart data={driverHoursWithPercentage} className="w-[600px] h-[400px]" />
//         </CardContent>
//       </Card>
//       <Card className="col-span-1 lg:col-span-2">
//         <CardHeader>
//           <CardTitle>User Growth Trend</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <LineChart data={newUsersPerDay} className="w-full aspect-[4/3]" />
//         </CardContent>
//       </Card>
//       <Card className="col-span-1 lg:col-span-3">
//           <CardHeader>
//             <CardTitle>{`Monthly Booking per Day (Month: ${monthYear})`}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <LineChart2 data={bookingsPerDay} className="w-full aspect-[4/3]" />
//           </CardContent>
//         </Card>
//     </div>
//   )
// }

// function PieChart({ data, ...props }) {
//   return (
//     <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }} {...props}>
//       <ResponsivePie
//         data={data}
//         margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//         innerRadius={0.5}
//         padAngle={0.7}
//         cornerRadius={3}
//         colors={{ scheme: 'nivo' }}
//         borderWidth={1}
//         borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
//         radialLabelsSkipAngle={10}
//         radialLabelsTextColor="#333333"
//         radialLabelsLinkColor={{ from: 'color' }}
//         sliceLabelsSkipAngle={10}
//         sliceLabelsTextColor="#333333"
//         tooltip={({ datum }) => (
//           <div style={{ background: "white", padding: "10px", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center" }}>
//             <img
//               src={datum.data.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAbFBMVEUAAADmzEu6VyF+AAAAAElFTkSuQmCC"} // Render default user PNG if image is not available
//               alt={datum.label}
//               style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
//               onError={(e) => { e.currentTarget.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAbFBMVEUAAAD////u7u7t7e32AAAAElFTkSuQmCC";
//                e.currentTarget.onerror = null; }} // Handle error and set it to default user PNG
//             />
//             <div>
//               <strong>{datum.label}</strong>
//               <br />
//               {datum.value} hours ({datum.data.percentage}%)
//             </div>
//           </div>
//         )}
//       />
//     </div>
//   );
// }

// function LineChart({ data, ...props }) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[{ id: "Bookings", data }]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{ type: "point" }}
//         yScale={{ type: "linear" }}
//         axisBottom={{ tickSize: 0, tickPadding: 16 }}
//         axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
//         colors={["#2563eb"]}
//         pointSize={6}
//         useMesh={true}
//         gridYValues={5}
//         theme={{
//           tooltip: { container: { fontSize: "12px", textTransform: "capitalize", borderRadius: "6px" } },
//           grid: { line: { stroke: "#f3f4f6" } },
//         }}
//         tooltip={({ point }) => (
//           <div style={{ background: "white", padding: "5px", borderRadius: "5px", fontSize: "10px" }}>
//             {point.data.x}: total users joined : {point.data.y}
//           </div>
//         )}
//         role="application"
//       />
//     </div>
//   );
// }


// function LineChart2({ data, ...props }) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[{ id: "Bookings", data }]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{ type: "point" }} // Set xScale to "point"
//         yScale={{ type: "linear", min: 0 }}
//         axisBottom={{ tickSize: 0, tickPadding: 16 }}
//         axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
//         colors={["#2563eb"]}
//         pointSize={6}
//         useMesh={true}
//         gridYValues={5}
//         theme={{
//           tooltip: { container: { fontSize: "12px", textTransform: "capitalize", borderRadius: "6px" } },
//           grid: { line: { stroke: "#f3f4f6" } },
//         }}
//         tooltip={({ point }) => (
//           <div style={{ background: "white", padding: "5px", borderRadius: "5px", fontSize: "10px" }}>
//             total bookings this day: {point.data.y}
//           </div>
//         )}
//         role="application"
//       />
//     </div>
//   );
// }