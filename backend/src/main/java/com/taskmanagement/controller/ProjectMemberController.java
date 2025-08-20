package com.taskmanagement.controller;

import com.taskmanagement.entity.ProjectMember;
import com.taskmanagement.service.ProjectMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-members")
@CrossOrigin(origins = "*")
public class ProjectMemberController {
    
    @Autowired
    private ProjectMemberService projectMemberService;
    
    // 프로젝트별 팀원 조회
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectMember>> getProjectMembers(@PathVariable Long projectId) {
        List<ProjectMember> members = projectMemberService.getMembersByProjectId(projectId);
        return ResponseEntity.ok(members);
    }
    
    // 사용자별 프로젝트 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectMember>> getUserProjects(@PathVariable Long userId) {
        List<ProjectMember> projects = projectMemberService.getProjectsByUserId(userId);
        return ResponseEntity.ok(projects);
    }
    
    // 팀원 추가
    @PostMapping
    public ResponseEntity<ProjectMember> addProjectMember(@RequestBody ProjectMember projectMember) {
        ProjectMember addedMember = projectMemberService.addProjectMember(projectMember);
        return ResponseEntity.ok(addedMember);
    }
    
    // 팀원 역할 변경
    @PutMapping("/{id}/role")
    public ResponseEntity<ProjectMember> updateMemberRole(
            @PathVariable Long id,
            @RequestParam String role) {
        
        ProjectMember updatedMember = projectMemberService.updateMemberRole(id, role);
        if (updatedMember != null) {
            return ResponseEntity.ok(updatedMember);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 팀원 제거
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeProjectMember(@PathVariable Long id) {
        boolean removed = projectMemberService.removeProjectMember(id);
        if (removed) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // 프로젝트 팀원 통계
    @GetMapping("/stats/project/{projectId}")
    public ResponseEntity<?> getProjectMemberStats(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectMemberService.getProjectMemberStats(projectId));
    }
}
