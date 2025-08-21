package com.taskmanagement.user.repository;

import com.taskmanagement.user.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    // 사용자와 날짜로 근태 조회
    Optional<Attendance> findByUserIdAndDate(Long userId, LocalDate date);
    
    // 사용자별 기간 내 근태 조회
    List<Attendance> findByUserIdAndDateBetweenOrderByDateDesc(Long userId, LocalDate startDate, LocalDate endDate);
    
    // 부서별 특정 날짜 근태 조회
    @Query("SELECT a FROM Attendance a JOIN User u ON a.userId = u.id WHERE u.department = :department AND a.date = :date")
    List<Attendance> findByDepartmentAndDate(@Param("department") String department, @Param("date") LocalDate date);
    
    // 특정 날짜의 모든 근태 조회
    List<Attendance> findByDateOrderByUserId(LocalDate date);
    
    // 사용자별 월별 근태 조회
    @Query("SELECT a FROM Attendance a WHERE a.userId = :userId AND YEAR(a.date) = :year AND MONTH(a.date) = :month ORDER BY a.date")
    List<Attendance> findByUserIdAndYearMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
}
