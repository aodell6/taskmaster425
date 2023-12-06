package com.taskmaster.api.controllers;

import com.taskmaster.api.authorization.database.MySQLDatabaseMutator;
import com.taskmaster.api.authorization.database.MySqlDatabaseAccessor;
import com.taskmaster.api.authorization.usermanagement.UserManagementProvider;
import com.taskmaster.api.database.ConnectionSettings;
import org.springframework.web.bind.annotation.*;

import java.sql.DriverManager;
import java.util.UUID;

/**
 * Authorization controller. Handles all authorization access for the application.
 * @author noahcs2002
 */
@RestController
@RequestMapping("/api/auth")
<<<<<<< HEAD
@CrossOrigin(origins = "*")
=======
@CrossOrigin(origins = "http://localhost:3000")
>>>>>>> 55e97702484254d96096009fd25f2959ad0690c8
public class AuthController {

    /**
     * Attempt to create a user.
     * @param username The username of the new user
     * @param password The password of the new user
     * @param passwordConfirm The password confirmation. This will return false if the user's password and password
     *                        confirmation do not match.
     * @return True if successful, else false.
     * @throws Exception The <code>UserManagementProvider</code> uses exception-unsafe SQL
     * @author noahcs2002
     */
    @PostMapping
    public boolean createUser(@RequestParam String username,
                              @RequestParam String password,
                              @RequestParam String passwordConfirm)
    throws Exception {
        if (!passwordConfirm.equals(password)) {
            return false;
        }

        UserManagementProvider provider = new UserManagementProvider(new MySQLDatabaseMutator(), new MySqlDatabaseAccessor(), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
        return provider.createNewUser(username, password);
    }

    /**
     * Attempt a log in to the site. Returns the User's UUID, should the
     * login attempt be deemed successful. This allows you to store the UUID
     * in the front end for use in later controller calls.
     * @param username The username for the attempted login.
     * @param password The password for the attempted login
     * @return A UUID of the user, should one be found.
     * @throws Exception The <code>UserManagementProvider</code> uses exception-unsafe SQL
     * @author noahcs2002
     */
    @GetMapping
    public UUID attemptLogin(@RequestParam String username,
                             @RequestParam String password)
    throws Exception {
       UserManagementProvider provider = new UserManagementProvider(new MySQLDatabaseMutator(), new MySqlDatabaseAccessor(), DriverManager.getConnection(ConnectionSettings.URL, ConnectionSettings.devUsername, ConnectionSettings.devPassword));
       return provider.authenticate(username, password);
    }
}