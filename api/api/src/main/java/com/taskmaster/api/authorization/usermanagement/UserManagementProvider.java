package com.taskmaster.api.authorization.usermanagement;


import com.taskmaster.api.authorization.database.DatabaseAccessor;
import com.taskmaster.api.authorization.database.DatabaseMutator;
import com.taskmaster.api.authorization.models.Password;
import com.taskmaster.api.authorization.models.User;

import java.sql.Connection;
import java.util.Objects;

/**
 * A bare-bones implementation of AbstractUserManagementProvider
 * It is recommended to provide your own implementation of the AbstractUserManagementProvider,
 * or to subclass this class for more specifications and customization of the authorization model,
 * but in theory this will work just fine.
 */
public class UserManagementProvider implements AbstractUserManagementProvider {

    private final DatabaseMutator mutator;
    private final DatabaseAccessor accessor;
    private final Connection connection;
    public UserManagementProvider(DatabaseMutator mutator, DatabaseAccessor accessor, Connection connection) {
        this.mutator = Objects.requireNonNull(mutator);
        this.accessor = Objects.requireNonNull(accessor);
        this.connection = Objects.requireNonNull(connection);
    }

    @Override
    public boolean authenticate(String username, String password) {
        try {
            return !accessor.attemptAuthentication(username, new Password(password), connection).equals(User.emptyInstance());
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean changePassword(User user, Password oldPassword, Password newPassword) {
        try {
            return this.mutator.changePassword(user, oldPassword, newPassword, connection);
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean changeUsername(User oldUser, User newUserModel) {
        try {
            return this.mutator.alterUser(oldUser, newUserModel, connection);
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean createNewUser(String username, String passwordText) {
        try {
            return this.mutator.createUser(new User(username, new Password(passwordText)), connection);
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean createNewUser(String username, Password password) {
        try {
            return this.mutator.createUser(new User(username, password), connection);
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean deleteUser(User userToDelete, Password password) {
        try {
            if (!userToDelete.getPassword().equals(password)) {
                return false;
            }
            else {
                return this.mutator.deleteUser(userToDelete, connection);
            }
        }
        catch (Exception ex) {
            return false;
        }
    }

    @Override
    public User getUser(String username) {
        try {
            return this.accessor.getUser(username, connection);
        }
        catch (Exception ex) {
            return User.emptyInstance();
        }
    }
}