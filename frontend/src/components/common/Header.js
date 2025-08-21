import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">업무관리 시스템</h2>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">알림 보기</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="ml-3 relative">
              <div>
                <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">사용자 메뉴 열기</span>
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-sm font-medium">관리자</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
