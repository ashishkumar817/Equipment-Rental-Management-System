// com/erms/repo/EquipmentRepository.java
package com.erms.repo;

import com.erms.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
