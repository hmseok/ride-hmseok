const API_BASE_URL = 'http://localhost:8080/api';

// 공통 API 호출 함수
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

// 대시보드 API
export const dashboardAPI = {
  getStats: () => apiCall('/dashboard/stats'),
  getRecentTasks: () => apiCall('/dashboard/recent-tasks'),
  getProjectProgress: () => apiCall('/dashboard/project-progress'),
  getUserWorkload: () => apiCall('/dashboard/user-workload'),
};

// 업무 API
export const taskAPI = {
  getAll: () => apiCall('/tasks'),
  getById: (id) => apiCall(`/tasks/${id}`),
  create: (task) => apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  }),
  update: (id, task) => apiCall(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  }),
  delete: (id) => apiCall(`/tasks/${id}`, {
    method: 'DELETE',
  }),
  getByUser: (userId) => apiCall(`/tasks/user/${userId}`),
  getByProject: (projectId) => apiCall(`/tasks/project/${projectId}`),
  getByStatus: (status) => apiCall(`/tasks/status/${status}`),
  updateStatus: (id, status) => apiCall(`/tasks/${id}/status?status=${status}`, {
    method: 'PUT',
  }),
};

// 프로젝트 API
export const projectAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (project) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  update: (id, project) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  }),
  delete: (id) => apiCall(`/projects/${id}`, {
    method: 'DELETE',
  }),
  getByUser: (userId) => apiCall(`/projects/user/${userId}`),
  getByStatus: (status) => apiCall(`/projects/status/${status}`),
  updateStatus: (id, status) => apiCall(`/projects/${id}/status?status=${status}`, {
    method: 'PUT',
  }),
};

// 사용자 API
export const userAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (user) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id, user) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
  delete: (id) => apiCall(`/users/${id}`, {
    method: 'DELETE',
  }),
  search: (keyword) => apiCall(`/users/search?keyword=${encodeURIComponent(keyword)}`),
};
