import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { taskAPI } from '../../services/task/taskAPI';
import { userAPI } from '../../services/user/userAPI';
import { projectAPI } from '../../services/project/projectAPI';
import TaskModal from '../../components/modals/TaskModal';
import TaskDetailModal from '../../components/modals/TaskDetailModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, departmentFilter]);

  useEffect(() => {
    console.log('selectedTask 상태 변화:', selectedTask);
  }, [selectedTask]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksData, usersData, projectsData] = await Promise.all([
        taskAPI.getAll(),
        userAPI.getAll(),
        projectAPI.getAll()
      ]);
      
      console.log('로드된 업무 데이터:', tasksData);
      console.log('로드된 사용자 데이터:', usersData);
      console.log('로드된 프로젝트 데이터:', projectsData);
      
      setTasks(tasksData);
      setUsers(usersData);
      setProjects(projectsData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      // 목 데이터 사용
      setTasks([
        {
          id: 1,
          title: '테스트 업무 1',
          description: '이것은 테스트 업무입니다.',
          status: 'TODO',
          priority: 'MEDIUM',
          department: 'CX_TEAM',
          assigneeId: 1,
          projectId: 1,
          dueDate: '2024-12-31',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: '테스트 업무 2',
          description: '두 번째 테스트 업무입니다.',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          department: 'ACCIDENT_TEAM',
          assigneeId: 2,
          projectId: 1,
          dueDate: '2024-12-30',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
      setUsers([
        { id: 1, fullName: '전소현', username: 'jeon', email: 'jeon@example.com', department: 'CX_TEAM' },
        { id: 2, fullName: '최지광', username: 'choi', email: 'choi@example.com', department: 'ACCIDENT_TEAM' }
      ]);
      setProjects([
        { id: 1, name: '테스트 프로젝트', description: '테스트용 프로젝트입니다.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (departmentFilter !== 'ALL') {
      filtered = filtered.filter(task => task.department === departmentFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskAPI.create(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('업무 생성 실패:', error);
      // 에러 시 목 데이터로 추가
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskAPI.update(editingTask.id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
    } catch (error) {
      console.error('업무 수정 실패:', error);
      // 에러 시 목 데이터로 수정
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? { ...task, ...taskData } : task
      ));
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('정말로 이 업무를 삭제하시겠습니까?')) {
      try {
        await taskAPI.delete(taskId);
        setTasks(prev => prev.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('업무 삭제 실패:', error);
        // 에러 시 목 데이터에서 삭제
        setTasks(prev => prev.filter(task => task.id !== taskId));
      }
    }
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

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : '미지정';
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : '미지정';
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">업무 관리</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            새 업무 생성
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
                placeholder="업무 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ALL">모든 상태</option>
            <option value="TODO">대기</option>
            <option value="IN_PROGRESS">진행중</option>
            <option value="REVIEW">검토</option>
            <option value="DONE">완료</option>
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

        {/* 디버깅 정보 */}
        {selectedTask && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>선택된 업무:</strong> {selectedTask.title} (ID: {selectedTask.id})
            </p>
            <p className="text-blue-600 text-sm">
              selectedTask 상태: {JSON.stringify(selectedTask)}
            </p>
          </div>
        )}

        {/* 업무 목록 */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => {
                            console.log('업무 제목 클릭됨!');
                            console.log('클릭된 업무:', task);
                            setSelectedTask(task);
                          }}
                          className="text-lg font-semibold text-indigo-600 truncate hover:text-indigo-800 cursor-pointer p-2 hover:bg-gray-50 rounded"
                        >
                          {task.title}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>담당자: {getUserName(task.assigneeId)}</span>
                        <span className="mx-2">•</span>
                        <span>프로젝트: {getProjectName(task.projectId)}</span>
                        <span className="mx-2">•</span>
                        <span>마감일: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="편집"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="삭제"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 모달들 */}
        <TaskModal
          isOpen={showCreateModal || !!editingTask}
          onClose={() => {
            setShowCreateModal(false);
            setEditingTask(null);
          }}
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          users={users}
          projects={projects}
        />

        <TaskDetailModal
          isOpen={!!selectedTask}
          onClose={() => {
            console.log('TaskDetailModal 닫기 호출');
            setSelectedTask(null);
          }}
          task={selectedTask}
          users={users}
          projects={projects}
          onEdit={(task) => {
            console.log('TaskDetailModal에서 편집 호출:', task);
            setSelectedTask(null);
            setEditingTask(task);
          }}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Tasks;
