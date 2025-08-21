import { apiCall } from '../api/api';

export const userAPI = {
  // 사용자 목록 조회
  getAll: () => apiCall('GET', '/users'),
  
  // 사용자 상세 조회
  getById: (id) => apiCall('GET', `/users/${id}`),
  
  // 사용자 생성
  create: (userData) => apiCall('POST', '/users', userData),
  
  // 사용자 수정
  update: (id, userData) => apiCall('PUT', `/users/${id}`, userData),
  
  // 사용자 삭제
  delete: (id) => apiCall('DELETE', `/users/${id}`),
  
  // 사용자명으로 검색
  searchByUsername: (username) => apiCall('GET', `/users/search?username=${username}`)
};
