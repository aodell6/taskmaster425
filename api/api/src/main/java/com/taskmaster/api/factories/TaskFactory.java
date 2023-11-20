package com.taskmaster.api.factories;

import com.taskmaster.api.database.ConnectionSettings;
import com.taskmaster.api.database.Database;
import com.taskmaster.api.models.Task;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.List;
import java.util.UUID;

public class TaskFactory {

    public static Task update(long id, String name, String desc, long dueDate, String status, UUID userId, Connection connection) {
       return Database.update(id, name, desc, dueDate, status, userId, connection);
    }

    public static boolean create(Connection connection, Task task) {
        return Database.createTask(task, connection);
    }

    public static boolean deleteTask(long id) throws Exception {
        return Database.delete(id, DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
    }

    public static List<Task> getTasks(UUID userId) throws Exception {
        return Database.getTasks(userId, DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
    }
}
