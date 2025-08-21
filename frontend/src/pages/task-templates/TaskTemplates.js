import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const TaskTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 샘플 데이터
  useEffect(() => {
    const sampleTemplates = [
      {
        id: 1,
        name: '웹사이트 개발 템플릿',
        description: '기본적인 웹사이트 개발 프로세스',
        templateCode: 'WEB_DEV_001',
        department: 'CX_TEAM',
        priority: 'MEDIUM',
        estimatedHours: 80,
        isActive: true,
        usageCount: 15,
        createdAt: '2025-08-01',
        createdBy: 'admin'
      },
      {
        id: 2,
        name: '모바일 앱 개발 템플릿',
        description: '모바일 애플리케이션 개발 프로세스',
        templateCode: 'MOBILE_DEV_001',
        department: 'CX_TEAM',
        priority: 'HIGH',
        estimatedHours: 120,
        isActive: true,
        usageCount: 8,
        createdAt: '2025-08-05',
        createdBy: 'admin'
      },
      {
        id: 3,
        name: '시스템 점검 템플릿',
        description: '정기적인 시스템 점검 프로세스',
        templateCode: 'SYS_CHECK_001',
        department: 'PATROL_MAINTENANCE_TEAM',
        priority: 'MEDIUM',
        estimatedHours: 16,
        isActive: true,
        usageCount: 25,
        createdAt: '2025-08-10',
        createdBy: 'admin'
      },
      {
        id: 4,
        name: '사고 조사 템플릿',
        description: '사고 발생 시 조사 프로세스',
        templateCode: 'ACCIDENT_INV_001',
        department: 'ACCIDENT_TEAM',
        priority: 'CRITICAL',
        estimatedHours: 24,
        isActive: true,
        usageCount: 3,
        createdAt: '2025-08-15',
        createdBy: 'admin'
      }
    ];
    setTemplates(sampleTemplates);
    setFilteredTemplates(sampleTemplates);
  }, []);

  // 필터링 로직
  useEffect(() => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.templateCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== 'ALL') {
      filtered = filtered.filter(template => template.department === departmentFilter);
    }

    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(template => template.priority === priorityFilter);
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(template => 
        statusFilter === 'ACTIVE' ? template.isActive : !template.isActive
      );
    }

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, departmentFilter, priorityFilter, statusFilter]);

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

  const getPriorityDisplayName = (priority) => {
    switch (priority) {
      case 'LOW': return '낮음';
      case 'MEDIUM': return '보통';
      case 'HIGH': return '높음';
      case 'CRITICAL': return '긴급';
      default: return priority;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-100 text-gray-800';
      case 'MEDIUM': return 'bg-blue-100 text-blue-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTemplate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = (templateId) => {
    setTemplates(prev => prev.map(template =>
      template.id === templateId
        ? { ...template, isActive: !template.isActive }
        : template
    ));
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('정말로 이 템플릿을 삭제하시겠습니까?')) {
      setTemplates(prev => prev.filter(template => template.id !== templateId));
    }
  };

  const handleApplyTemplate = (templateId) => {
    // 템플릿 적용 로직
    alert(`템플릿 ${templateId}가 적용되었습니다.`);
  };

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">업무 템플릿 관리</h1>
        <p className="text-gray-600">자주 사용하는 업무 패턴을 템플릿으로 관리하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">전체 템플릿</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">활성 템플릿</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter(t => t.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">총 사용 횟수</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">평균 사용 횟수</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.length > 0 
                  ? Math.round(templates.reduce((sum, t) => sum + t.usageCount, 0) / templates.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="템플릿 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* 필터들 */}
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="ALL">전체 부서</option>
              <option value="CX_TEAM">CX팀</option>
              <option value="ACCIDENT_TEAM">사고팀</option>
              <option value="LEGAL_INSPECTION_TEAM">법정검사팀</option>
              <option value="PATROL_MAINTENANCE_TEAM">순회정비팀</option>
              <option value="COMMON">공통</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="ALL">전체 우선순위</option>
              <option value="LOW">낮음</option>
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
              <option value="CRITICAL">긴급</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="ALL">전체 상태</option>
              <option value="ACTIVE">활성</option>
              <option value="INACTIVE">비활성</option>
            </select>
          </div>

          {/* 새 템플릿 생성 버튼 */}
          <button
            onClick={handleCreateTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            새 템플릿
          </button>
        </div>
      </div>

      {/* 템플릿 목록 */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">템플릿 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  템플릿명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  코드
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  부서
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  우선순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  예상 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용 횟수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {template.templateCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getDepartmentDisplayName(template.department)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(template.priority)}`}>
                      {getPriorityDisplayName(template.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {template.estimatedHours}시간
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {template.usageCount}회
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      template.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {template.isActive ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApplyTemplate(template.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        적용
                      </button>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        편집
                      </button>
                      <button
                        onClick={() => handleToggleStatus(template.id)}
                        className={`${
                          template.isActive 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {template.isActive ? '비활성화' : '활성화'}
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모달들 (실제 구현 필요) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">새 템플릿 생성</h3>
            <p className="text-gray-600 mb-4">템플릿 생성 기능은 추후 구현 예정입니다.</p>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">템플릿 편집</h3>
            <p className="text-gray-600 mb-4">템플릿 편집 기능은 추후 구현 예정입니다.</p>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTemplates;
