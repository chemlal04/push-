import React from 'react';

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

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  const popUpRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" ref={popUpRef}>
      <div className="bg-white p-8 rounded-md shadow-lg flex">
        <div className="flex-shrink-0 mr-8">
          {user.image && user.image.length > 0 ? (
            <img
              src={user.image[0]}
              alt={`${user.full_name} Image 1`}
              className="w-48 h-48 object-cover rounded-md"
            />
          ) : (
            <img
              src="https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
              alt="Placeholder Image"
              className="w-48 h-48 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">{user.full_name}</h2>
          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-gray-700 mb-2">ID: {user.id_User}</p>
            {user.key && (
              <div className="border-t">
                <p className="text-gray-700 mb-2">Email: {user.key.email}</p>
              </div>
            )}
            <p className="text-gray-700 mb-2">Role: {user.role}</p>
            <p className="text-gray-700 mb-2">Status: {user.status || 'N/A'}</p>
            {user.default_time && <p className="text-gray-700 mb-2">Default Time: {user.default_time}</p>}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
