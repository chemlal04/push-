"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Component() {
  const [travels, setTravels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      const response = await fetch(`/api/Travel/getTravel`);
      const data = await response.json();
      setTravels(data.travels);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  const handleBusClick = (bus, users) => {
    setSelectedBus(bus);
    setSelectedUsers(users);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBus(null);
    setSelectedUsers([]);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const totalPages = Math.ceil(travels.length / recordsPerPage);
  const currentTravels = travels.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Departure Time</TableHead>
            <TableHead>Departure Date</TableHead>
            <TableHead>Bus Number</TableHead>
            <TableHead>Bus Name</TableHead>
            <TableHead>User Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTravels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No travels found.</TableCell>
            </TableRow>
          ) : (
            currentTravels.map((travelGroup, index) => (
              <TableRow key={index}>
                <TableCell>{travelGroup.travel[0].departTime}</TableCell>
                <TableCell>{travelGroup.travel[0].departDate}</TableCell>
                <TableCell>
                  <span className="truncate">{travelGroup.travel[0].bus.bus_Number}</span>
                </TableCell>
                <TableCell>{travelGroup.travel[0].bus.bus_Name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full justify-start"
                    onClick={() => handleBusClick(travelGroup.travel[0].bus.bus_Number, travelGroup.travel)}
                  >
                    <span className="truncate">{`${travelGroup.travel.length} Passengers`}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between">
        <div>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        </div>
        <div>
          <button
            className={`mr-2 px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`ml-2 px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Passengers for Bus {selectedBus}</h2>
              <Button onClick={handleModalClose}>Close</Button>
            </div>
            <div className="overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedUsers.map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar className="border w-11 h-11">
                          <AvatarImage
                            alt={booking.user.full_name}
                            src={booking.user.image ?? '/placeholder.svg'}
                          />
                          <AvatarFallback>{booking.user.full_name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link href="/Student" className="text-blue-500 hover:underline">
                          {booking.user.full_name}
                        </Link>
                      </TableCell>
                      <TableCell>{booking.user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
