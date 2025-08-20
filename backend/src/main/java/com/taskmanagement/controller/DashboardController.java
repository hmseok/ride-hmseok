package com.taskmanagement.controller;

import com.taskmanagement.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private DashboardService dashboardService;
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/recent-tasks")
    public ResponseEntity<Map<String, Object>> getRecentTasks() {
        Map<String, Object> recentTasks = dashboardService.getRecentTasks();
        return ResponseEntity.ok(recentTasks);
    }
    
    @GetMapping("/project-progress")
    public ResponseEntity<Map<String, Object>> getProjectProgress() {
        Map<String, Object> projectProgress = dashboardService.getProjectProgress();
        return ResponseEntity.ok(projectProgress);
    }
    
    @GetMapping("/user-workload")
    public ResponseEntity<Map<String, Object>> getUserWorkload() {
        Map<String, Object> userWorkload = dashboardService.getUserWorkload();
        return ResponseEntity.ok(userWorkload);
    }
}
