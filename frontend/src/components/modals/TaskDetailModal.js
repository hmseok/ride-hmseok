import React, { useState, useEffect } from 'react';
import { XMarkIcon, PaperClipIcon, ChatBubbleLeftIcon, DocumentTextIcon, UserIcon, CalendarIcon, FlagIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const TaskDetailModal = ({ isOpen, onClose, task, users, projects, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');

  console.log('TaskDetailModal 렌더링:', { isOpen, task });

  if (!isOpen || !task) {
    console.log('TaskDetailModal 조건 불만족:', { isOpen, task });
    return null;
  }

  const getUserName = (userId) => {
    const user = users?.find(u => u.id === userId);
    return user ? user.fullName : '미지정';
  };

  const getProjectName = (projectId) => {
    const project = projects?.find(p => p.id === projectId);
    return project ? project.name : '미지정';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO': return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'DONE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getStatusDisplayName = (status) => {
    switch (status) {
      case 'TODO': return '대기';
      case 'IN_PROGRESS': return '진행중';
      case 'REVIEW': return '검토';
      case 'DONE': return '완료';
      default: return status;
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      // 댓글 추가 로직 (실제로는 API 호출)
      console.log('댓글 추가:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                담당자: {getUserName(task.assigneeId)}
              </div>
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                부서: {getDepartmentDisplayName(task.department)}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                마감일: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '미정'}
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
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
            {getStatusDisplayName(task.status)}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
            {getPriorityDisplayName(task.priority)}
          </span>
          <span className="text-sm text-gray-600">
            프로젝트: {getProjectName(task.projectId)}
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
              onClick={() => setActiveTab('attachments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attachments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              첨부파일
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              댓글
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'report'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              보고서
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

        {/* 탭 내용 */}
        <div className="min-h-96">
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">설명</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{task.description || '설명이 없습니다.'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">상태:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusDisplayName(task.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">우선순위:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityDisplayName(task.priority)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">부서:</span>
                      <span className="text-gray-900">{getDepartmentDisplayName(task.department)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">담당자:</span>
                      <span className="text-gray-900">{getUserName(task.assigneeId)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">프로젝트:</span>
                      <span className="text-gray-900">{getProjectName(task.projectId)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">마감일:</span>
                      <span className="text-gray-900">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '미정'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">진행 현황</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>진행률</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>생성일: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</p>
                      <p>수정일: {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'N/A'}</p>
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
                <h3 className="text-lg font-medium text-gray-900">업무 수정</h3>
                <button
                  onClick={() => onEdit(task)}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                      <div className="text-gray-900 font-medium">{task.title}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                      <div className="text-gray-900 whitespace-pre-wrap">{task.description || '설명이 없습니다.'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusDisplayName(task.status)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityDisplayName(task.priority)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 담당 정보 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">담당 정보</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                      <div className="text-gray-900">{getDepartmentDisplayName(task.department)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                      <div className="text-gray-900">{getUserName(task.assigneeId)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트</label>
                      <div className="text-gray-900">{getProjectName(task.projectId)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">마감일</label>
                      <div className="text-gray-900">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '미정'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 첨부파일 요약 */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">첨부파일</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {task.attachments && task.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {task.attachments.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <PaperClipIcon className="h-4 w-4 mr-2" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">첨부된 파일이 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 댓글 요약 */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">댓글</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {task.comments && task.comments.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">총 {task.comments.length}개의 댓글이 있습니다.</p>
                      {task.comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="text-sm text-gray-600 border-l-2 border-gray-200 pl-3">
                          <p className="text-gray-900">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.author} • {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      {task.comments.length > 3 && (
                        <p className="text-sm text-gray-500 mt-2">... 외 {task.comments.length - 3}개</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">댓글이 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 보고서 요약 */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">보고서</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {task.reportContent ? (
                    <div>
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{task.reportContent}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">작성된 보고서가 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 빠른 편집 버튼 */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => onEdit(task)}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  전체 내용 편집하기
                </button>
              </div>
            </div>
          )}

          {/* 첨부파일 탭 */}
          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">첨부파일</h3>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <PaperClipIcon className="h-4 w-4 mr-2" />
                  파일 추가
                </button>
              </div>
              
              {task.attachments && task.attachments.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    {task.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center">
                          <PaperClipIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <button className="text-red-600 hover:text-red-800 text-sm">삭제</button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <PaperClipIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">첨부된 파일이 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 댓글 탭 */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">댓글</h3>
                <span className="text-sm text-gray-500">{task.comments?.length || 0}개의 댓글</span>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  작성
                </button>
              </div>

              {task.comments && task.comments.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {comment.author} • {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <ChatBubbleLeftIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">댓글이 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 보고서 탭 */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">보고서</h3>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  보고서 작성
                </button>
              </div>
              
              {task.reportContent ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">보고서 내용</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{task.reportContent}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">작성된 보고서가 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 히스토리 탭 */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">변경 히스토리</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">업무가 생성되었습니다</p>
                      <p className="text-xs text-gray-500">
                        {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {task.updatedAt && task.updatedAt !== task.createdAt && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">업무가 수정되었습니다</p>
                        <p className="text-xs text-gray-500">
                          {new Date(task.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit(task)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              편집
            </button>
            <button
              onClick={() => onDelete(task.id)}
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

export default TaskDetailModal;
