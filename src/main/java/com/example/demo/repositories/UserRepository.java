package com.example.demo.repositories;

import com.example.demo.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Usuario, UUID> {
    public Optional<UserDetails> findByEmail(String email);

    public boolean existsByEmail(String email);
}
