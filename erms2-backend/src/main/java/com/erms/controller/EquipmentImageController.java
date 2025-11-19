package com.erms.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;


@RestController
@RequestMapping("/api/uploads")
public class EquipmentImageController {

	@PostMapping("/equipment")
	public Map<String, String> upload(@RequestParam("file") MultipartFile file)throws IOException {
 
        String folder = "src/main/resources/static/equipment/";
        File directory = new File(folder);
        if (!directory.exists()) directory.mkdirs();

        File dest = new File(folder + file.getOriginalFilename());
        file.transferTo(dest);

        return Map.of("url", "/equipment/" + file.getOriginalFilename());
    }
}

