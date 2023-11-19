package com.taskmaster.api.controllers;

import com.taskmaster.api.models.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @GetMapping
    public List<Task> getTasks() {

        return null;
    }

    @PostMapping
    public void createTask() {

    }

    @PutMapping
    public Task updateTask() {
        return null;
    }

    @DeleteMapping
    public void deleteTask() {

    }
}
