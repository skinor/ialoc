package com.advhunter.server.advhunterserver.repository;

import com.advhunter.server.advhunterserver.models.Role;
import com.advhunter.server.advhunterserver.models.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}