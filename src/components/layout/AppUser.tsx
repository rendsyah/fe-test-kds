'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth.context';
import { ManImage } from '@/libs/constants/assets.const';
import { isApiError } from '@/libs/utils/catch.utils';
import { AuthRepository } from '@/libs/services/auth.repository';
import Avatar from '../ui/avatar/Avatar';
import Dropdown from '../ui/dropdown/Dropdown';
import DropdownItem from '../ui/dropdown/DropdownItem';
import Notification from '../ui/notification/Notification';
import SettingIcon from '../icons/Setting';
import PowerIcon from '../icons/Power';

const AppUser: React.FC = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const authRepository = new AuthRepository();

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authRepository.logout();
      router.replace('/login');
    } catch (e) {
      if (isApiError(e)) {
        Notification({
          type: 'error',
          message: 'Failed!',
          description: e.message,
          position: 'bottom-right',
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* USER */}
      <button onClick={toggleDropdown} className="flex items-center dropdown-toggle">
        <span className="mr-4 rounded-full">
          <Avatar src={user?.image || ManImage} alt="Avatar" status="online" />
        </span>
        <div className="text-left">
          <span className="block text-sm">{user?.name}</span>
          <span className="block text-xs text-gray-400">{user?.access}</span>
        </div>
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="mt-[17px] flex flex-col w-[260px] p-3"
      >
        <div>
          <span className="block text-md">{user?.name}</span>
          <span className="mt-0.5 block text-xs text-gray-400">{user?.email}</span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-secondary/[8%] text-gray-400">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 group text-sm"
            >
              <SettingIcon className="w-5 h-5" />
              Account Setting
            </DropdownItem>
          </li>
        </ul>
        <div
          className="flex items-center gap-3 px-3 py-2.5 mt-3 rounded-lg group text-sm text-gray-400 hover:text-primary cursor-pointer"
          onClick={handleLogout}
        >
          <PowerIcon className="w-5 h-5" />
          Log Out
        </div>
      </Dropdown>
    </div>
  );
};

export default AppUser;
