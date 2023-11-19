package com.taskmaster.api.authorization.database;

import com.taskmaster.api.authorization.models.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class MySqlDatabaseAccessor implements DatabaseAccessor {
    @Override
    public User attemptAuthentication(String username, Password password, Connection connection) throws Exception {

        String hql = String.format("SELECT * FROM auth_users WHERE username='%s' AND password=%d", username, password.getHash());
        Statement statement = connection.createStatement();
        ResultSet set = statement.executeQuery(hql);

        while(set.next()) {
            return new User(username, password);
        }

        return User.emptyInstance();
    }

    @Override
    public boolean isLockedOut(String username, Connection connection) throws Exception {
        String hql = String.format("SELECT * FROM auth_users WHERE username='%s'", username);
        ResultSet set = connection.createStatement().executeQuery(hql);

        while(set.next()) {
            return set.getLong("lockoutDate") != 0;
        }
        return false;
    }

    @Override
    public long getLastAccessedDate(String username, Connection connection) throws Exception {
        String hql = String.format("SELECT * FROM auth_users WHERE username='%s'", username);

        ResultSet set = connection.createStatement().executeQuery(hql);
        while(set.next()) {
            return set.getLong("lastAccessed");
        }
        return 0;
    }

    @Override
    public long getLastModifiedDate(String username, Password password, Connection connection) throws Exception {
        String hql = String.format("SELECT * FROM auth_users WHERE username='%s' AND password=%d", username, password.getHash());
        ResultSet set = connection.createStatement().executeQuery(hql);

        while(set.next()) {
            return set.getLong("lastModified");
        }
        return 0;
    }

    @Override
    public User getUser(String username, Connection connection) throws Exception {
        String hql = String.format("SELECT * FROM auth_users WHERE username='%s'", username);
        ResultSet set = connection.createStatement().executeQuery(hql);

        while(set.next()) {
            return new User(set.getString("username"), Password.emptyInstance());
        }
        return User.emptyInstance();
    }
}