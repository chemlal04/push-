"use client"

import React, { useState, useEffect } from 'react';
import TableComponent from '@/components/Reports/TableComponent';
import PaginationControls from '../../components/Reports/PaginationControls';
import usePagination from "@/components/Reports/usePagination"
import { formatDate, formatTime } from '@/components/Reports/utils'; // Importing formatDate and formatTime

export default function Component() {
  const [reports, setReports] = useState([]);
  const [{ currentPage, totalPages }, nextPage, prevPage] = usePagination({ totalItems: reports.length, itemsPerPage: 5 });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/Reports/getReports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const startIndex = (currentPage - 1) * 5;
  const paginatedReports = reports.slice(startIndex, startIndex + 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
      <h1 className="text-2xl font-bold mb-4">Driver Warning</h1>
        <TableComponent reports={paginatedReports} formatDate={formatDate} formatTime={formatTime} />
      </div>
      <PaginationControls currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
}
