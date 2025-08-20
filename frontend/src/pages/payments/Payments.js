import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchPayments();
    fetchPaymentStats();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        // 목 데이터 사용
        setPayments([
          {
            id: 1,
            userId: 1,
            amount: 50000,
            currency: 'KRW',
            paymentMethod: 'CREDIT_CARD',
            status: 'COMPLETED',
            description: '월 구독료',
            referenceNumber: 'REF001',
            paymentDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            userId: 2,
            amount: 30000,
            currency: 'KRW',
            paymentMethod: 'BANK_TRANSFER',
            status: 'PENDING',
            description: '프로젝트 비용',
            referenceNumber: 'REF002',
            paymentDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('결제 목록 로드 실패:', error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentStats = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payments/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setStats({
          totalAmount: 80000,
          totalCount: 2,
          completedCount: 1,
          pendingCount: 1,
          failedCount: 0,
          successRate: 50.0
        });
      }
    } catch (error) {
      console.error('결제 통계 로드 실패:', error);
    }
  };

  const handleCancelPayment = async (paymentId) => {
    if (window.confirm('정말로 이 결제를 취소하시겠습니까?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/payments/${paymentId}/cancel`, {
          method: 'POST'
        });
        
        if (response.ok) {
          // 결제 목록 새로고침
          fetchPayments();
          fetchPaymentStats();
          alert('결제가 취소되었습니다.');
        } else {
          alert('결제 취소에 실패했습니다.');
        }
      } catch (error) {
        console.error('결제 취소 실패:', error);
        alert('결제 취소에 실패했습니다.');
      }
    }
  };

  const filterPayments = () => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    if (methodFilter !== 'ALL') {
      filtered = filtered.filter(payment => payment.paymentMethod === methodFilter);
    }

    setFilteredPayments(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      case 'REFUNDED': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'CREDIT_CARD': return 'bg-blue-100 text-blue-800';
      case 'BANK_TRANSFER': return 'bg-green-100 text-green-800';
      case 'CASH': return 'bg-yellow-100 text-yellow-800';
      case 'DIGITAL_WALLET': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplayName = (status) => {
    switch (status) {
      case 'COMPLETED': return '완료';
      case 'PENDING': return '대기';
      case 'PROCESSING': return '처리중';
      case 'FAILED': return '실패';
      case 'CANCELLED': return '취소';
      case 'REFUNDED': return '환불';
      default: return status;
    }
  };

  const getMethodDisplayName = (method) => {
    switch (method) {
      case 'CREDIT_CARD': return '신용카드';
      case 'BANK_TRANSFER': return '계좌이체';
      case 'CASH': return '현금';
      case 'DIGITAL_WALLET': return '전자지갑';
      default: return method;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
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
          <h1 className="text-2xl font-semibold text-gray-900">결제 관리</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            새 결제 등록
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCardIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">총 결제 금액</dt>
                    <dd className="text-lg font-medium text-gray-900">{formatAmount(stats.totalAmount || 0)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BanknotesIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">총 결제 건수</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalCount || 0}건</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">성공률</dt>
                    <dd className="text-lg font-medium text-gray-900">{(stats.successRate || 0).toFixed(1)}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">대기 중</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingCount || 0}건</dd>
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
                placeholder="결제 검색..."
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
            <option value="COMPLETED">완료</option>
            <option value="PENDING">대기</option>
            <option value="PROCESSING">처리중</option>
            <option value="FAILED">실패</option>
            <option value="CANCELLED">취소</option>
            <option value="REFUNDED">환불</option>
          </select>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="ALL">모든 방법</option>
            <option value="CREDIT_CARD">신용카드</option>
            <option value="BANK_TRANSFER">계좌이체</option>
            <option value="CASH">현금</option>
            <option value="DIGITAL_WALLET">전자지갑</option>
          </select>
        </div>

        {/* 결제 목록 */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <li key={payment.id}>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {payment.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {getStatusDisplayName(payment.status)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor(payment.paymentMethod)}`}>
                            {getMethodDisplayName(payment.paymentMethod)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>금액: {formatAmount(payment.amount)}</span>
                        <span className="mx-2">•</span>
                        <span>참조번호: {payment.referenceNumber}</span>
                        <span className="mx-2">•</span>
                        <span>결제일: {new Date(payment.paymentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingPayment(payment)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="편집"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleCancelPayment(payment.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="취소"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payments;
