-- 확장된 기능을 위한 테이블들

-- 결제 테이블
CREATE TABLE IF NOT EXISTS payments (
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
CREATE TABLE IF NOT EXISTS task_reports (
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
CREATE TABLE IF NOT EXISTS task_comments (
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
CREATE TABLE IF NOT EXISTS project_members (
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

-- 기존 테이블에 새로운 컬럼 추가
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS attachments JSON;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS comments JSON;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS report_content TEXT;

-- 외래키 제약조건 추가 (필요시)
-- ALTER TABLE payments ADD CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE task_reports ADD CONSTRAINT fk_task_reports_task FOREIGN KEY (task_id) REFERENCES tasks(id);
-- ALTER TABLE task_reports ADD CONSTRAINT fk_task_reports_reporter FOREIGN KEY (reporter_id) REFERENCES users(id);
-- ALTER TABLE task_comments ADD CONSTRAINT fk_task_comments_task FOREIGN KEY (task_id) REFERENCES tasks(id);
-- ALTER TABLE task_comments ADD CONSTRAINT fk_task_comments_user FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE project_members ADD CONSTRAINT fk_project_members_project FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE project_members ADD CONSTRAINT fk_project_members_user FOREIGN KEY (user_id) REFERENCES users(id);
