import React, { useState, useEffect } from 'react';
import { ClockIcon, CalendarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Attendance = () => {
  const [currentUser, setCurrentUser] = useState({ id: 1, name: '전소현' }); // 임시 사용자
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState({});
  const [departmentAttendance, setDepartmentAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodayAttendance();
    fetchMonthlyStats();
    fetchDepartmentAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      setLoading(true);
      // 실제 API 호출로 대체
      const response = await fetch(`/api/attendance/user/${currentUser.id}?startDate=${new Date().toISOString().split('T')[0]}&endDate=${new Date().toISOString().split('T')[0]}`);
      if (response.ok) {
        const data = await response.json();
        setTodayAttendance(data[0] || null);
      }
    } catch (error) {
      console.error('오늘 근태 조회 실패:', error);
      // 목 데이터 사용
      setTodayAttendance({
        id: 1,
        userId: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        checkInTime: null,
        checkOutTime: null,
        status: 'ABSENT',
        workHours: 0,
        overtimeHours: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyStats = async () => {
    try {
      const response = await fetch(`/api/attendance/stats/${currentUser.id}?startDate=${new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]}&endDate=${new Date().toISOString().split('T')[0]}`);
      if (response.ok) {
        const data = await response.json();
        setMonthlyStats(data);
      }
    } catch (error) {
      console.error('월별 통계 조회 실패:', error);
      // 목 데이터 사용
      setMonthlyStats({
        totalDays: 22,
        presentDays: 20,
        absentDays: 1,
        lateDays: 1,
        totalWorkHours: 160.5,
        totalOvertimeHours: 8.5,
        attendanceRate: 90.9
      });
    }
  };

  const fetchDepartmentAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance/department/CX_TEAM?date=${new Date().toISOString().split('T')[0]}`);
      if (response.ok) {
        const data = await response.json();
        setDepartmentAttendance(data);
      }
    } catch (error) {
      console.error('부서 근태 조회 실패:', error);
      // 목 데이터 사용
      setDepartmentAttendance([
        { userId: 1, fullName: '전소현', status: 'PRESENT', checkInTime: '09:00', checkOutTime: '18:00' },
        { userId: 2, fullName: '최지광', status: 'PRESENT', checkInTime: '08:55', checkOutTime: '18:05' },
        { userId: 3, fullName: '이선건', status: 'LATE', checkInTime: '09:15', checkOutTime: null },
        { userId: 4, fullName: '이미도', status: 'ABSENT', checkInTime: null, checkOutTime: null },
        { userId: 5, fullName: '임성민', status: 'PRESENT', checkInTime: '09:02', checkOutTime: '18:00' }
      ]);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await fetch('/api/attendance/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userId=${currentUser.id}`
      });
      
      if (response.ok) {
        fetchTodayAttendance();
        alert('출근 체크되었습니다!');
      }
    } catch (error) {
      console.error('출근 체크 실패:', error);
      alert('출근 체크에 실패했습니다.');
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await fetch('/api/attendance/check-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userId=${currentUser.id}`
      });
      
      if (response.ok) {
        fetchTodayAttendance();
        alert('퇴근 체크되었습니다!');
      }
    } catch (error) {
      console.error('퇴근 체크 실패:', error);
      alert('퇴근 체크에 실패했습니다.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800';
      case 'ABSENT': return 'bg-red-100 text-red-800';
      case 'LATE': return 'bg-yellow-100 text-yellow-800';
      case 'EARLY_LEAVE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PRESENT': return '출근';
      case 'ABSENT': return '결근';
      case 'LATE': return '지각';
      case 'EARLY_LEAVE': return '조퇴';
      default: return status;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">근태 관리</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleCheckIn}
              disabled={todayAttendance?.checkInTime}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                todayAttendance?.checkInTime 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              <ClockIcon className="h-4 w-4 mr-2" />
              출근 체크
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!todayAttendance?.checkInTime || todayAttendance?.checkOutTime}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !todayAttendance?.checkInTime || todayAttendance?.checkOutTime
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              <ClockIcon className="h-4 w-4 mr-2" />
              퇴근 체크
            </button>
          </div>
        </div>

        {/* 오늘 근태 현황 */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">오늘 근태 현황</h2>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
          ) : todayAttendance ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {todayAttendance.checkInTime ? new Date(todayAttendance.checkInTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </div>
                <div className="text-sm text-gray-500">출근 시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {todayAttendance.checkOutTime ? new Date(todayAttendance.checkOutTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </div>
                <div className="text-sm text-gray-500">퇴근 시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {todayAttendance.workHours ? `${todayAttendance.workHours.toFixed(1)}h` : '--'}
                </div>
                <div className="text-sm text-gray-500">근무 시간</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">근태 정보가 없습니다.</div>
          )}
        </div>

        {/* 월별 통계 */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">이번 달 근태 통계</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.presentDays || 0}</div>
              <div className="text-sm text-gray-500">출근일</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{monthlyStats.absentDays || 0}</div>
              <div className="text-sm text-gray-500">결근일</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.totalWorkHours || 0}h</div>
              <div className="text-sm text-gray-500">총 근무시간</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{monthlyStats.attendanceRate || 0}%</div>
              <div className="text-sm text-gray-500">출근률</div>
            </div>
          </div>
        </div>

        {/* 부서별 근태 현황 */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">부서별 근태 현황 (오늘)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출근시간</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">퇴근시간</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentAttendance.map((attendance) => (
                  <tr key={attendance.userId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {attendance.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendance.status)}`}>
                        {getStatusText(attendance.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.checkInTime || '--'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.checkOutTime || '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
