import { apiCall } from '../api/api';

export const paymentAPI = {
  // 결제 목록 조회
  getAll: () => apiCall('GET', '/payments'),
  
  // 결제 상세 조회
  getById: (id) => apiCall('GET', `/payments/${id}`),
  
  // 결제 생성
  create: (paymentData) => apiCall('POST', '/payments', paymentData),
  
  // 결제 수정
  update: (id, paymentData) => apiCall('PUT', `/payments/${id}`, paymentData),
  
  // 결제 삭제
  delete: (id) => apiCall('DELETE', `/payments/${id}`),
  
  // 사용자별 결제 조회
  getByUser: (userId) => apiCall('GET', `/payments/user/${userId}`),
  
  // 상태별 결제 조회
  getByStatus: (status) => apiCall('GET', `/payments/status/${status}`),
  
  // 결제 방법별 조회
  getByMethod: (method) => apiCall('GET', `/payments/method/${method}`)
};
