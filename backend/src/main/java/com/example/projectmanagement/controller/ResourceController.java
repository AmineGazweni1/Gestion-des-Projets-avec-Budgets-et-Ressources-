package com.example.projectmanagement.controller;

import com.example.projectmanagement.model.Resource;
import com.example.projectmanagement.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return resourceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    // @PreAuthorize("hasRole('USER')")
    public Resource createResource(@RequestBody Resource resource) {
        System.out.println("Creating resource: " + resource);
        return resourceRepository.save(resource);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Resource> updateResource(@PathVariable Long id, @RequestBody Resource resourceDetails) {
        return resourceRepository.findById(id)
                .map(resource -> {
                    resource.setName(resourceDetails.getName());
                    resource.setDescription(resourceDetails.getDescription());
                    resource.setType(resourceDetails.getType());
                    resource.setAvailable(resourceDetails.getAvailable());
                    Resource updatedResource = resourceRepository.save(resource);
                    return ResponseEntity.ok(updatedResource);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        return resourceRepository.findById(id)
                .map(resource -> {
                    resourceRepository.delete(resource);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public List<Resource> getResourcesByType(@PathVariable String type) {
        return resourceRepository.findByType(type);
    }

    @GetMapping("/available/{available}")
    public List<Resource> getResourcesByAvailability(@PathVariable Boolean available) {
        return resourceRepository.findByAvailable(available);
    }

    @GetMapping("/task/{taskId}")
    public List<Resource> getResourcesByTask(@PathVariable Long taskId) {
        return resourceRepository.findByTasksId(taskId);
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Resource controller is working!";
    }
}
