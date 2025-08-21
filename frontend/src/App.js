import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 페이지 컴포넌트들
import Dashboard from './pages/dashboard/Dashboard';
import Tasks from './pages/tasks/Tasks';
import Projects from './pages/projects/Projects';
import Users from './pages/users/Users';
import Attendance from './pages/attendance/Attendance';
import Payments from './pages/payments/Payments';
import Reports from './pages/reports/Reports';
import MenuManagement from './pages/menu-management/MenuManagement';

// 공통 컴포넌트들
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/users" element={<Users />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/menu-management" element={<MenuManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
