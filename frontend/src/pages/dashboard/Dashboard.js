import React, { useState, useEffect } from 'react';
import {
  ClipboardDocumentListIcon,
  FolderIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { taskAPI } from '../../services/task/taskAPI';
import { projectAPI } from '../../services/project/projectAPI';
import { userAPI } from '../../services/user/userAPI';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalProjects: 0,
    totalUsers: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0
  });

  const [recentTasks, setRecentTasks] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [tasksData, projectsData, usersData] = await Promise.all([
        taskAPI.getAll(),
        projectAPI.getAll(),
        userAPI.getAll()
      ]);

      // 통계 계산
      const totalTasks = tasksData.length;
      const completedTasks = tasksData.filter(task => task.status === 'DONE').length;
      const inProgressTasks = tasksData.filter(task => task.status === 'IN_PROGRESS').length;
      const pendingTasks = tasksData.filter(task => task.status === 'TODO').length;

      setStats({
        totalTasks,
        totalProjects: projectsData.length,
        totalUsers: usersData.length,
        completedTasks,
        inProgressTasks,
        pendingTasks
      });

      // 최근 업무 (최근 5개)
      const sortedTasks = tasksData
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);
      setRecentTasks(sortedTasks);

      // 최근 프로젝트 (최근 5개)
      const sortedProjects = projectsData
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);
      setRecentProjects(sortedProjects);

    } catch (error) {
      console.error('대시보드 데이터 로드 실패:', error);
      // 목 데이터 사용
      setStats({
        totalTasks: 25,
        totalProjects: 8,
        totalUsers: 12,
        completedTasks: 8,
        inProgressTasks: 12,
        pendingTasks: 5
      });
      
      setRecentTasks([
        { id: 1, title: '사용자 인증 시스템 구현', status: 'IN_PROGRESS', assignee: '김개발' },
        { id: 2, title: '데이터베이스 설계 검토', status: 'REVIEW', assignee: '이디자인' },
        { id: 3, title: 'API 문서 작성', status: 'TODO', assignee: '박문서' }
      ]);

      setRecentProjects([
        { id: 1, name: '웹 애플리케이션 개발', status: 'IN_PROGRESS', progress: 60 },
        { id: 2, name: '데이터베이스 설계', status: 'PLANNING', progress: 20 },
        { id: 3, name: 'API 개발', status: 'IN_PROGRESS', progress: 45 }
      ]);
    } finally {
      setLoading(false);
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

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '미정';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
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
        <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
        
        {/* 통계 카드 */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">전체 업무</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">완료된 업무</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.completedTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">진행중 업무</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.inProgressTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">대기 업무</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FolderIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">전체 프로젝트</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalProjects}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UsersIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">전체 사용자</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 및 상세 정보 */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 최근 업무 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                최근 업무 현황
              </h3>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        담당자: {task.assignee || '미지정'}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 최근 프로젝트 */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                최근 프로젝트 현황
              </h3>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.name}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-2">
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
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 요약 정보 */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              시스템 요약
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{stats.totalTasks}</div>
                <div className="text-sm text-gray-500">총 업무 수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalProjects}</div>
                <div className="text-sm text-gray-500">총 프로젝트 수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                <div className="text-sm text-gray-500">총 사용자 수</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
