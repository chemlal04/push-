// AvatarWithHoverCard.js
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const AvatarWithHoverCard = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage alt={user.full_name} src={user.image ?? '/placeholder-user.jpg'} />
            <AvatarFallback>{user.full_name[0]}</AvatarFallback>
          </Avatar>
          <span>{user.full_name}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage alt={user.full_name} src={user.image ?? '/placeholder-user.jpg'} />
            <AvatarFallback>{user.full_name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.full_name}</h4>
            <p className="text-sm">{user.email}</p>
            {/* Other user information */}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AvatarWithHoverCard;
