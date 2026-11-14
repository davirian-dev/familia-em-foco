import React from 'react';
import { FamilyMember } from '../../types';

interface ProfileBadgeProps {
  member: FamilyMember;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  member,
  size = 'md',
  showName = true
}) => {
  const sizeMap = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-lg',
    lg: 'w-12 h-12 text-2xl'
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center shrink-0 shadow-sm`}
        style={{ backgroundColor: `${member.themeColor}20`, border: `2px solid ${member.themeColor}` }}
      >
        <span>{member.avatar}</span>
      </div>
      {showName && (
        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          {member.name}
        </span>
      )}
    </div>
  );
};
