package com.taskmaster.api.authorization.database;

import com.taskmaster.api.authorization.models.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

/**
 * MySQL-based implementation of <code>DatabaseMutator</code>
 * @author noahcs2002
 */
public class MySQLDatabaseMutator implements DatabaseMutator {

    public void migrate(Connection connection) throws Exception {

        String createUsers = "CREATE TABLE IF NOT EXISTS auth_users(id CHAR(36) PRIMARY KEY, " +
                "firstName VARCHAR(255), lastName VARCHAR(255), " +
                "username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, " +
                "lastAccessed BIGINT, lastModified BIGINT, lockoutDate BIGINT, lockedOutUntilDate BIGINT, " +
                "lockoutReason VARCHAR(255), isDeleted BIT NOT NULL) Engine=InnoDB;";

        Statement statement = connection.createStatement();
        statement.executeUpdate(createUsers);
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
        String hql = "UPDATE auth_users SET  username=?, password=?, lastModified=? WHERE id=?";

        try (PreparedStatement statement = connection.prepareStatement(hql)) {
           statement.setString(1, newUser.getUsername());
           statement.setString(2, oldUser.getPassword().toString());
           statement.setLong(3, System.currentTimeMillis());
           statement.setString(4, oldUser.getId().toString());
        }
        return true;
    }

    public boolean changePassword(User user, Password oldPassword, Password newPassword, Connection connection) throws Exception {
        String hql = "UPDATE auth_users SET password=? WHERE username=? AND password=?";

        try(PreparedStatement statement = connection.prepareStatement(hql)) {
            statement.setLong(1, newPassword.getHash());
            statement.setString(2, user.getUsername());
            statement.setLong(3, oldPassword.getHash());
            statement.executeUpdate();
        }
        return true;
    }
}