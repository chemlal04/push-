"use client"
import React, { useState, useEffect } from 'react';
import UserDetailsModal from '../../components/Students/UserDetailsModal';
import UserTable from '../../components/Students/UserTable';
import PageTitle from '../../components/Students/PageTitle';
import { User } from '@prisma/client';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/User/getStudents');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
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
      <PageTitle title="Students" />
      <UserTable users={users} onDetailsClick={handleDetailsClick} />
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={handleClose} />
      )}
    </div>
  );
};

export default UsersPage;
