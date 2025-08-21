import { apiCall } from '../api/api';

export const taskAPI = {
  // 업무 목록 조회
  getAll: () => apiCall('GET', '/tasks'),
  
  // 업무 상세 조회
  getById: (id) => apiCall('GET', `/tasks/${id}`),
  
  // 업무 생성
  create: (taskData) => apiCall('POST', '/tasks', taskData),
  
  // 업무 수정
  update: (id, taskData) => apiCall('PUT', `/tasks/${id}`, taskData),
  
  // 업무 삭제
  delete: (id) => apiCall('DELETE', `/tasks/${id}`),
  
  // 부서별 업무 조회
  getByDepartment: (department) => apiCall('GET', `/tasks/department/${department}`),
  
  // 상태별 업무 조회
  getByStatus: (status) => apiCall('GET', `/tasks/status/${status}`),
  
  // 사용자별 할당 업무 조회
  getByAssignee: (userId) => apiCall('GET', `/tasks/assignee/${userId}`)
};
