import React, { useState } from 'react';
import { XMarkIcon, UserGroupIcon, CalendarIcon, DocumentTextIcon, FolderIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

const ProjectDetailModal = ({ isOpen, onClose, project, users, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');

  console.log('ProjectDetailModal 렌더링:', { isOpen, project });

  if (!isOpen || !project) {
    console.log('ProjectDetailModal 조건 불만족:', { isOpen, project });
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'ON_HOLD': return 'bg-orange-100 text-orange-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplayName = (status) => {
    switch (status) {
      case 'PLANNING': return '기획';
      case 'IN_PROGRESS': return '진행중';
      case 'ON_HOLD': return '보류';
      case 'COMPLETED': return '완료';
      case 'CANCELLED': return '취소';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'URGENT': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityDisplayName = (priority) => {
    switch (priority) {
      case 'LOW': return '낮음';
      case 'MEDIUM': return '보통';
      case 'HIGH': return '높음';
      case 'URGENT': return '긴급';
      default: return priority;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                담당자: {project.managerName || '미지정'}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                시작일: {project.startDate ? new Date(project.startDate).toLocaleDateString() : '미정'}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                종료일: {project.endDate ? new Date(project.endDate).toLocaleDateString() : '미정'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>

        {/* 상태 및 우선순위 배지 */}
        <div className="flex items-center space-x-4 mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {getStatusDisplayName(project.status)}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
            {getPriorityDisplayName(project.priority)}
          </span>
          <span className="text-sm text-gray-600">
            진행률: {project.progress || 0}%
          </span>
        </div>

        {/* 탭 네비게이션 */}
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
              onClick={() => setActiveTab('members')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              팀원
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              업무
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              진행상황
            </button>
          </nav>
        </div>

        {/* 탭 내용 */}
        <div className="min-h-96">
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">프로젝트 설명</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{project.description || '설명이 없습니다.'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">상태:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusDisplayName(project.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">우선순위:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {getPriorityDisplayName(project.priority)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">담당자:</span>
                      <span className="text-gray-900">{project.managerName || '미지정'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">예산:</span>
                      <span className="text-gray-900">{project.budget ? `${project.budget.toLocaleString()}원` : '미정'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">일정 정보</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">시작일:</span>
                      <span className="text-gray-900">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : '미정'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">종료일:</span>
                      <span className="text-gray-900">
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : '미정'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">생성일:</span>
                      <span className="text-gray-900">
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수정일:</span>
                      <span className="text-gray-900">
                        {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 수정 탭 */}
          {activeTab === 'edit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 수정</h3>
                <button
                  onClick={() => onEdit(project)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  편집 모달 열기
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 기본 정보 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">기본 정보</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트명</label>
                      <div className="text-gray-900 font-medium">{project.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                      <div className="text-gray-900 whitespace-pre-wrap">{project.description || '설명이 없습니다.'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusDisplayName(project.status)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {getPriorityDisplayName(project.priority)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">상세 정보</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                      <div className="text-gray-900">{project.managerName || '미지정'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">예산</label>
                      <div className="text-gray-900">{project.budget ? `${project.budget.toLocaleString()}원` : '미정'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                      <div className="text-gray-900">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : '미정'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                      <div className="text-gray-900">
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : '미정'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 빠른 편집 버튼 */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => onEdit(project)}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  전체 내용 편집하기
                </button>
              </div>
            </div>
          )}

          {/* 팀원 탭 */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 팀원</h3>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  팀원 추가
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">팀원 정보가 없습니다.</p>
                <p className="text-sm text-gray-400 mt-1">팀원을 추가하여 프로젝트를 관리하세요.</p>
              </div>
            </div>
          )}

          {/* 업무 탭 */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 업무</h3>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  업무 추가
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">연결된 업무가 없습니다.</p>
                <p className="text-sm text-gray-400 mt-1">프로젝트에 업무를 추가하여 진행상황을 관리하세요.</p>
              </div>
            </div>
          )}

          {/* 진행상황 탭 */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">프로젝트 진행상황</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>전체 진행률</span>
                    <span>{project.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">전체 업무</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">완료된 업무</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-yellow-600">0</div>
                    <div className="text-sm text-gray-600">진행중 업무</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit(project)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              편집
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              삭제
            </button>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
