import React, { useState } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, CogIcon } from '@heroicons/react/24/outline';

const MenuDetailModal = ({ isOpen, onClose, menu, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !menu) return null;

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

  const formatDate = (dateString) => {
    if (!dateString) return '설정되지 않음';
    return new Date(dateString).toLocaleString('ko-KR');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{menu.displayName}</h2>
            <p className="text-sm text-gray-500">{menu.path}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              개요
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'edit'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              수정
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              권한 설정
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              히스토리
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">메뉴 이름</dt>
                      <dd className="text-sm text-gray-900">{menu.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">표시 이름</dt>
                      <dd className="text-sm text-gray-900">{menu.displayName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">경로</dt>
                      <dd className="text-sm text-gray-900 font-mono">{menu.path}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">아이콘</dt>
                      <dd className="text-sm text-gray-900">{menu.icon || '설정되지 않음'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">설정</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">순서</dt>
                      <dd className="text-sm text-gray-900">{menu.sortOrder}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">부모 메뉴</dt>
                      <dd className="text-sm text-gray-900">{menu.parentId ? `ID: ${menu.parentId}` : '최상위 메뉴'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">상태</dt>
                      <dd>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(menu.isActive, menu.isVisible)}`}>
                          {getStatusText(menu.isActive, menu.isVisible)}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">권한 요구사항</h3>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(menu.requiredRole)}`}>
                    {menu.requiredRole}
                  </span>
                  {menu.requiredPermission && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {menu.requiredPermission}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">생성/수정 정보</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">생성일</dt>
                    <dd className="text-sm text-gray-900">{formatDate(menu.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">수정일</dt>
                    <dd className="text-sm text-gray-900">{formatDate(menu.updatedAt)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* 수정 탭 */}
          {activeTab === 'edit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">메뉴 수정</h3>
                <button
                  onClick={() => onEdit(menu)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  편집 모달 열기
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">현재 메뉴 정보</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">메뉴 이름:</span> {menu.name}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">표시 이름:</span> {menu.displayName}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">경로:</span> {menu.path}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">아이콘:</span> {menu.icon || '설정되지 않음'}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">순서:</span> {menu.sortOrder}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">부모 메뉴:</span> {menu.parentId ? `ID: ${menu.parentId}` : '최상위 메뉴'}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">필수 역할:</span> {menu.requiredRole}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">필수 권한:</span> {menu.requiredPermission || '설정되지 않음'}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">활성화:</span> {menu.isActive ? '예' : '아니오'}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">가시성:</span> {menu.isVisible ? '예' : '아니오'}
                  </div>
                </div>
                
                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => onEdit(menu)}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    전체 내용 편집하기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 권한 설정 탭 */}
          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CogIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      권한 설정 안내
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>이 메뉴에 대한 사용자별 접근 권한을 설정할 수 있습니다.</p>
                      <p>권한은 보기, 편집, 삭제로 구분되며, 사용자별로 다르게 설정할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">사용자별 권한 설정</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-sm">
                    권한 설정은 "사용자별 권한" 탭에서 관리할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 히스토리 탭 */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">변경 이력</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <p className="text-sm font-medium text-gray-900">메뉴 생성</p>
                      <p className="text-xs text-gray-500">{formatDate(menu.createdAt)}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      생성
                    </span>
                  </div>
                  
                  {menu.updatedAt && menu.updatedAt !== menu.createdAt && (
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <p className="text-sm font-medium text-gray-900">메뉴 수정</p>
                        <p className="text-xs text-gray-500">{formatDate(menu.updatedAt)}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        수정
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={() => onDelete(menu.id)}
              className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              삭제
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit(menu)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              편집
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailModal;
