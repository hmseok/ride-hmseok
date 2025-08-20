package com.taskmanagement.repository;

import com.taskmanagement.entity.Payment;
import com.taskmanagement.entity.Payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // 사용자별 결제 조회
    List<Payment> findByUserId(Long userId);
    
    // 상태별 결제 조회
    List<Payment> findByStatus(PaymentStatus status);
    
    // 결제 방법별 조회
    List<Payment> findByPaymentMethod(Payment.PaymentMethod paymentMethod);
    
    // 사용자와 상태별 조회
    List<Payment> findByUserIdAndStatus(Long userId, PaymentStatus status);
    
    // 금액 범위별 조회
    List<Payment> findByAmountBetween(java.math.BigDecimal minAmount, java.math.BigDecimal maxAmount);
}
