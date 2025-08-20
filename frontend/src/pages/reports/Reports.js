import React, { useState, useEffect } from 'react';
import { ChartBarIcon, DocumentChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // 실제 API 호출로 대체
      const mockReports = [
        {
          id: 1,
          name: '월간 업무 현황 리포트',
          description: '이번 달 업무 진행 상황 및 완료율 분석',
          type: 'MONTHLY',
          generatedAt: '2024-01-31',
          status: 'COMPLETED'
        },
        {
          id: 2,
          name: '프로젝트 진행률 리포트',
          description: '각 프로젝트별 진행 상황 및 마감일 분석',
          type: 'PROJECT',
          generatedAt: '2024-01-30',
          status: 'COMPLETED'
        },
        {
          id: 3,
          name: '사용자별 업무량 분석',
          description: '팀원별 업무 분담 및 성과 분석',
          type: 'USER',
          generatedAt: '2024-01-29',
          status: 'COMPLETED'
        },
        {
          id: 4,
          name: '분기별 성과 리포트',
          description: '2024년 1분기 전체 성과 및 KPI 달성률',
          type: 'QUARTERLY',
          generatedAt: '2024-01-28',
          status: 'IN_PROGRESS'
        }
      ];
      setReports(mockReports);
    } catch (error) {
      console.error('리포트 목록 로드 실패:', error);
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'MONTHLY': return <CalendarIcon className="h-6 w-6 text-blue-500" />;
      case 'PROJECT': return <DocumentChartBarIcon className="h-6 w-6 text-green-500" />;
      case 'USER': return <ChartBarIcon className="h-6 w-6 text-purple-500" />;
      case 'QUARTERLY': return <CalendarIcon className="h-6 w-6 text-orange-500" />;
      default: return <DocumentChartBarIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getReportTypeName = (type) => {
    switch (type) {
      case 'MONTHLY': return '월간';
      case 'PROJECT': return '프로젝트';
      case 'USER': return '사용자';
      case 'QUARTERLY': return '분기';
      default: return type;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateReport = (reportType) => {
    // 실제 리포트 생성 로직
    console.log(`${reportType} 리포트 생성 요청`);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">리포트</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => generateReport('MONTHLY')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              월간 리포트 생성
            </button>
            <button
              onClick={() => generateReport('PROJECT')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              프로젝트 리포트 생성
            </button>
          </div>
        </div>

        {/* 리포트 생성 옵션 */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">월간 리포트</dt>
                    <dd className="text-lg font-medium text-gray-900">업무 현황</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => generateReport('MONTHLY')}
                  className="w-full bg-blue-50 border border-blue-300 rounded-md py-2 px-4 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentChartBarIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">프로젝트 리포트</dt>
                    <dd className="text-lg font-medium text-gray-900">진행률 분석</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => generateReport('PROJECT')}
                  className="w-full bg-green-50 border border-green-300 rounded-md py-2 px-4 text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">사용자 리포트</dt>
                    <dd className="text-lg font-medium text-gray-900">업무량 분석</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => generateReport('USER')}
                  className="w-full bg-purple-50 border border-purple-300 rounded-md py-2 px-4 text-sm font-medium text-purple-700 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">분기 리포트</dt>
                    <dd className="text-lg font-medium text-gray-900">성과 분석</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => generateReport('QUARTERLY')}
                  className="w-full bg-orange-50 border border-orange-300 rounded-md py-2 px-4 text-sm font-medium text-orange-700 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 생성된 리포트 목록 */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">생성된 리포트</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getReportTypeIcon(report.type)}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{report.name}</p>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              {report.status === 'COMPLETED' ? '완료' : '진행중'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{report.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>유형: {getReportTypeName(report.type)}</span>
                            <span className="mx-2">•</span>
                            <span>생성일: {report.generatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          다운로드
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                          삭제
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
    </div>
  );
};

export default Reports;
