package com.taskmanagement.repository;

import com.taskmanagement.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    
    // 프로젝트별 팀원 조회
    List<ProjectMember> findByProjectId(Long projectId);
    
    // 사용자별 프로젝트 조회
    List<ProjectMember> findByUserId(Long userId);
    
    // 활성 팀원만 조회
    List<ProjectMember> findByProjectIdAndIsActiveTrue(Long projectId);
    
    // 역할별 팀원 조회
    List<ProjectMember> findByProjectIdAndRole(Long projectId, ProjectMember.ProjectRole role);
    
    // 프로젝트와 사용자로 특정 팀원 조회
    ProjectMember findByProjectIdAndUserId(Long projectId, Long userId);
}
