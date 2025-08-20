package com.taskmanagement.controller;

import com.taskmanagement.entity.UserMenuPermission;
import com.taskmanagement.service.UserMenuPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-menu-permissions")
@CrossOrigin(origins = "*")
public class UserMenuPermissionController {
    
    @Autowired
    private UserMenuPermissionService userMenuPermissionService;
    
    // 사용자별 메뉴 권한 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserMenuPermission>> getUserMenuPermissions(@PathVariable Long userId) {
        List<UserMenuPermission> permissions = userMenuPermissionService.getUserMenuPermissions(userId);
        return ResponseEntity.ok(permissions);
    }
    
    // 메뉴별 사용자 권한 조회
    @GetMapping("/menu/{menuId}")
    public ResponseEntity<List<UserMenuPermission>> getMenuUserPermissions(@PathVariable Long menuId) {
        List<UserMenuPermission> permissions = userMenuPermissionService.getMenuUserPermissions(menuId);
        return ResponseEntity.ok(permissions);
    }
    
    // 사용자별 메뉴 권한 일괄 설정
    @PostMapping("/user/{userId}/bulk")
    public ResponseEntity<?> setUserMenuPermissions(
            @PathVariable Long userId,
            @RequestBody List<UserMenuPermission> permissions) {
        
        userMenuPermissionService.setUserMenuPermissions(userId, permissions);
        return ResponseEntity.ok().build();
    }
    
    // 개별 권한 설정
    @PostMapping
    public ResponseEntity<UserMenuPermission> createPermission(@RequestBody UserMenuPermission permission) {
        UserMenuPermission createdPermission = userMenuPermissionService.createPermission(permission);
        return ResponseEntity.ok(createdPermission);
    }
    
    // 권한 수정
    @PutMapping("/{id}")
    public ResponseEntity<UserMenuPermission> updatePermission(
            @PathVariable Long id,
            @RequestBody UserMenuPermission permission) {
        
        UserMenuPermission updatedPermission = userMenuPermissionService.updatePermission(id, permission);
        if (updatedPermission != null) {
            return ResponseEntity.ok(updatedPermission);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 권한 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable Long id) {
        boolean deleted = userMenuPermissionService.deletePermission(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // 사용자별 메뉴 순서 설정
    @PutMapping("/user/{userId}/order")
    public ResponseEntity<?> setUserMenuOrder(
            @PathVariable Long userId,
            @RequestBody Map<Long, Integer> menuOrders) {
        
        userMenuPermissionService.setUserMenuOrder(userId, menuOrders);
        return ResponseEntity.ok().build();
    }
    
    // 사용자별 메뉴 가시성 설정
    @PutMapping("/user/{userId}/visibility")
    public ResponseEntity<?> setUserMenuVisibility(
            @PathVariable Long userId,
            @RequestBody Map<Long, Boolean> menuVisibility) {
        
        userMenuPermissionService.setUserMenuVisibility(userId, menuVisibility);
        return ResponseEntity.ok().build();
    }
    
    // 권한 복사 (다른 사용자에게)
    @PostMapping("/copy")
    public ResponseEntity<?> copyPermissions(
            @RequestParam Long fromUserId,
            @RequestParam Long toUserId) {
        
        userMenuPermissionService.copyPermissions(fromUserId, toUserId);
        return ResponseEntity.ok().build();
    }
}
