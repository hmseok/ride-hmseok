package com.taskmanagement.service;

import com.taskmanagement.entity.ProjectMember;
import com.taskmanagement.repository.ProjectMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProjectMemberService {
    
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    
    // 프로젝트별 팀원 조회
    public List<ProjectMember> getMembersByProjectId(Long projectId) {
        return projectMemberRepository.findByProjectId(projectId);
    }
    
    // 사용자별 프로젝트 조회
    public List<ProjectMember> getProjectsByUserId(Long userId) {
        return projectMemberRepository.findByUserId(userId);
    }
    
    // 팀원 추가
    public ProjectMember addProjectMember(ProjectMember projectMember) {
        projectMember.setCreatedAt(LocalDateTime.now());
        projectMember.setUpdatedAt(LocalDateTime.now());
        if (projectMember.getAssignedDate() == null) {
            projectMember.setAssignedDate(LocalDateTime.now());
        }
        return projectMemberRepository.save(projectMember);
    }
    
    // 팀원 역할 변경
    public ProjectMember updateMemberRole(Long id, String role) {
        Optional<ProjectMember> memberOpt = projectMemberRepository.findById(id);
        if (memberOpt.isPresent()) {
            ProjectMember member = memberOpt.get();
            try {
                ProjectMember.ProjectRole projectRole = ProjectMember.ProjectRole.valueOf(role.toUpperCase());
                member.setRole(projectRole);
                member.setUpdatedAt(LocalDateTime.now());
                return projectMemberRepository.save(member);
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }
    
    // 팀원 제거
    public boolean removeProjectMember(Long id) {
        Optional<ProjectMember> memberOpt = projectMemberRepository.findById(id);
        if (memberOpt.isPresent()) {
            ProjectMember member = memberOpt.get();
            member.setIsActive(false);
            member.setUpdatedAt(LocalDateTime.now());
            projectMemberRepository.save(member);
            return true;
        }
        return false;
    }
    
    // 프로젝트 팀원 통계
    public Map<String, Object> getProjectMemberStats(Long projectId) {
        List<ProjectMember> members = getMembersByProjectId(projectId);
        
        Map<String, Object> stats = new HashMap<>();
        Map<String, Integer> roleCounts = new HashMap<>();
        int totalMembers = 0;
        int activeMembers = 0;
        
        for (ProjectMember member : members) {
            totalMembers++;
            if (member.getIsActive()) {
                activeMembers++;
            }
            
            String role = member.getRole().getDisplayName();
            roleCounts.put(role, roleCounts.getOrDefault(role, 0) + 1);
        }
        
        stats.put("totalMembers", totalMembers);
        stats.put("activeMembers", activeMembers);
        stats.put("roleCounts", roleCounts);
        
        return stats;
    }
}
