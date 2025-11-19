package com.erms.service;

import com.erms.model.Equipment;
import com.erms.repo.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository repo;

    public List<Equipment> getAll() {
        return repo.findAll();
    }

    public Equipment getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
    }

    public Equipment create(Equipment e) {
        return repo.save(e);
    }

    public Equipment update(Long id, Equipment e) {
        Equipment existing = getById(id);
        e.setId(existing.getId());
        return repo.save(e);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}