package com.taskmanagement.service;

import com.taskmanagement.entity.Attendance;
import com.taskmanagement.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AttendanceService {
    
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    // 출근 체크
    public Attendance checkIn(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();
        
        // 오늘 근태 기록이 있는지 확인
        Optional<Attendance> existing = attendanceRepository.findByUserIdAndDate(userId, today);
        
        if (existing.isPresent()) {
            Attendance attendance = existing.get();
            attendance.setCheckInTime(now);
            attendance.setStatus(Attendance.AttendanceStatus.PRESENT);
            attendance.setUpdatedAt(now);
            return attendanceRepository.save(attendance);
        } else {
            // 새 근태 기록 생성
            Attendance attendance = new Attendance(userId, today);
            attendance.setCheckInTime(now);
            attendance.setStatus(Attendance.AttendanceStatus.PRESENT);
            return attendanceRepository.save(attendance);
        }
    }
    
    // 퇴근 체크
    public Attendance checkOut(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();
        
        Optional<Attendance> existing = attendanceRepository.findByUserIdAndDate(userId, today);
        
        if (existing.isPresent()) {
            Attendance attendance = existing.get();
            attendance.setCheckOutTime(now);
            
            // 근무 시간 계산
            if (attendance.getCheckInTime() != null) {
                double workHours = ChronoUnit.MINUTES.between(attendance.getCheckInTime(), now) / 60.0;
                attendance.setWorkHours(workHours);
                
                // 초과 근무 시간 계산 (8시간 기준)
                if (workHours > 8.0) {
                    attendance.setOvertimeHours(workHours - 8.0);
                }
            }
            
            attendance.setUpdatedAt(now);
            return attendanceRepository.save(attendance);
        }
        
        return null;
    }
    
    // 사용자별 근태 조회
    public List<Attendance> getUserAttendance(Long userId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByUserIdAndDateBetweenOrderByDateDesc(userId, startDate, endDate);
    }
    
    // 부서별 근태 조회
    public List<Attendance> getDepartmentAttendance(String department, LocalDate date) {
        return attendanceRepository.findByDepartmentAndDate(department, date);
    }
    
    // 근태 수정
    public Attendance updateAttendance(Long id, Attendance attendanceData) {
        Optional<Attendance> existing = attendanceRepository.findById(id);
        
        if (existing.isPresent()) {
            Attendance attendance = existing.get();
            attendance.setCheckInTime(attendanceData.getCheckInTime());
            attendance.setCheckOutTime(attendanceData.getCheckOutTime());
            attendance.setStatus(attendanceData.getStatus());
            attendance.setNote(attendanceData.getNote());
            attendance.setUpdatedAt(LocalDateTime.now());
            
            return attendanceRepository.save(attendance);
        }
        
        return null;
    }
    
    // 근태 통계
    public Map<String, Object> getAttendanceStats(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Attendance> attendanceList = getUserAttendance(userId, startDate, endDate);
        
        Map<String, Object> stats = new HashMap<>();
        int totalDays = 0;
        int presentDays = 0;
        int absentDays = 0;
        int lateDays = 0;
        double totalWorkHours = 0.0;
        double totalOvertimeHours = 0.0;
        
        for (Attendance attendance : attendanceList) {
            totalDays++;
            
            switch (attendance.getStatus()) {
                case PRESENT:
                    presentDays++;
                    break;
                case ABSENT:
                    absentDays++;
                    break;
                case LATE:
                    lateDays++;
                    break;
            }
            
            if (attendance.getWorkHours() != null) {
                totalWorkHours += attendance.getWorkHours();
            }
            
            if (attendance.getOvertimeHours() != null) {
                totalOvertimeHours += attendance.getOvertimeHours();
            }
        }
        
        stats.put("totalDays", totalDays);
        stats.put("presentDays", presentDays);
        stats.put("absentDays", absentDays);
        stats.put("lateDays", lateDays);
        stats.put("totalWorkHours", totalWorkHours);
        stats.put("totalOvertimeHours", totalOvertimeHours);
        stats.put("attendanceRate", totalDays > 0 ? (double) presentDays / totalDays * 100 : 0);
        
        return stats;
    }
}
