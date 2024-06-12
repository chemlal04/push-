'use client';

import { useState, useEffect } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from 'lucide-react';


export default function Navbare() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} | ${hours}:${minutes}`;
  };

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/Issue/getIssue');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const issuesData = await response.json();
      setIssues(issuesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueClick = (issue) => {
    setExpandedIssue(expandedIssue === issue ? null : issue);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleViewAccount = () => {
    console.log('Viewing account...');
  };

  const issueCount = issues.length;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 py-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
      </div>
      <div className="flex items-center relative">
        <div className="ml-4 relative" style={{ paddingRight: '10px' }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="rounded-full relative"
                size="icon"
                variant="outline"
                onClick={fetchIssues}
              >
                <Bell className="w-4 h-4" />
                {issueCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{issueCount}</div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Card className="shadow-none border-0">
                <CardHeader className="border-b">
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}
                  {issues.length > 0 ? (
                    issues.map(issue => (
                      <div key={issue.id_issue} className="mb-4">
                        <div className="flex items-center mb-2 cursor-pointer" onClick={() => handleIssueClick(issue)}>
                          <div className="mr-2">
                            <TriangleAlertIcon />
                          </div>
                          <div className="flex-grow">
                            <p className="text-red-500 font-bold">{issue.issueType}</p>
                            <p className="text-sm text-gray-500">{formatTime(issue.reported_at)}</p>
                          </div>
                          <button 
                            className="ml-auto p-0.5 flex items-center text-xs text-gray-500" 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = '/Issues';
                            }}
                          >
                            <EyeIconOutline className="w-4 h-4 mr-1" /> View
                          </button>
                        </div>
                        {expandedIssue === issue && (
                          <div>
                            <div className="flex justify-between mb-2">
                              <p className="font-semibold">Driver:</p>
                              <p>{issue.driver.full_name}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                              <p className="font-semibold">Bus:</p>
                              <p>{issue.bus.bus_Name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">There are no issues at the moment.</p>
                  )}
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <div className="ml-4 relative">
                  <div className="grid gap-0.5 text-sm" style={{ paddingRight: '10px' }}>
                    <div className="font-semibold">Jardani Youssef</div>
                    <div className="text-gray-500 dark:text-gray-400">1337 Stagaire</div>
                  </div>
                </div>
                <div className="ml-4 relative">
                  <Avatar>
                    <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-white shadow-lg rounded-lg p-2">
              <button 
                className="w-full text-left py-1 px-2 flex items-center text-sm hover:bg-gray-100"
                onClick={handleViewAccount}
              >
                <AccountIcon className="w-4 h-4 mr-2" />
                View Account
              </button>
              <button 
                className="w-full text-left py-1 px-2 flex items-center text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogoutIcon className="w-4 h-4 mr-2 text-red-600" />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

// Icons for View Account and Logout

function AccountIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5z" />
      <path d="M17.54 18.54a7.976 7.976 0 0 0-11.08 0" />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-600"
      width="16"   // Adjusted size for smaller icon
      height="16"  // Adjusted size for smaller icon
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 0 3.4 0" />
    </svg>
  );
}

function TriangleAlertIcon(props) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function EyeIconOutline(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

