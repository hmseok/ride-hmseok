package com.taskmanagement.repository;

import com.taskmanagement.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    
    // 정렬 순서대로 모든 메뉴 조회
    List<Menu> findAllByOrderBySortOrderAsc();
    
    // 활성이고 가시적인 메뉴만 정렬 순서대로 조회
    List<Menu> findByIsActiveTrueAndIsVisibleTrueOrderBySortOrderAsc();
    
    // 부모 ID로 하위 메뉴 조회
    List<Menu> findByParentIdOrderBySortOrderAsc(Long parentId);
    
    // 최상위 메뉴만 조회 (parentId가 null)
    List<Menu> findByParentIdIsNullOrderBySortOrderAsc();
    
    // 역할별 메뉴 조회
    List<Menu> findByRequiredRoleOrderBySortOrderAsc(String requiredRole);
    
    // 권한별 메뉴 조회
    List<Menu> findByRequiredPermissionOrderBySortOrderAsc(String requiredPermission);
    
    // 최대 정렬 순서 조회
    @Query("SELECT MAX(m.sortOrder) FROM Menu m")
    Integer findMaxSortOrder();
    
    // 활성 메뉴 수 조회
    long countByIsActiveTrue();
    
    // 가시적 메뉴 수 조회
    long countByIsVisibleTrue();
}
