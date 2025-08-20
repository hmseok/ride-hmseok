package com.taskmanagement.repository;

import com.taskmanagement.entity.Task;
import com.taskmanagement.entity.Task.TaskStatus;
import com.taskmanagement.entity.User.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByAssigneeId(Long assigneeId);
    
    List<Task> findByProjectId(Long projectId);
    
    List<Task> findByStatus(TaskStatus status);
    
    List<Task> findByPriority(String priority);
    
    List<Task> findByAssigneeIdAndStatus(Long assigneeId, TaskStatus status);
    
    List<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status);
    
    List<Task> findByDepartment(Department department);
    
    List<Task> findByDepartmentAndStatus(Department department, TaskStatus status);
    
    List<Task> findByDepartmentAndAssigneeId(Department department, Long assigneeId);
}
