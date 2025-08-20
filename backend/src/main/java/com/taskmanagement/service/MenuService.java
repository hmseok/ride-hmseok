package com.taskmanagement.service;

import com.taskmanagement.entity.Menu;
import com.taskmanagement.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    
    @Autowired
    private MenuRepository menuRepository;
    
    // 모든 메뉴 조회 (정렬 순서대로)
    public List<Menu> getAllMenusOrdered() {
        return menuRepository.findAllByOrderBySortOrderAsc();
    }
    
    // 활성 메뉴만 조회
    public List<Menu> getActiveMenus() {
        return menuRepository.findByIsActiveTrueAndIsVisibleTrueOrderBySortOrderAsc();
    }
    
    // 사용자별 메뉴 조회 (권한 기반)
    public List<Menu> getUserMenus(Long userId) {
        // 실제로는 UserMenuPermission과 조인하여 권한 체크
        return getActiveMenus();
    }
    
    // 새 메뉴 생성
    public Menu createMenu(Menu menu) {
        if (menu.getSortOrder() == null) {
            // 마지막 순서 + 1로 설정
            Integer maxOrder = menuRepository.findMaxSortOrder();
            menu.setSortOrder(maxOrder != null ? maxOrder + 1 : 1);
        }
        menu.setCreatedAt(LocalDateTime.now());
        menu.setUpdatedAt(LocalDateTime.now());
        return menuRepository.save(menu);
    }
    
    // 메뉴 수정
    public Menu updateMenu(Long id, Menu menuData) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();
            menu.setName(menuData.getName());
            menu.setDisplayName(menuData.getDisplayName());
            menu.setPath(menuData.getPath());
            menu.setIcon(menuData.getIcon());
            menu.setSortOrder(menuData.getSortOrder());
            menu.setParentId(menuData.getParentId());
            menu.setIsActive(menuData.getIsActive());
            menu.setIsVisible(menuData.getIsVisible());
            menu.setRequiredRole(menuData.getRequiredRole());
            menu.setRequiredPermission(menuData.getRequiredPermission());
            menu.setUpdatedAt(LocalDateTime.now());
            return menuRepository.save(menu);
        }
        return null;
    }
    
    // 메뉴 순서 변경
    public Menu updateMenuOrder(Long id, Integer newOrder) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();
            menu.setSortOrder(newOrder);
            menu.setUpdatedAt(LocalDateTime.now());
            return menuRepository.save(menu);
        }
        return null;
    }
    
    // 메뉴 활성화/비활성화 토글
    public Menu toggleMenuActive(Long id) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();
            menu.setIsActive(!menu.getIsActive());
            menu.setUpdatedAt(LocalDateTime.now());
            return menuRepository.save(menu);
        }
        return null;
    }
    
    // 메뉴 가시성 토글
    public Menu toggleMenuVisible(Long id) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();
            menu.setIsVisible(!menu.getIsVisible());
            menu.setUpdatedAt(LocalDateTime.now());
            return menuRepository.save(menu);
        }
        return null;
    }
    
    // 메뉴 삭제
    public boolean deleteMenu(Long id) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            menuRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // 메뉴 순서 일괄 업데이트
    public void reorderMenus(List<Long> menuIds) {
        for (int i = 0; i < menuIds.size(); i++) {
            Long menuId = menuIds.get(i);
            Optional<Menu> menuOpt = menuRepository.findById(menuId);
            if (menuOpt.isPresent()) {
                Menu menu = menuOpt.get();
                menu.setSortOrder(i + 1);
                menu.setUpdatedAt(LocalDateTime.now());
                menuRepository.save(menu);
            }
        }
    }
}
