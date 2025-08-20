package com.taskmanagement.controller;

import com.taskmanagement.entity.Menu;
import com.taskmanagement.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "*")
public class MenuController {
    
    @Autowired
    private MenuService menuService;
    
    // 모든 메뉴 조회 (정렬 순서대로)
    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.getAllMenusOrdered();
        return ResponseEntity.ok(menus);
    }
    
    // 활성 메뉴만 조회
    @GetMapping("/active")
    public ResponseEntity<List<Menu>> getActiveMenus() {
        List<Menu> menus = menuService.getActiveMenus();
        return ResponseEntity.ok(menus);
    }
    
    // 사용자별 메뉴 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Menu>> getUserMenus(@PathVariable Long userId) {
        List<Menu> menus = menuService.getUserMenus(userId);
        return ResponseEntity.ok(menus);
    }
    
    // 새 메뉴 생성
    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        Menu createdMenu = menuService.createMenu(menu);
        return ResponseEntity.ok(createdMenu);
    }
    
    // 메뉴 수정
    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        Menu updatedMenu = menuService.updateMenu(id, menu);
        if (updatedMenu != null) {
            return ResponseEntity.ok(updatedMenu);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 메뉴 순서 변경
    @PutMapping("/{id}/order")
    public ResponseEntity<Menu> updateMenuOrder(
            @PathVariable Long id,
            @RequestParam Integer newOrder) {
        
        Menu updatedMenu = menuService.updateMenuOrder(id, newOrder);
        if (updatedMenu != null) {
            return ResponseEntity.ok(updatedMenu);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 메뉴 활성화/비활성화
    @PutMapping("/{id}/toggle-active")
    public ResponseEntity<Menu> toggleMenuActive(@PathVariable Long id) {
        Menu updatedMenu = menuService.toggleMenuActive(id);
        if (updatedMenu != null) {
            return ResponseEntity.ok(updatedMenu);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 메뉴 가시성 토글
    @PutMapping("/{id}/toggle-visible")
    public ResponseEntity<Menu> toggleMenuVisible(@PathVariable Long id) {
        Menu updatedMenu = menuService.toggleMenuVisible(id);
        if (updatedMenu != null) {
            return ResponseEntity.ok(updatedMenu);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 메뉴 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable Long id) {
        boolean deleted = menuService.deleteMenu(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // 메뉴 순서 일괄 업데이트
    @PutMapping("/reorder")
    public ResponseEntity<?> reorderMenus(@RequestBody List<Long> menuIds) {
        menuService.reorderMenus(menuIds);
        return ResponseEntity.ok().build();
    }
}
