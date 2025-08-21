import React, { useState, useEffect } from 'react';
import { PlusIcon, CogIcon, UserGroupIcon, ArrowsUpDownIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import MenuEditModal from '../../components/modals/MenuEditModal';
import MenuDetailModal from '../../components/modals/MenuDetailModal';

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('menus');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchMenus();
    fetchUsers();
  }, []);

  const fetchMenus = async () => {
    try {
      // 실제 API 호출로 대체
      const mockMenus = [
        {
          id: 1,
          name: 'dashboard',
          displayName: '대시보드',
          path: '/dashboard',
          icon: 'HomeIcon',
          sortOrder: 1,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'USER',
          requiredPermission: null,
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        },
        {
          id: 2,
          name: 'tasks',
          displayName: '업무 관리',
          path: '/tasks',
          icon: 'ClipboardDocumentListIcon',
          sortOrder: 2,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'USER',
          requiredPermission: 'TASK_VIEW',
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        },
        {
          id: 3,
          name: 'projects',
          displayName: '프로젝트 관리',
          path: '/projects',
          icon: 'FolderIcon',
          sortOrder: 3,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'USER',
          requiredPermission: 'PROJECT_VIEW',
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        },
        {
          id: 4,
          name: 'users',
          displayName: '사용자 관리',
          path: '/users',
          icon: 'UsersIcon',
          sortOrder: 4,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'ADMIN',
          requiredPermission: 'USER_MANAGE',
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        },
        {
          id: 5,
          name: 'attendance',
          displayName: '근태 관리',
          path: '/attendance',
          icon: 'ClockIcon',
          sortOrder: 5,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'USER',
          requiredPermission: 'ATTENDANCE_VIEW',
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        },
        {
          id: 6,
          name: 'payments',
          displayName: '결제 관리',
          path: '/payments',
          icon: 'CreditCardIcon',
          sortOrder: 6,
          parentId: null,
          isActive: true,
          isVisible: true,
          requiredRole: 'ADMIN',
          requiredPermission: 'PAYMENT_MANAGE',
          createdAt: '2024-01-01T00:00:00',
          updatedAt: '2024-01-01T00:00:00'
        }
      ];
      setMenus(mockMenus);
    } catch (error) {
      console.error('메뉴 목록 로드 실패:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // 실제 API 호출로 대체
      const mockUsers = [
        { id: 1, fullName: '전소현', username: 'jeon', role: 'ADMIN' },
        { id: 2, fullName: '최지광', username: 'choi', role: 'USER' },
        { id: 3, fullName: '이선건', username: 'lee', role: 'USER' }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('사용자 목록 로드 실패:', error);
    }
  };

  const handleMenuOrderChange = (menuId, newOrder) => {
    setMenus(prevMenus => 
      prevMenus.map(menu => 
        menu.id === menuId 
          ? { ...menu, sortOrder: newOrder }
          : menu
      ).sort((a, b) => a.sortOrder - b.sortOrder)
    );
  };

  const handleMenuToggleActive = (menuId) => {
    setMenus(prevMenus =>
      prevMenus.map(menu =>
        menu.id === menuId
          ? { ...menu, isActive: !menu.isActive }
          : menu
      )
    );
  };

  const handleMenuToggleVisible = (menuId) => {
    setMenus(prevMenus =>
      prevMenus.map(menu =>
        menu.id === menuId
          ? { ...menu, isVisible: !menu.isVisible }
          : menu
      )
    );
  };

  const handleCreateMenu = () => {
    setEditingMenu(null);
    setShowCreateModal(true);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setShowCreateModal(true);
  };

  const handleSaveMenu = (menuData) => {
    if (menuData.id) {
      // 기존 메뉴 수정
      setMenus(prevMenus =>
        prevMenus.map(menu =>
          menu.id === menuData.id
            ? { ...menuData, updatedAt: new Date().toISOString() }
            : menu
        )
      );
    } else {
      // 새 메뉴 추가
      const newMenu = {
        ...menuData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setMenus(prevMenus => [...prevMenus, newMenu]);
    }
    setShowCreateModal(false);
    setEditingMenu(null);
  };

  const handleDeleteMenu = (menuId) => {
    setMenus(prevMenus => prevMenus.filter(menu => menu.id !== menuId));
    setSelectedMenu(null);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'USER': return 'bg-blue-100 text-blue-800';
      case 'MANAGER': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive, isVisible) => {
    if (!isActive) return 'bg-red-100 text-red-800';
    if (!isVisible) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (isActive, isVisible) => {
    if (!isActive) return '비활성';
    if (!isVisible) return '숨김';
    return '활성';
  };

  // 필터링된 메뉴 목록
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         menu.path.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || menu.requiredRole === filterRole;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && menu.isActive && menu.isVisible) ||
                         (filterStatus === 'inactive' && !menu.isActive) ||
                         (filterStatus === 'hidden' && !menu.isVisible);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">메뉴 관리</h1>
          <button
            onClick={handleCreateMenu}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            새 메뉴 추가
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('menus')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'menus'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CogIcon className="h-4 w-4 inline mr-2" />
              메뉴 관리
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserGroupIcon className="h-4 w-4 inline mr-2" />
              사용자별 권한
            </button>
          </nav>
        </div>

        {/* 메뉴 관리 탭 */}
        {activeTab === 'menus' && (
          <div className="mt-6">
            {/* 필터 및 검색 */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                  <input
                    type="text"
                    placeholder="메뉴 이름, 경로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">모든 역할</option>
                    <option value="USER">사용자</option>
                    <option value="MANAGER">매니저</option>
                    <option value="ADMIN">관리자</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">모든 상태</option>
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="hidden">숨김</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterRole('all');
                      setFilterStatus('all');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    필터 초기화
                  </button>
                </div>
              </div>
            </div>

            {/* 메뉴 목록 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredMenus.map((menu) => (
                  <li key={menu.id}>
                    <div className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />
                            <input
                              type="number"
                              value={menu.sortOrder}
                              onChange={(e) => handleMenuOrderChange(menu.id, parseInt(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              min="1"
                            />
                          </div>
                          <div 
                            className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                            onClick={() => handleMenuClick(menu)}
                          >
                            <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600">{menu.displayName}</h3>
                            <p className="text-sm text-gray-500">{menu.path}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(menu.requiredRole)}`}>
                                {menu.requiredRole}
                              </span>
                              {menu.requiredPermission && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {menu.requiredPermission}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(menu.isActive, menu.isVisible)}`}>
                            {getStatusText(menu.isActive, menu.isVisible)}
                          </span>
                          <button
                            onClick={() => handleMenuToggleActive(menu.id)}
                            className={`p-2 rounded ${menu.isActive ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                            title={menu.isActive ? '비활성화' : '활성화'}
                          >
                            <CogIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleMenuToggleVisible(menu.id)}
                            className={`p-2 rounded ${menu.isVisible ? 'text-blue-600 hover:bg-blue-50' : 'text-yellow-600 hover:bg-yellow-50'}`}
                            title={menu.isVisible ? '숨기기' : '보이기'}
                          >
                            {menu.isVisible ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleEditMenu(menu)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded hover:bg-indigo-50"
                            title="편집"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleMenuClick(menu)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50"
                            title="상세보기"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 메뉴 통계 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CogIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">전체 메뉴</p>
                    <p className="text-lg font-semibold text-gray-900">{menus.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <EyeIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">활성 메뉴</p>
                    <p className="text-lg font-semibold text-gray-900">{menus.filter(m => m.isActive && m.isVisible).length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <EyeSlashIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">숨김 메뉴</p>
                    <p className="text-lg font-semibold text-gray-900">{menus.filter(m => !m.isVisible).length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">관리자 전용</p>
                    <p className="text-lg font-semibold text-gray-900">{menus.filter(m => m.requiredRole === 'ADMIN').length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 사용자별 권한 탭 */}
        {activeTab === 'permissions' && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용자 선택
              </label>
              <select
                value={selectedUser || ''}
                onChange={(e) => setSelectedUser(e.target.value ? users.find(u => u.id === parseInt(e.target.value)) : null)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">사용자를 선택하세요</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} ({user.username}) - {user.role}
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedUser.fullName}의 메뉴 권한 설정
                  </h3>
                  <p className="text-sm text-gray-500">
                    각 메뉴에 대한 접근 권한을 설정할 수 있습니다.
                  </p>
                </div>
                <ul className="divide-y divide-gray-200">
                  {menus.map((menu) => (
                    <li key={menu.id}>
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{menu.displayName}</h4>
                            <p className="text-xs text-gray-500">{menu.path}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked={menu.requiredRole === 'USER' || selectedUser.role === 'ADMIN'}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">보기</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked={selectedUser.role === 'ADMIN'}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">편집</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked={selectedUser.role === 'ADMIN'}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">삭제</span>
                            </label>
                            <input
                              type="number"
                              defaultValue={menu.sortOrder}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="순서"
                            />
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">표시</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-4 bg-gray-50">
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    권한 저장
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 메뉴 편집 모달 */}
      <MenuEditModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingMenu(null);
        }}
        menu={editingMenu}
        onSave={handleSaveMenu}
        onDelete={handleDeleteMenu}
      />

      {/* 메뉴 상세 모달 */}
      <MenuDetailModal
        isOpen={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
        menu={selectedMenu}
        onEdit={handleEditMenu}
        onDelete={handleDeleteMenu}
      />
    </div>
  );
};

export default MenuManagement;
