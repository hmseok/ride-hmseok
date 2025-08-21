import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, CalendarIcon, PencilIcon, TrashIcon, EyeIcon, CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { projectAPI } from '../../services/project/projectAPI';
import ProjectDetailModal from '../../components/modals/ProjectDetailModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    planning: 0,
    inProgress: 0,
    onHold: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
    updateStats();
  }, [projects, searchTerm, statusFilter, priorityFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await projectAPI.getAll();
      setProjects(projectsData);
    } catch (error) {
      console.error('프로젝트 목록 로드 실패:', error);
      // 목 데이터 사용
      const mockProjects = [
        {
          id: 1,
          name: '웹 애플리케이션 개발',
          description: 'React와 Spring Boot를 사용한 웹 애플리케이션 개발',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          managerName: '김개발',
          startDate: '2024-01-01',
          endDate: '2024-06-30',
          taskCount: 15,
          progress: 60,
          budget: 50000000,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        },
        {
          id: 2,
          name: '데이터베이스 설계',
          description: 'MySQL을 사용한 데이터베이스 설계 및 최적화',
          status: 'PLANNING',
          priority: 'MEDIUM',
          managerName: '이디자인',
          startDate: '2024-02-01',
          endDate: '2024-03-31',
          taskCount: 8,
          progress: 20,
          budget: 20000000,
          createdAt: '2024-02-01T00:00:00Z',
          updatedAt: '2024-02-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'API 개발',
          description: 'RESTful API 개발 및 문서화',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          managerName: '박문서',
          startDate: '2024-01-15',
          endDate: '2024-04-30',
          taskCount: 12,
          progress: 45,
          budget: 30000000,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-20T00:00:00Z'
        }
      ];
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.managerName && project.managerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(project => project.priority === priorityFilter);
    }

    setFilteredProjects(filtered);
  };

  const updateStats = () => {
    const stats = {
      total: projects.length,
      planning: projects.filter(project => project.status === 'PLANNING').length,
      inProgress: projects.filter(project => project.status === 'IN_PROGRESS').length,
      onHold: projects.filter(project => project.status === 'ON_HOLD').length,
      completed: projects.filter(project => project.status === 'COMPLETED').length,
      cancelled: projects.filter(project => project.status === 'CANCELLED').length
    };
    setStats(stats);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectAPI.create(projectData);
      setProjects(prev => [...prev, newProject]);
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
      // 에러 시 목 데이터로 추가
      const newProject = {
        id: Date.now(),
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProjects(prev => [...prev, newProject]);
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      const updatedProject = await projectAPI.update(editingProject.id, projectData);
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id ? updatedProject : project
      ));
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
      // 에러 시 목 데이터로 수정
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id ? { ...project, ...projectData } : project
      ));
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      try {
        await projectAPI.delete(projectId);
        setProjects(prev => prev.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('프로젝트 삭제 실패:', error);
        // 에러 시 목 데이터에서 삭제
        setProjects(prev => prev.filter(project => project.id !== projectId));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PLANNING': return <ClockIcon className="h-4 w-4" />;
      case 'IN_PROGRESS': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'ON_HOLD': return <ClockIcon className="h-4 w-4" />;
      case 'COMPLETED': return <CheckIcon className="h-4 w-4" />;
      case 'CANCELLED': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '미정';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const formatBudget = (budget) => {
    if (!budget) return '미정';
    return new Intl.NumberFormat('ko-KR').format(budget) + '원';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <h1 className="text-2xl font-semibold text-gray-900">프로젝트 관리</h1>
          <button
            onClick={() => setEditingProject({})}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            새 프로젝트 생성
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-400 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.total}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">전체</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.planning}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">계획</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.inProgress}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">진행중</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.onHold}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">일시중지</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.completed}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">완료</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{stats.cancelled}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">취소</dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
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
                placeholder="프로젝트 검색..."
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
            <option value="PLANNING">계획</option>
            <option value="IN_PROGRESS">진행중</option>
            <option value="ON_HOLD">일시중지</option>
            <option value="COMPLETED">완료</option>
            <option value="CANCELLED">취소</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ALL">모든 우선순위</option>
            <option value="LOW">낮음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">높음</option>
            <option value="URGENT">긴급</option>
          </select>
        </div>

        {/* 프로젝트 목록 */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <li key={project.id}>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => setSelectedProject(project)}
                          className="text-lg font-semibold text-indigo-600 truncate hover:text-indigo-800 cursor-pointer p-2 hover:bg-gray-50 rounded"
                        >
                          {project.name}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{project.status}</span>
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>매니저: {project.managerName || '미지정'}</span>
                        <span className="mx-2">•</span>
                        <span>시작일: {formatDate(project.startDate)}</span>
                        <span className="mx-2">•</span>
                        <span>종료일: {formatDate(project.endDate)}</span>
                        <span className="mx-2">•</span>
                        <span>예산: {formatBudget(project.budget)}</span>
                      </div>
                      {/* 진행률 바 */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>진행률</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(project.progress || 0)}`}
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="편집"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
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
        <ProjectDetailModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
          onEdit={(project) => {
            setSelectedProject(null);
            setEditingProject(project);
          }}
          onDelete={handleDeleteProject}
        />

        {/* 편집 모달은 ProjectDetailModal을 재사용 */}
        <ProjectDetailModal
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          project={editingProject}
          isEditing={true}
          onSubmit={editingProject?.id ? handleUpdateProject : handleCreateProject}
        />
      </div>
    </div>
  );
};

export default Projects;
