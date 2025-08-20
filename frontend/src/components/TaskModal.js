import React, { useState, useEffect } from 'react';
import { XMarkIcon, PaperClipIcon, ChatBubbleLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const TaskModal = ({ isOpen, onClose, task, users, projects, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    department: 'COMMON',
    assigneeId: '',
    projectId: '',
    dueDate: '',
    attachments: [],
    comments: [],
    reportContent: ''
  });
  
  const [activeTab, setActiveTab] = useState('basic');
  const [newComment, setNewComment] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'TODO',
        priority: task.priority || 'MEDIUM',
        department: task.department || 'COMMON',
        assigneeId: task.assigneeId || '',
        projectId: task.projectId || '',
        dueDate: task.dueDate || '',
        attachments: task.attachments || [],
        comments: task.comments || [],
        reportContent: task.reportContent || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        department: 'COMMON',
        assigneeId: '',
        projectId: '',
        dueDate: '',
        attachments: [],
        comments: [],
        reportContent: ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: '현재 사용자',
        timestamp: new Date().toISOString()
      };
      setFormData(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      setNewComment('');
    }
  };

  const handleRemoveAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-5xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            {task ? '업무 수정' : '새 업무 생성'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'basic'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              기본 정보
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
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 기본 정보 탭 */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    상태
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="TODO">대기</option>
                    <option value="IN_PROGRESS">진행중</option>
                    <option value="REVIEW">검토</option>
                    <option value="DONE">완료</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    우선순위
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="LOW">낮음</option>
                    <option value="MEDIUM">보통</option>
                    <option value="HIGH">높음</option>
                    <option value="URGENT">긴급</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    부서
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="CX_TEAM">CX팀</option>
                    <option value="ACCIDENT_TEAM">사고팀</option>
                    <option value="LEGAL_INSPECTION_TEAM">법정검사팀</option>
                    <option value="PATROL_MAINTENANCE_TEAM">순회정비팀</option>
                    <option value="COMMON">공통</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    담당자
                  </label>
                  <select
                    name="assigneeId"
                    value={formData.assigneeId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">담당자 선택</option>
                    {users?.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    프로젝트
                  </label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">프로젝트 선택</option>
                    {projects?.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    마감일
                  </label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 첨부파일 탭 */}
          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파일 첨부
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <PaperClipIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    첨부된 파일
                  </label>
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 댓글 탭 */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 댓글 작성
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    추가
                  </button>
                </div>
              </div>

              {formData.comments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    댓글 목록
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {formData.comments.map((comment) => (
                      <div key={comment.id} className="p-2 bg-gray-50 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-900">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {comment.author} • {new Date(comment.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 보고서 탭 */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  보고서 내용
                </label>
                <textarea
                  name="reportContent"
                  value={formData.reportContent}
                  onChange={handleChange}
                  rows={8}
                  placeholder="업무 진행상황이나 이슈사항을 상세히 작성하세요..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <DocumentTextIcon className="h-4 w-4" />
                <span>보고서는 업무 완료 시나 진행상황 업데이트 시 작성할 수 있습니다.</span>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {task ? '수정' : '생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
