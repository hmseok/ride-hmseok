package com.taskmanagement.task.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.taskmanagement.config.Department;
import com.taskmanagement.user.entity.User;
import com.taskmanagement.project.entity.Project;

@Entity
@Table(name = "tasks")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "group_type")
    private TaskGroupType groupType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    @JsonManagedReference
    private User assignee;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonManagedReference
    private Project project;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "department")
    private Department department;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;
    
    @Column(name = "estimated_hours")
    private Integer estimatedHours;
    
    @Column(name = "actual_hours")
    private Integer actualHours;
    
    @Column(name = "progress")
    private Integer progress;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // 데이터베이스와의 호환성을 위한 필드
    @Column(name = "user_id")
    private Long userId;
    
    public Task() {}
    
    public Task(String title, String description, TaskPriority priority, User assignee, Project project) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.assignee = assignee;
        this.project = project;
        this.status = TaskStatus.TODO;
        this.progress = 0;
        this.actualHours = 0;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = TaskStatus.TODO;
        if (priority == null) priority = TaskPriority.MEDIUM;
        if (groupType == null) groupType = TaskGroupType.MEDIUM;
        if (progress == null) progress = 0;
        if (actualHours == null) actualHours = 0;
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }
    
    public TaskPriority getPriority() { return priority; }
    public void setPriority(TaskPriority priority) { this.priority = priority; }
    
    public TaskGroupType getGroupType() { return groupType; }
    public void setGroupType(TaskGroupType groupType) { this.groupType = groupType; }
    
    public User getAssignee() { return assignee; }
    public void setAssignee(User assignee) { this.assignee = assignee; }
    
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
    
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
    
    public Integer getEstimatedHours() { return estimatedHours; }
    public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }
    
    public Integer getActualHours() { return actualHours; }
    public void setActualHours(Integer actualHours) { this.actualHours = actualHours; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public enum TaskStatus {
        TODO, IN_PROGRESS, REVIEW, DONE, CANCELLED
    }
    
    public enum TaskPriority {
        LOW, MEDIUM, HIGH, URGENT
    }
    
    public enum TaskGroupType {
        LARGE, MEDIUM, SMALL
    }
}
