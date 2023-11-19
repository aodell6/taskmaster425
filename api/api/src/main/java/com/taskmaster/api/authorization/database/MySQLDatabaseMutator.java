package com.taskmaster.api.authorization.database;

import com.taskmaster.api.authorization.models.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

/**
 * Use this class to mutate a MySQL database instance to add the required tables to the
 * project you are working on, as well as perform operations like user creation, lock out, etc.
 */
public class MySQLDatabaseMutator implements DatabaseMutator {

    public boolean migrate(Connection connection) throws Exception {

        String createUsers = "CREATE TABLE IF NOT EXISTS auth_users(id CHAR(36) PRIMARY KEY, " +
                "firstName VARCHAR(255), lastName VARCHAR(255), " +
                "username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, " +
                "lastAccessed BIGINT, lastModified BIGINT, lockoutDate BIGINT, lockedOutUntilDate BIGINT, " +
                "lockoutReason VARCHAR(255), isDeleted BIT NOT NULL);";

        Statement statement = connection.createStatement();
        statement.executeUpdate(createUsers);
        return true;
    }

    public boolean createUser(User user, Connection connection) throws Exception {
        String hql = String.format("INSERT INTO auth_users (id, username, password, lastAccessed, lastModified, lockoutDate, lockedOutUntilDate, lockoutReason, isDeleted)" +
                        " values('%s', '%s', '%s', %d, %d, %d, %d, '%s', %s);",
                user.getId().toString(), user.getUsername(), user.getPassword().getHash(), user.getLastAccessed(), user.getLastModified(), user.getLockoutDate(), user.getLockedOutUntilDate(), user.getLockoutReason(), false);
        Statement statement = connection.createStatement();
        statement.executeUpdate(hql);
        return true;
    }

    public boolean deleteUser(User user, Connection connection) throws Exception {
        String hql = String.format("UPDATE auth_users SET isDeleted = true WHERE id='%s'", user.getId());
        connection.createStatement().executeUpdate(hql);
        return true;
    }

    public boolean alterUser(User oldUser, User newUser, Connection connection) throws Exception {
        String hql = String.format("UPDATE auth_users SET  username='%s', password=%d, lastModified=%d WHERE id='%s'",
                 newUser.getUsername(), newUser.getPassword().getHash(), System.currentTimeMillis(), oldUser.getId());
        connection.createStatement().executeUpdate(hql);
        return true;
    }

    public boolean changePassword(User user, Password oldPassword, Password newPassword, Connection connection) throws Exception {
        String hql = "UPDATE auth_users SET password=? WHERE username=? AND password=?"; // newPassword.getHash(), user.getUsername(), oldPassword.getHash());
        try(PreparedStatement statement = connection.prepareStatement(hql)) {
            statement.setLong(1, newPassword.getHash());
            statement.setString(2, user.getUsername());
            statement.setLong(3, oldPassword.getHash());
            statement.executeUpdate();
        }
        return true;
    }
}