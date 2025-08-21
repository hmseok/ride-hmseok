import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline';
import ProjectDetailModal from '../../components/modals/ProjectDetailModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter]);

  useEffect(() => {
    console.log('selectedProject 상태 변화:', selectedProject);
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      // 실제 API 호출로 대체
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
    } catch (error) {
      console.error('프로젝트 목록 로드 실패:', error);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

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

  const getProgressPercentage = (project) => {
    // 실제로는 백엔드에서 계산된 진행률을 사용
    const statusProgress = {
      'PLANNING': 20,
      'ACTIVE': 60,
      'ON_HOLD': 40,
      'COMPLETED': 100,
      'CANCELLED': 0
    };
    return statusProgress[project.status] || 0;
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      setProjects(projects.filter(p => p.id !== projectId));
      setSelectedProject(null);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">프로젝트 관리</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusIcon className="h-4 w-4 mr-2" />
            새 프로젝트 생성
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
            <option value="ACTIVE">진행중</option>
            <option value="ON_HOLD">보류</option>
            <option value="COMPLETED">완료</option>
            <option value="CANCELLED">취소</option>
          </select>
        </div>

        {/* 프로젝트 목록 */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      console.log('프로젝트 제목 클릭됨!');
                      console.log('클릭된 프로젝트:', project);
                      setSelectedProject(project);
                    }}
                    className="text-lg font-medium text-gray-900 truncate hover:text-indigo-600 cursor-pointer"
                  >
                    {project.name}
                  </button>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>
                
                {/* 진행률 바 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{getProgressPercentage(project)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(project)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{project.startDate} ~ {project.endDate}</span>
                  </div>
                  <span>업무: {project.taskCount}개</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">담당자: {project.managerName}</span>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                      상세보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        users={[]}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </div>
  );
};

export default Projects;
