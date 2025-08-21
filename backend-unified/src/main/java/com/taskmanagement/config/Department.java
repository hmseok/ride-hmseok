package com.taskmanagement.config;

public enum Department {
    // 데이터베이스에 정의된 값들 (정확히 일치)
    CX_TEAM("CX_TEAM"),
    ACCIDENT_TEAM("ACCIDENT_TEAM"),
    LEGAL_INSPECTION_TEAM("LEGAL_INSPECTION_TEAM"),
    PATROL_MAINTENANCE_TEAM("PATROL_MAINTENANCE_TEAM"),
    COMMON("COMMON"),
    ALL("ALL");
    
    private final String displayName;
    
    Department(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public static Department fromString(String text) {
        for (Department dept : Department.values()) {
            if (dept.name().equalsIgnoreCase(text) || dept.displayName.equals(text)) {
                return dept;
            }
        }
        // 데이터베이스에 있는 값이 enum에 없을 경우 COMMON으로 반환
        return COMMON;
    }
}
