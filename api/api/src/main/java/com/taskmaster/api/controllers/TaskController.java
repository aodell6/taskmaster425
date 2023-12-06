package com.taskmaster.api.controllers;

import com.taskmaster.api.database.ConnectionSettings;
import com.taskmaster.api.database.Database;
import com.taskmaster.api.factories.TaskFactory;
import com.taskmaster.api.models.Status;
import com.taskmaster.api.models.Task;
import org.springframework.web.bind.annotation.*;

import java.sql.DriverManager;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @GetMapping
    public List<Task> getTasks(@RequestParam UUID userId) throws Exception {
        return TaskFactory.getTasks(userId);
    }

    @PostMapping
    public boolean createTask(
            @RequestParam String name,
            @RequestParam String desc,
            @RequestParam long dueDate,
            @RequestParam String status,
            @RequestParam String userId) {
        try {
        Task task = new Task(name, desc, dueDate, Status.valueOf(status), UUID.fromString(userId));
            return Database.createTask(task, DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
        }
        catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @PutMapping
    public Task updateTask(@RequestParam long id, @RequestParam String name, @RequestParam String desc, @RequestParam long dueDate, @RequestParam String status, @RequestParam String userId) throws Exception {
        return TaskFactory.update(id, name, desc, dueDate, status, UUID.fromString(userId), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
    }

    @DeleteMapping
    public boolean deleteTask(@RequestParam long id) throws Exception {
        return TaskFactory.deleteTask(id);
    }
}
