package com.taskmanagement.service;

import com.taskmanagement.entity.Task;
import com.taskmanagement.entity.Task.TaskStatus;
import com.taskmanagement.entity.User.Department;
import com.taskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.orElse(null);
    }
    
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    
    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            Task existingTask = task.get();
            existingTask.setTitle(taskDetails.getTitle());
            existingTask.setDescription(taskDetails.getDescription());
            existingTask.setStatus(taskDetails.getStatus());
            existingTask.setPriority(taskDetails.getPriority());
            existingTask.setAssignee(taskDetails.getAssignee());
            existingTask.setProject(taskDetails.getProject());
            existingTask.setDueDate(taskDetails.getDueDate());
            return taskRepository.save(existingTask);
        }
        return null;
    }
    
    public boolean deleteTask(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssigneeId(userId);
    }
    
    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
    
    public List<Task> getTasksByStatus(String status) {
        try {
            TaskStatus taskStatus = TaskStatus.valueOf(status.toUpperCase());
            return taskRepository.findByStatus(taskStatus);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public Task updateTaskStatus(Long id, String status) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            try {
                TaskStatus taskStatus = TaskStatus.valueOf(status.toUpperCase());
                Task existingTask = task.get();
                existingTask.setStatus(taskStatus);
                return taskRepository.save(existingTask);
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }
    
    public List<Task> getTasksByDepartment(String department) {
        try {
            Department dept = Department.valueOf(department.toUpperCase());
            return taskRepository.findByDepartment(dept);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public List<Task> getTasksByDepartmentAndStatus(String department, String status) {
        try {
            Department dept = Department.valueOf(department.toUpperCase());
            TaskStatus taskStatus = TaskStatus.valueOf(status.toUpperCase());
            return taskRepository.findByDepartmentAndStatus(dept, taskStatus);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
}
