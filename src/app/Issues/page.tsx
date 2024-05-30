'use client'

import { useState, useEffect } from 'react';

interface Issue {
  id: number;
  issueType: string;
  reported_at: string;
  status: string;
  driver: {
    full_name: string;
    image: string;
    email: string;
    id_User
  };
  bus: {
    bus_Name: string;
    image: string;
  };
}

const PageName: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} | ${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/Issue/getAllIssues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <img
          src="https://gifdb.com/images/high/funny-loading-vegetable-vm0664kd44rc3jk2.webp"
          alt="Loading..."
        />
      )}
      {!loading && (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Issue</h1>
        <div className="w-full max-w-[calc(100vw - 40px)] overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Driver</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>Bus</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Reported At</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Issue</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '100px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr
                  key={issue.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img
                        alt={issue.driver.full_name}
                        className="rounded-full"
                        height={40}
                        src={issue.driver.image || "/placeholder.svg"}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width={40}
                      />
                      <span className="ml-2">{issue.driver.full_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img
                        alt={issue.bus.bus_Name}
                        className="rounded-full"
                        height={40}
                        src={issue.bus.image || "/placeholder.svg"}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width={40}
                      />
                      <span className="ml-2">{issue.bus.bus_Name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatTime(issue.reported_at)}</td>
                  <td className="px-4 py-3">{issue.issueType}</td>
                  <td className="px-4 py-3">{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      
      )}
    </div>
  );
};

export default PageName;
