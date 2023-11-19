package com.taskmaster.api.database;

import java.sql.Connection;

public class Scaffolder {
    private static String createTasks = """
       CREATE TABLE IF NOT EXISTS easysprint.tasks (
            id BIGINT NOT NULL UNIQUE AUTO_INCREMENT,
            name VARCHAR(200) NOT NULL,
            description LONGTEXT NOT NULL,
            due_date BIGINT NOT NULL,
            status VARCHAR(12) NOT NULL
       ) Engine = InnoDB;     
    """;

    public static void go(Connection connection) {
        try (connection) {
            connection.createStatement().executeUpdate(createTasks);
        }
        catch (Exception ex) {
            System.out.println("Uh oh error with the db: " + ex.getMessage());
        }
    }
}