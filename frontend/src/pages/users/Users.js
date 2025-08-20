import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { userAPI } from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, departmentFilter]);

  const fetchUsers = async () => {
    try {
      const usersData = await userAPI.getAll();
      setUsers(usersData);
    } catch (error) {
      console.error('사용자 목록 로드 실패:', error);
      // 에러 시 빈 배열로 설정
      setUsers([]);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'ALL') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (departmentFilter !== 'ALL') {
      filtered = filtered.filter(user => user.department === departmentFilter);
    }

    setFilteredUsers(filtered);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'MANAGER': return 'bg-blue-100 text-blue-800';
      case 'USER': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ADMIN': return '관리자';
      case 'MANAGER': return '매니저';
      case 'USER': return '사용자';
      default: return role;
    }
  };

  const getDepartmentDisplayName = (department) => {
    switch (department) {
      case 'CX_TEAM': return 'CX팀';
      case 'ACCIDENT_TEAM': return '사고팀';
      case 'LEGAL_INSPECTION_TEAM': return '법정검사팀';
      case 'PATROL_MAINTENANCE_TEAM': return '순회정비팀';
      case 'COMMON': return '공통';
      case 'ALL': return '전체';
      default: return department || '미지정';
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">사용자 관리</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusIcon className="h-4 w-4 mr-2" />
            새 사용자 추가
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ALL">모든 역할</option>
            <option value="ADMIN">관리자</option>
            <option value="MANAGER">매니저</option>
            <option value="USER">사용자</option>
          </select>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ALL">전체 부서</option>
            <option value="CX_TEAM">CX팀</option>
            <option value="ACCIDENT_TEAM">사고팀</option>
            <option value="LEGAL_INSPECTION_TEAM">법정검사팀</option>
            <option value="PATROL_MAINTENANCE_TEAM">순회정비팀</option>
            <option value="COMMON">공통</option>
          </select>
        </div>

        {/* 사용자 목록 */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleDisplayName(user.role)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>사용자명: {user.username}</span>
                          <span className="mx-2">•</span>
                          <span>부서: {getDepartmentDisplayName(user.department)}</span>
                          <span className="mx-2">•</span>
                          <span>가입일: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        편집
                      </button>
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
