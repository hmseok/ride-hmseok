import React, { useState, useEffect } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon, DocumentIcon, CalendarIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const ProjectDetailModal = ({ isOpen, onClose, project, users, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [milestones, setMilestones] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (isOpen && project) {
      // 마일스톤, 문서, 멤버 데이터 로드 (실제로는 API 호출)
      loadProjectData();
    }
  }, [isOpen, project]);

  const loadProjectData = () => {
    // 실제로는 API 호출
    setMilestones([
      { id: 1, name: '요구사항 분석', status: 'COMPLETED', progress: 100, dueDate: '2025-08-25' },
      { id: 2, name: '설계', status: 'IN_PROGRESS', progress: 75, dueDate: '2025-09-01' },
      { id: 3, name: '개발', status: 'NOT_STARTED', progress: 0, dueDate: '2025-09-15' },
      { id: 4, name: '테스트', status: 'NOT_STARTED', progress: 0, dueDate: '2025-09-30' }
    ]);

    setDocuments([
      { id: 1, name: '요구사항 명세서.pdf', type: 'REQUIREMENT', uploadedBy: '김개발', uploadedAt: '2025-08-20' },
      { id: 2, name: '시스템 설계서.pdf', type: 'DESIGN', uploadedBy: '이설계', uploadedAt: '2025-08-22' }
    ]);

    setMembers([
      { id: 1, name: '김개발', role: '개발자', department: 'CX팀' },
      { id: 2, name: '이설계', role: '설계자', department: 'CX팀' },
      { id: 3, name: '박테스트', role: '테스터', department: 'CX팀' }
    ]);
  };

  if (!isOpen || !project) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-blue-800';
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-7xl max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">프로젝트 상세</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              편집
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              삭제
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: '개요', icon: ChartBarIcon },
              { id: 'milestones', name: '마일스톤', icon: CalendarIcon },
              { id: 'documents', name: '문서', icon: DocumentIcon },
              { id: 'members', name: '팀원', icon: UserIcon },
              { id: 'budget', name: '예산', icon: CurrencyDollarIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 프로젝트 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">프로젝트 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">프로젝트명</label>
                      <p className="text-sm text-gray-900">{project.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">설명</label>
                      <p className="text-sm text-gray-900">{project.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">프로젝트 코드</label>
                      <p className="text-sm text-gray-900">{project.projectCode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">클라이언트</label>
                      <p className="text-sm text-gray-900">{project.clientName || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">상태 및 진행</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">상태</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">우선순위</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">위험도</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(project.riskLevel)}`}>
                        {project.riskLevel || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">진행률</label>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progressPercentage || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progressPercentage || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 일정 정보 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">일정 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">시작일</label>
                    <p className="text-sm text-gray-900">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">종료일</label>
                    <p className="text-sm text-gray-900">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">생성일</label>
                    <p className="text-sm text-gray-900">
                      {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 예산 정보 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">예산 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">예산</label>
                    <p className="text-sm text-gray-900">
                      {project.budget ? `₩${project.budget.toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">실제 지출</label>
                    <p className="text-sm text-gray-900">
                      {project.actualCost ? `₩${project.actualCost.toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">잔여 예산</label>
                    <p className="text-sm text-gray-900">
                      {project.budget && project.actualCost 
                        ? `₩${(project.budget - project.actualCost).toLocaleString()}` 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 마일스톤 탭 */}
          {activeTab === 'milestones' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">마일스톤</h3>
                <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  마일스톤 추가
                </button>
              </div>
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                        <p className="text-sm text-gray-500">기한: {milestone.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          milestone.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          milestone.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {milestone.status}
                        </span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{milestone.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 문서 탭 */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 문서</h3>
                <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  문서 업로드
                </button>
              </div>
              <div className="space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <DocumentIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{document.name}</h4>
                          <p className="text-sm text-gray-500">
                            {document.type} • {document.uploadedBy} • {document.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        다운로드
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 팀원 탭 */}
          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 팀원</h3>
                <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  팀원 추가
                </button>
              </div>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">
                            {member.role} • {member.department}
                          </p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        편집
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 예산 탭 */}
          {activeTab === 'budget' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">예산 관리</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">예산 현황</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">총 예산</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₩{project.budget ? project.budget.toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">실제 지출</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₩{project.actualCost ? project.actualCost.toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">잔여 예산</span>
                      <span className="text-sm font-medium text-gray-900">
                        ₩{project.budget && project.actualCost 
                          ? (project.budget - project.actualCost).toLocaleString() 
                          : '0'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">예산 사용률</h4>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full" 
                      style={{ 
                        width: `${project.budget && project.actualCost 
                          ? Math.min((project.actualCost / project.budget) * 100, 100) 
                          : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {project.budget && project.actualCost 
                      ? `${Math.round((project.actualCost / project.budget) * 100)}%` 
                      : '0%'} 사용됨
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
