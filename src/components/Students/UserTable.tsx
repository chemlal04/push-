import React from 'react';
import usePagination from './usePagination'; // Import the usePagination hook

interface User {
  id_User: number;
  full_name: string;
  image?: string[];
  role: string;
  status?: string;
}

interface UserTableProps {
  users: User[];
  onDetailsClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDetailsClick }) => {
  const ITEMS_PER_PAGE = 6; // Define the number of items per page

  const [{ currentPage, totalPages }, nextPage, prevPage] = usePagination({
    totalItems: users.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="rounded-md border">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Image</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Full Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Role</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id_User}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.image && user.image.length > 0 ? (
                    <img src={user.image[0]} alt="User" className="w-12 h-12 object-cover" />
                  ) : (
                    <img
                      src="https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
                      alt="Default User"
                      className="w-12 h-12 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{user.full_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.status || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => onDetailsClick(user)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render pagination controls */}
      <div className="mt-4 flex justify-between">
        <div>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        </div>
        <div>
          <button
            className={`mr-2 px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`ml-2 px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
