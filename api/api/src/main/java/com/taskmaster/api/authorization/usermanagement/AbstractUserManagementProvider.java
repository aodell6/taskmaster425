package com.taskmaster.api.authorization.usermanagement;

import com.taskmaster.api.authorization.models.Password;
import com.taskmaster.api.authorization.models.User;

import java.util.UUID;

public interface AbstractUserManagementProvider {
    /**
     * Attempt to log a user into the service
     * @param username The username to try
     * @param password The password to try
     * @return True if authenticated, else false
     */
    UUID authenticate(String username, String password) throws Exception;

    /**
     * Change a user's password.
     * @param user The user to change.
     * @param oldPassword The old password
     * @param newPassword The new password.
     * @return True if successful, else false.
     */
    boolean changePassword(User user, Password oldPassword, Password newPassword);

    /**
     * Change a user's username.
     * @param user The user to make the change for.
     * @return True if successful, else false.
     */
    boolean changeUsername(User user, User newUser);

    /**
     * Creates a new user with the given information
     * @param username Username
     * @param passwordText Text of the password
     * @return True if successful, else false.
     */
    boolean createNewUser(String username, String passwordText);

    /**
     * Create a new user with the given information
     * @param username Username
     * @param password Password
     * @return True if successful, else false
     */
    boolean createNewUser(String username, Password password);

    /**
     * Delete a specific user.
     * @param userToDelete User to delete.
     * @param password The password of the user.
     * @return True if successful, else false.
     */
    boolean deleteUser(User userToDelete, Password password);

    /**
     * Returns the first user with the given username.
     * @param username The username to search for
     * @return The user with the given username.
     */
    User getUser(String username);
}