package com.taskmanagement.repository;

import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.Project.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByCreatedById(Long createdById);
    
    List<Project> findByStatus(ProjectStatus status);
    
    List<Project> findByNameContaining(String name);
    
    List<Project> findByCreatedByIdAndStatus(Long createdById, ProjectStatus status);
}
