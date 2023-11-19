package com.taskmaster.api;

import com.taskmaster.api.database.ConnectionSettings;
import com.taskmaster.api.database.Scaffolder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) throws Exception {
		Connection connection = DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword);
		Scaffolder.go(connection);
		SpringApplication.run(ApiApplication.class, args);
	}

}
