-- 업무관리 시스템 데이터베이스 스키마
CREATE DATABASE IF NOT EXISTS task_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE task_management;

-- 사용자 테이블
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'USER') NOT NULL DEFAULT 'USER',
    department ENUM('CX_TEAM', 'ACCIDENT_TEAM', 'LEGAL_INSPECTION_TEAM', 'PATROL_MAINTENANCE_TEAM', 'COMMON', 'ALL') NOT NULL DEFAULT 'COMMON',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_department (department)
);

-- 프로젝트 테이블
CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PLANNING',
    created_by BIGINT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_created_by (created_by),
    INDEX idx_dates (start_date, end_date)
);

-- 업무 테이블
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'TODO',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
    assignee_id BIGINT,
    project_id BIGINT,
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assignee (assignee_id),
    INDEX idx_project (project_id),
    INDEX idx_due_date (due_date)
);

-- 리포트 테이블
CREATE TABLE reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    type ENUM('MONTHLY', 'PROJECT', 'USER', 'QUARTERLY') NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    file_path VARCHAR(500),
    generated_by BIGINT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_generated_by (generated_by)
);

-- 초기 데이터 삽입
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', '$2a$10$rQZ8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6', 'admin@company.com', '시스템 관리자', 'ADMIN'),
('manager1', '$2a$10$rQZ8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6', 'manager1@company.com', '프로젝트 매니저', 'MANAGER'),
('developer1', '$2a$10$rQZ8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6', 'dev1@company.com', '개발자1', 'USER'),
('designer1', '$2a$10$rQZ8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6', 'design1@company.com', '디자이너1', 'USER');

INSERT INTO projects (name, description, status, created_by, start_date, end_date) VALUES
('웹 애플리케이션 개발', 'React와 Spring Boot를 사용한 웹 애플리케이션 개발', 'ACTIVE', 1, '2024-01-01', '2024-06-30'),
('데이터베이스 설계', 'MySQL을 사용한 데이터베이스 설계 및 최적화', 'PLANNING', 2, '2024-02-01', '2024-03-31'),
('API 개발', 'RESTful API 개발 및 문서화', 'ACTIVE', 1, '2024-01-15', '2024-04-30');

INSERT INTO tasks (title, description, status, priority, assignee_id, project_id, due_date) VALUES
('사용자 인증 시스템 구현', 'JWT 기반 사용자 인증 시스템을 구현합니다.', 'IN_PROGRESS', 'HIGH', 3, 1, '2024-01-15'),
('데이터베이스 설계 검토', 'ERD 설계를 검토하고 최적화합니다.', 'REVIEW', 'MEDIUM', 4, 2, '2024-01-20'),
('API 문서 작성', 'REST API 문서를 작성합니다.', 'TODO', 'LOW', 3, 3, '2024-01-25');
