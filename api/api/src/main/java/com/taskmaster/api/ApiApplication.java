package com.taskmaster.api;

import com.taskmaster.api.authorization.database.MySQLDatabaseMutator;
import com.taskmaster.api.database.ConnectionSettings;
import com.taskmaster.api.database.Database;
import com.taskmaster.api.database.Scaffolder;
import com.taskmaster.api.models.Task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) throws Exception {
		Connection connection = DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword);
		Scaffolder.go(connection);

		new MySQLDatabaseMutator().migrate(DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
		SpringApplication.run(ApiApplication.class, args);
	}
}