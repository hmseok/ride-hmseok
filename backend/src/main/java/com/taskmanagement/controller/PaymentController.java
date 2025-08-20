package com.taskmanagement.controller;

import com.taskmanagement.entity.Payment;
import com.taskmanagement.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    // 결제 목록 조회
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String status) {
        
        if (userId != null) {
            return ResponseEntity.ok(paymentService.getPaymentsByUserId(userId));
        } else if (status != null) {
            return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
        } else {
            return ResponseEntity.ok(paymentService.getAllPayments());
        }
    }
    
    // 결제 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 새 결제 생성
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }
    
    // 결제 상태 업데이트
    @PutMapping("/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        
        Payment updatedPayment = paymentService.updatePaymentStatus(id, status);
        if (updatedPayment != null) {
            return ResponseEntity.ok(updatedPayment);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 결제 취소
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Payment> cancelPayment(@PathVariable Long id) {
        Payment cancelledPayment = paymentService.cancelPayment(id);
        if (cancelledPayment != null) {
            return ResponseEntity.ok(cancelledPayment);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 결제 통계
    @GetMapping("/stats")
    public ResponseEntity<?> getPaymentStats(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String period) {
        
        return ResponseEntity.ok(paymentService.getPaymentStats(userId, period));
    }
    
    // 결제 방법별 통계
    @GetMapping("/stats/by-method")
    public ResponseEntity<?> getPaymentStatsByMethod() {
        return ResponseEntity.ok(paymentService.getPaymentStatsByMethod());
    }
}
