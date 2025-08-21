import React, { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const MenuEditModal = ({ isOpen, onClose, menu, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    path: '',
    icon: '',
    sortOrder: 1,
    parentId: null,
    isActive: true,
    isVisible: true,
    requiredRole: 'USER',
    requiredPermission: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name || '',
        displayName: menu.displayName || '',
        path: menu.path || '',
        icon: menu.icon || '',
        sortOrder: menu.sortOrder || 1,
        parentId: menu.parentId || null,
        isActive: menu.isActive !== undefined ? menu.isActive : true,
        isVisible: menu.isVisible !== undefined ? menu.isVisible : true,
        requiredRole: menu.requiredRole || 'USER',
        requiredPermission: menu.requiredPermission || ''
      });
    }
  }, [menu]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '메뉴 이름은 필수입니다.';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = '표시 이름은 필수입니다.';
    }
    
    if (!formData.path.trim()) {
      newErrors.path = '경로는 필수입니다.';
    }
    
    if (formData.sortOrder < 1) {
      newErrors.sortOrder = '순서는 1 이상이어야 합니다.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        id: menu?.id,
        sortOrder: parseInt(formData.sortOrder)
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      onDelete(menu.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {menu ? '메뉴 편집' : '새 메뉴 추가'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 메뉴 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                메뉴 이름 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: dashboard"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* 표시 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                표시 이름 *
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.displayName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: 대시보드"
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
              )}
            </div>

            {/* 경로 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                경로 *
              </label>
              <input
                type="text"
                name="path"
                value={formData.path}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.path ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="예: /dashboard"
              />
              {errors.path && (
                <p className="mt-1 text-sm text-red-600">{errors.path}</p>
              )}
            </div>

            {/* 아이콘 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이콘
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="예: HomeIcon"
              />
            </div>

            {/* 순서 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                순서 *
              </label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.sortOrder ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.sortOrder && (
                <p className="mt-1 text-sm text-red-600">{errors.sortOrder}</p>
              )}
            </div>

            {/* 부모 메뉴 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                부모 메뉴
              </label>
              <select
                name="parentId"
                value={formData.parentId || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">최상위 메뉴</option>
                {/* 실제로는 부모 메뉴 목록을 가져와서 표시 */}
                <option value="1">대시보드</option>
                <option value="2">업무 관리</option>
                <option value="3">프로젝트 관리</option>
              </select>
            </div>

            {/* 필수 역할 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                필수 역할
              </label>
              <select
                name="requiredRole"
                value={formData.requiredRole}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="USER">사용자</option>
                <option value="MANAGER">매니저</option>
                <option value="ADMIN">관리자</option>
              </select>
            </div>

            {/* 필수 권한 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                필수 권한
              </label>
              <input
                type="text"
                name="requiredPermission"
                value={formData.requiredPermission}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="예: TASK_VIEW"
              />
            </div>
          </div>

          {/* 체크박스 옵션들 */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">활성화</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">가시성</span>
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <div className="flex space-x-3">
              {menu && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  삭제
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {menu ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuEditModal;
