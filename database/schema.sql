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
    attachments JSON,
    comments JSON,
    report_content TEXT,
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

-- 결제 테이블
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'KRW',
    payment_method ENUM('CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'DIGITAL_WALLET', 'OTHER') NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    description TEXT,
    reference_number VARCHAR(100),
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_method (payment_method),
    INDEX idx_payment_date (payment_date)
);

-- 업무 보고서 테이블
CREATE TABLE task_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT NOT NULL,
    reporter_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    report_type ENUM('PROGRESS', 'ISSUE', 'COMPLETION', 'REVIEW', 'OTHER') NOT NULL,
    status ENUM('DRAFT', 'SUBMITTED', 'REVIEWED', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'DRAFT',
    attachments JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_task_id (task_id),
    INDEX idx_reporter_id (reporter_id),
    INDEX idx_report_type (report_type),
    INDEX idx_status (status)
);

-- 업무 댓글 테이블
CREATE TABLE task_comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_comment_id BIGINT,
    attachments JSON,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_task_id (task_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_comment_id (parent_comment_id),
    INDEX idx_created_at (created_at)
);

-- 프로젝트 팀원 테이블
CREATE TABLE project_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role ENUM('OWNER', 'MANAGER', 'DEVELOPER', 'DESIGNER', 'TESTER', 'VIEWER') NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_id (project_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active),
    UNIQUE KEY unique_project_user (project_id, user_id)
);

-- 외래키 제약조건 추가
ALTER TABLE payments ADD CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE task_reports ADD CONSTRAINT fk_task_reports_task FOREIGN KEY (task_id) REFERENCES tasks(id);
ALTER TABLE task_reports ADD CONSTRAINT fk_task_reports_reporter FOREIGN KEY (reporter_id) REFERENCES users(id);
ALTER TABLE task_comments ADD CONSTRAINT fk_task_comments_task FOREIGN KEY (task_id) REFERENCES tasks(id);
ALTER TABLE task_comments ADD CONSTRAINT fk_task_comments_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_project FOREIGN KEY (project_id) REFERENCES projects(id);
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_user FOREIGN KEY (user_id) REFERENCES users(id);

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
