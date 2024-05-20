// UsersPage.tsx

'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useRef } from 'react';

interface User {
  id_User: number;
  full_name: string;
  image?: string[];
  role: string;
  status?: string;
  default_Adress_lat?: number;
  default_Adress_lng?: number;
  default_time?: string;
  key?: {
    id_Key: number;
    userName: string;
    email: string;
  };
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/User/getUser');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDetailsClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const PageTitle = ({ title }: { title: string }) => (
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
  );

  const DataTable = ({ columns, data }: { columns: any; data: any }) => (
    <div>
      <div className="rounded-md border">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {columns.map((column: any) => (
                <th key={column.accessor} className="py-2 px-4 border-b border-gray-200 text-left">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {columns.map((column: any) => (
                  <td key={column.accessor} className="py-2 px-4 border-b border-gray-200">
                    {column.accessor === 'details' ? (
                      <button
                        className="text-blue-500 underline"
                        onClick={() => handleDetailsClick(row)}
                      >
                        Details
                      </button>
                    ) : column.Cell ? (
                      column.Cell({ value: row[column.accessor] })
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const columns = [
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ value }: { value: string[] }) =>
        value && value.length > 0 ? (
          <img src={"https://cdn.intra.42.fr/users/2f1011175f3dd3d0d46345970585b30e/mchemlal.jpeg"} alt="User Image" className="w-12 h-12 object-cover" />
        ) : (
          'No Image'
        ),
    },
    
    { Header: 'Full Name', accessor: 'full_name' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Details', accessor: 'details' },
  ];

  const totalPageCount = Math.ceil(users.length / pageSize);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPageCount));
  };
  

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container mx-auto py-4">
      <PageTitle title="Users" />
      <DataTable columns={columns} data={paginatedUsers} />
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" ref={popUpRef}>
          <div className="bg-white p-8 rounded-md shadow-lg flex">
            {selectedUser.image && selectedUser.image[0] && (
              <div className="flex-shrink-0 mr-8">
                <img
                  src={"https://cdn.intra.42.fr/users/2f1011175f3dd3d0d46345970585b30e/mchemlal.jpeg"}
                  alt={`${selectedUser.full_name} Image 1`}
                  className="w-48 h-48 object-cover rounded-md"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold mb-4">{selectedUser.full_name}</h2>
              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-gray-700 mb-2">ID: {selectedUser.id_User}</p>
                
                {selectedUser.hasOwnProperty('key') && selectedUser.key && (
                <div className="border-t ">
                
                  <p className="text-gray-700 mb-2">Email: {selectedUser.key.email}</p>
                </div>
              )}
                <p className="text-gray-700 mb-2">Role: {selectedUser.role}</p>
                <p className="text-gray-700 mb-2">Status: {selectedUser.status || 'N/A'}</p>
                {selectedUser.default_time && <p className="text-gray-700 mb-2">Default Time: {selectedUser.default_time}</p>}
              </div>
              
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
  
  };

export default UsersPage;
