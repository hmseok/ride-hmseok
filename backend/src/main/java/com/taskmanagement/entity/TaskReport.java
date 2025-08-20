package com.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "task_reports")
public class TaskReport {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "task_id", nullable = false)
    private Long taskId;
    
    @Column(name = "reporter_id", nullable = false)
    private Long reporterId;
    
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "report_type")
    private ReportType reportType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReportStatus status;
    
    @Column(name = "attachments")
    private String attachments; // JSON 형태로 파일 정보 저장
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum ReportType {
        PROGRESS("진행상황"),
        ISSUE("이슈"),
        COMPLETION("완료"),
        REVIEW("검토"),
        OTHER("기타");
        
        private final String displayName;
        
        ReportType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    public enum ReportStatus {
        DRAFT("초안"),
        SUBMITTED("제출됨"),
        REVIEWED("검토됨"),
        APPROVED("승인됨"),
        REJECTED("반려됨");
        
        private final String displayName;
        
        ReportStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Constructors
    public TaskReport() {}
    
    public TaskReport(Long taskId, Long reporterId, String title, String content, ReportType reportType) {
        this.taskId = taskId;
        this.reporterId = reporterId;
        this.title = title;
        this.content = content;
        this.reportType = reportType;
        this.status = ReportStatus.DRAFT;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }
    
    public Long getReporterId() { return reporterId; }
    public void setReporterId(Long reporterId) { this.reporterId = reporterId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public ReportType getReportType() { return reportType; }
    public void setReportType(ReportType reportType) { this.reportType = reportType; }
    
    public ReportStatus getStatus() { return status; }
    public void setStatus(ReportStatus status) { this.status = status; }
    
    public String getAttachments() { return attachments; }
    public void setAttachments(String attachments) { this.attachments = attachments; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
