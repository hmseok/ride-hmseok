package com.taskmanagement.repository;

import com.taskmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    List<User> findByUsernameContainingOrFullNameContainingOrEmailContaining(
        String username, String fullName, String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}
