const API_BASE_URL = 'http://13.209.66.37:8080/api';

// 공통 API 호출 함수
export const apiCall = async (method, endpoint, data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

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
  getStats: () => apiCall('GET', '/dashboard/stats'),
  getRecentTasks: () => apiCall('GET', '/dashboard/recent-tasks'),
  getProjectProgress: () => apiCall('GET', '/dashboard/project-progress'),
  getUserWorkload: () => apiCall('GET', '/dashboard/user-workload'),
};

// 업무 API
export const taskAPI = {
  getAll: () => apiCall('GET', '/tasks'),
  getById: (id) => apiCall('GET', `/tasks/${id}`),
  create: (task) => apiCall('POST', '/tasks', task),
  update: (id, task) => apiCall('PUT', `/tasks/${id}`, task),
  delete: (id) => apiCall('DELETE', `/tasks/${id}`),
  getByUser: (userId) => apiCall('GET', `/tasks/user/${userId}`),
  getByProject: (projectId) => apiCall('GET', `/tasks/project/${projectId}`),
  getByStatus: (status) => apiCall('GET', `/tasks/status/${status}`),
  updateStatus: (id, status) => apiCall('PUT', `/tasks/${id}/status?status=${status}`),
};

// 프로젝트 API
export const projectAPI = {
  getAll: () => apiCall('GET', '/projects'),
  getById: (id) => apiCall('GET', `/projects/${id}`),
  create: (project) => apiCall('POST', '/projects', project),
  update: (id, project) => apiCall('PUT', `/projects/${id}`, project),
  delete: (id) => apiCall('DELETE', `/projects/${id}`),
  getByUser: (userId) => apiCall('GET', `/projects/user/${userId}`),
  getByStatus: (status) => apiCall('GET', `/projects/status/${status}`),
  updateStatus: (id, status) => apiCall('PUT', `/projects/${id}/status?status=${status}`),
};

// 사용자 API
export const userAPI = {
  getAll: () => apiCall('GET', '/users'),
  getById: (id) => apiCall('GET', `/users/${id}`),
  create: (user) => apiCall('POST', '/users', user),
  update: (id, user) => apiCall('PUT', `/users/${id}`, user),
  delete: (id) => apiCall('DELETE', `/users/${id}`),
  search: (keyword) => apiCall('GET', `/users/search?keyword=${encodeURIComponent(keyword)}`),
};
