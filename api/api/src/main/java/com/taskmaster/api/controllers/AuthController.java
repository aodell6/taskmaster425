package com.taskmaster.api.controllers;

import com.taskmaster.api.authorization.database.MySQLDatabaseMutator;
import com.taskmaster.api.authorization.database.MySqlDatabaseAccessor;
import com.taskmaster.api.authorization.usermanagement.UserManagementProvider;
import com.taskmaster.api.database.ConnectionSettings;
import org.springframework.web.bind.annotation.*;

import java.sql.DriverManager;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping
    public boolean createUser(@RequestParam String username, @RequestParam String password, @RequestParam String passwordConfirm) throws Exception {
        if (!passwordConfirm.equals(password)) {
            return false;
        }

        UserManagementProvider provider = new UserManagementProvider(new MySQLDatabaseMutator(), new MySqlDatabaseAccessor(), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
        return provider.createNewUser(username, password);
    }

    @GetMapping
    public UUID attemptLogin(@RequestParam String username, @RequestParam String password) throws Exception {
       UserManagementProvider provider = new UserManagementProvider(new MySQLDatabaseMutator(), new MySqlDatabaseAccessor(), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
       return provider.authenticate(username, password);
    }

}