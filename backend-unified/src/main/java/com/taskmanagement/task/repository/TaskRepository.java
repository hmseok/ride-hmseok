package com.taskmanagement.task.repository;

import com.taskmanagement.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공
}
