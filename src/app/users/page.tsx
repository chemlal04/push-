"use client"
import React, { useState, useEffect } from 'react';
import UserDetailsModal from '../../components/Students/UserDetailsModal';
import UserTable from '../../components/Students/UserTable';
import PageTitle from '../../components/Students/PageTitle';

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

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <PageTitle title="Users" />
      <UserTable users={users} onDetailsClick={handleDetailsClick} />
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={handleClose} />
      )}
    </div>
  );
};

export default UsersPage;
