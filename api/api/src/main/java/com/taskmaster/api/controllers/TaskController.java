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
public class TaskController {

    /**
     * Gets all tasks for the user whose id is specified.
     * @param userId The id of the user to fetch tasks for.
     * @return List of tasks.
     * @throws Exception TaskFactory throws exceptions.
     * @author noahcs2002
     */
    @GetMapping
    public List<Task> getTasks(@RequestParam UUID userId) throws Exception {
        return TaskFactory.getTasks(userId);
    }

    /**
     * Create a new task.
     * @param name Name of the task.
     * @param desc Description of the task.
     * @param dueDate Due Date of the task.
     * @param status Status of the task.
     * @param userId The user who made the task.
     * @return True if successful, else false.
     * @author noahcs2002
     */
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

    /**
     * Update a task's information
     * @param id The task id to update.
     * @param name The name of the updated task.
     * @param desc The description of the updated task.
     * @param dueDate The due date of the updated task.
     * @param status The status of the updated task.
     * @param userId The id of the user whose task it is.
     * @return The updated task.
     * @author noahcs2002
     */
    @PutMapping
    public Task updateTask(@RequestParam long id, @RequestParam String name, @RequestParam String desc, @RequestParam long dueDate, @RequestParam String status, @RequestParam String userId) throws Exception {
        return TaskFactory.update(id, name, desc, dueDate, status, UUID.fromString(userId), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
    }

    /**
     * Delete a task by id.
     * @param id The id of the task to delete.
     * @return True if successful, else false.
     * @throws Exception TaskFactory throws exceptions.
     * @author noahcs2002.
     */
    @DeleteMapping
    public boolean deleteTask(@RequestParam long id) throws Exception {
        return TaskFactory.deleteTask(id);
    }
}
