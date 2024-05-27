import React from 'react';
import AvatarWithHoverCard from './AvatarWithHoverCard';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../ui/hover-card';

const TableRow = ({ report, formatDate, formatTime }) => {
  const isLongComment = report.comment.length > 40;

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 group">
      <td className="px-4 py-3">{formatDate(report.createdAt)}</td>
      <td className="px-4 py-3">{formatTime(report.createdAt)}</td>
      <td className="px-4 py-3 ">
        {isLongComment ? (
            
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="px-4 pl-0 py-3 hover:underline cursor-pointer ">
                {`${report.comment.substring(0, 20)}...`}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 ">
              <div className="max-w-xs">{report.comment}</div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div>{report.comment}</div>
        )}
      </td>
      <td className="px-4 py-3">{report.reason}</td>
      <td className="px-4 py-3 hover:underline cursor-pointer">
        <AvatarWithHoverCard user={report.reporter} />
      </td>
      <td className="px-4 py-3 hover:underline cursor-pointer">
        <AvatarWithHoverCard user={report.reportedUser} />
      </td>
    </tr>
  );
};

export default TableRow;
