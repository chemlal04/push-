"use client"

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PaginationPrevious, PaginationItem, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UncheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface Bus {
  id_Bus: number;
  image: string;
  bus_Number: number;
  bus_Name: string;
  id_Driver: number;
  bus_Capacity: number;
  bus_Status: string;
}

export default function Component() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 4;

  const fetchBuses = async (offset: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/Bus/getBus?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses(offset);
  }, [offset]);

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - limit));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {buses.map((bus) => (
          <div
            key={bus.id_Bus}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                alt={`Image of ${bus.bus_Name}`}
                className="w-full h-full object-cover"
                height={300}
                src={bus.image ? bus.image : '/placeholder.svg'}
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className={`absolute top-4 right-4 ${bus.bus_Status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {bus.bus_Status === 'active' ? (
                  <CheckIcon className="w-4 h-4 mr-1 inline" />
                ) : (
                  <UncheckIcon className="w-4 h-4 mr-1 inline" />
                )}
                {bus.bus_Status}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{bus.bus_Name}</h3>
              <div className="flex items-center mb-2">
                <UserIcon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-400">{bus.bus_Capacity} OK</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
