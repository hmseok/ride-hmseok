import { apiCall } from '../api/api';

export const projectAPI = {
  // 프로젝트 목록 조회
  getAll: () => apiCall('GET', '/projects'),
  
  // 프로젝트 상세 조회
  getById: (id) => apiCall('GET', `/projects/${id}`),
  
  // 프로젝트 생성
  create: (projectData) => apiCall('POST', '/projects', projectData),
  
  // 프로젝트 수정
  update: (id, projectData) => apiCall('PUT', `/projects/${id}`, projectData),
  
  // 프로젝트 삭제
  delete: (id) => apiCall('DELETE', `/projects/${id}`),
  
  // 상태별 프로젝트 조회
  getByStatus: (status) => apiCall('GET', `/projects/status/${status}`),
  
  // 부서별 프로젝트 조회
  getByDepartment: (department) => apiCall('GET', `/projects/department/${department}`),
  
  // 진행률별 프로젝트 조회
  getByProgress: (minProgress, maxProgress) => apiCall('GET', `/projects/progress?min=${minProgress}&max=${maxProgress}`)
};
