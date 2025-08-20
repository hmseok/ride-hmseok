package com.taskmanagement.service;

import com.taskmanagement.entity.Payment;
import com.taskmanagement.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    // 모든 결제 조회
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    // ID로 결제 조회
    public Payment getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.orElse(null);
    }
    
    // 사용자별 결제 조회
    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
    
    // 상태별 결제 조회
    public List<Payment> getPaymentsByStatus(String status) {
        try {
            Payment.PaymentStatus paymentStatus = Payment.PaymentStatus.valueOf(status.toUpperCase());
            return paymentRepository.findByStatus(paymentStatus);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    // 새 결제 생성
    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDateTime.now());
        }
        return paymentRepository.save(payment);
    }
    
    // 결제 상태 업데이트
    public Payment updatePaymentStatus(Long id, String status) {
        Optional<Payment> paymentOpt = paymentRepository.findById(id);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            try {
                Payment.PaymentStatus paymentStatus = Payment.PaymentStatus.valueOf(status.toUpperCase());
                payment.setStatus(paymentStatus);
                payment.setUpdatedAt(LocalDateTime.now());
                return paymentRepository.save(payment);
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }
    
    // 결제 취소
    public Payment cancelPayment(Long id) {
        Optional<Payment> paymentOpt = paymentRepository.findById(id);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setStatus(Payment.PaymentStatus.CANCELLED);
            payment.setUpdatedAt(LocalDateTime.now());
            return paymentRepository.save(payment);
        }
        return null;
    }
    
    // 결제 통계
    public Map<String, Object> getPaymentStats(Long userId, String period) {
        List<Payment> payments;
        if (userId != null) {
            payments = getPaymentsByUserId(userId);
        } else {
            payments = getAllPayments();
        }
        
        Map<String, Object> stats = new HashMap<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        int totalCount = 0;
        int completedCount = 0;
        int pendingCount = 0;
        int failedCount = 0;
        
        for (Payment payment : payments) {
            totalCount++;
            if (payment.getAmount() != null) {
                totalAmount = totalAmount.add(payment.getAmount());
            }
            
            switch (payment.getStatus()) {
                case COMPLETED:
                    completedCount++;
                    break;
                case PENDING:
                    pendingCount++;
                    break;
                case FAILED:
                    failedCount++;
                    break;
            }
        }
        
        stats.put("totalAmount", totalAmount);
        stats.put("totalCount", totalCount);
        stats.put("completedCount", completedCount);
        stats.put("pendingCount", pendingCount);
        stats.put("failedCount", failedCount);
        stats.put("successRate", totalCount > 0 ? (double) completedCount / totalCount * 100 : 0);
        
        return stats;
    }
    
    // 결제 방법별 통계
    public Map<String, Object> getPaymentStatsByMethod() {
        List<Payment> payments = getAllPayments();
        Map<String, Object> stats = new HashMap<>();
        Map<String, Integer> methodCounts = new HashMap<>();
        Map<String, BigDecimal> methodAmounts = new HashMap<>();
        
        for (Payment payment : payments) {
            String method = payment.getPaymentMethod().getDisplayName();
            methodCounts.put(method, methodCounts.getOrDefault(method, 0) + 1);
            
            if (payment.getAmount() != null) {
                BigDecimal currentAmount = methodAmounts.getOrDefault(method, BigDecimal.ZERO);
                methodAmounts.put(method, currentAmount.add(payment.getAmount()));
            }
        }
        
        stats.put("methodCounts", methodCounts);
        stats.put("methodAmounts", methodAmounts);
        
        return stats;
    }
}
