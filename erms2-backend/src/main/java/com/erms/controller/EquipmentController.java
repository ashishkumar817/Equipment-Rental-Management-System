package com.erms.controller;

import com.erms.model.Equipment;
import com.erms.repo.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentRepository repo;

    @GetMapping
    public List<Equipment> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Equipment one(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping
    public Equipment create(@RequestBody Equipment e) {
        return repo.save(e);
    }

    @PutMapping("/{id}")
    public Equipment update(@PathVariable Long id, @RequestBody Equipment incoming) {
        Equipment ex = repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));

        ex.setName(incoming.getName());
        ex.setType(incoming.getType());
        ex.setSpecs(incoming.getSpecs());
        ex.setDailyRate(incoming.getDailyRate());
        ex.setWeeklyRate(incoming.getWeeklyRate());
        ex.setMonthlyRate(incoming.getMonthlyRate());

        // ⭐ REQUIRED — otherwise image never updates
        ex.setImageUrl(incoming.getImageUrl());

        ex.setStatus(incoming.getStatus());
        return repo.save(ex);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
