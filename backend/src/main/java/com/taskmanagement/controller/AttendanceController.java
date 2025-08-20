package com.taskmanagement.controller;

import com.taskmanagement.entity.Attendance;
import com.taskmanagement.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {
    
    @Autowired
    private AttendanceService attendanceService;
    
    // 출근 체크
    @PostMapping("/check-in")
    public ResponseEntity<Attendance> checkIn(@RequestParam Long userId) {
        Attendance attendance = attendanceService.checkIn(userId);
        return ResponseEntity.ok(attendance);
    }
    
    // 퇴근 체크
    @PostMapping("/check-out")
    public ResponseEntity<Attendance> checkOut(@RequestParam Long userId) {
        Attendance attendance = attendanceService.checkOut(userId);
        return ResponseEntity.ok(attendance);
    }
    
    // 사용자별 근태 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Attendance>> getUserAttendance(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        if (startDate == null) startDate = LocalDate.now().minusDays(30);
        if (endDate == null) endDate = LocalDate.now();
        
        List<Attendance> attendance = attendanceService.getUserAttendance(userId, startDate, endDate);
        return ResponseEntity.ok(attendance);
    }
    
    // 부서별 근태 조회
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Attendance>> getDepartmentAttendance(
            @PathVariable String department,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        List<Attendance> attendance = attendanceService.getDepartmentAttendance(department, date);
        return ResponseEntity.ok(attendance);
    }
    
    // 근태 수정
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {
        
        Attendance updated = attendanceService.updateAttendance(id, attendance);
        return ResponseEntity.ok(updated);
    }
    
    // 근태 통계
    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getAttendanceStats(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        return ResponseEntity.ok(attendanceService.getAttendanceStats(userId, startDate, endDate));
    }
}
