package com.taskmanagement.service;

import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.Project.ProjectStatus;
import com.taskmanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public Project getProjectById(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.orElse(null);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project projectDetails) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            Project existingProject = project.get();
            existingProject.setName(projectDetails.getName());
            existingProject.setDescription(projectDetails.getDescription());
            existingProject.setStatus(projectDetails.getStatus());
            existingProject.setStartDate(projectDetails.getStartDate());
            existingProject.setEndDate(projectDetails.getEndDate());
            return projectRepository.save(existingProject);
        }
        return null;
    }
    
    public boolean deleteProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Project> getProjectsByUser(Long userId) {
        return projectRepository.findByCreatedById(userId);
    }
    
    public List<Project> getProjectsByStatus(String status) {
        try {
            ProjectStatus projectStatus = ProjectStatus.valueOf(status.toUpperCase());
            return projectRepository.findByStatus(projectStatus);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public Project updateProjectStatus(Long id, String status) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            try {
                ProjectStatus projectStatus = ProjectStatus.valueOf(status.toUpperCase());
                Project existingProject = project.get();
                existingProject.setStatus(projectStatus);
                return projectRepository.save(existingProject);
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }
}
