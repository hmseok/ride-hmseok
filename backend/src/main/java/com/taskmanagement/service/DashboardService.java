package com.taskmanagement.service;

import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalTasks = taskRepository.count();
        long totalProjects = projectRepository.count();
        long totalUsers = userRepository.count();
        
        stats.put("totalTasks", totalTasks);
        stats.put("totalProjects", totalProjects);
        stats.put("totalUsers", totalUsers);
        
        return stats;
    }
    
    public Map<String, Object> getRecentTasks() {
        Map<String, Object> recentTasks = new HashMap<>();
        // 최근 업무 목록을 반환하는 로직
        recentTasks.put("recentTasks", taskRepository.findAll());
        return recentTasks;
    }
    
    public Map<String, Object> getProjectProgress() {
        Map<String, Object> projectProgress = new HashMap<>();
        // 프로젝트 진행 상황을 반환하는 로직
        projectProgress.put("projectProgress", projectRepository.findAll());
        return projectProgress;
    }
    
    public Map<String, Object> getUserWorkload() {
        Map<String, Object> userWorkload = new HashMap<>();
        // 사용자별 업무량을 반환하는 로직
        userWorkload.put("userWorkload", userRepository.findAll());
        return userWorkload;
    }
}
