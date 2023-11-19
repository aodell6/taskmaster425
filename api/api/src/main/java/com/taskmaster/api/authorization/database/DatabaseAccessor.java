package com.taskmaster.api.authorization.database;

import com.taskmaster.api.authorization.models.*;
import java.sql.Connection;

/**
 * An interface for operations around accessing the database. All functions in this interface perform
 * queries, not updates.
 *
 * @apiNote All functions in this interface throw an exception, as the SQL operations are not
 * exception safe. Make sure to escalate these up the stack or try-catch them appropriately.
 */
public interface DatabaseAccessor {

    /**
     * Attempt to log in. Takes the given username and password and uses the provided connection to scan for
     * tables to attempt to log in. If the algorithm finds a user whose username matches the
     * provided username and whose password matches the provided password, it will be returned.
     *
     * @param username Username to try.
     * @param password Password to try.
     * @param connection A connection to a database that has been successfully migrated to include the needed auth tables.
     *                   For more information, see <code>DatabaseMutator</code>

     * @return A User if authenticated, User.emptyInstance() else.
     */
    User attemptAuthentication(String username, Password password, Connection connection) throws Exception;

    /**
     * Check if a user is locked out of the service.
     * @param username The username to check.
     * @param connection A connection to a database that has been successfully migrated to include the needed auth tables.
     *                   For more information, see <code>DatabaseMutator</code>
     * @return True if the user is locked out, else false.
     */
    boolean isLockedOut(String username, Connection connection) throws Exception;

    /**
     * Check the last time the user was successfully logged into the site.
     * @param username The username to check.
     * @param connection A connection to a database that has been successfully migrated to include the needed auth tables.
     *                   For more information, see <code>DatabaseMutator</code>
     * @return The last accessed date.
     */
    long getLastAccessedDate(String username, Connection connection) throws Exception;

    /**
     * Get the date the user last modified their information. For security reasons, this is gated behind the knowledge of
     * the user's username AS WELL AS the knowledge of the user's password.
     * @param username The username to check.
     * @param password The password of the user in question.
     * @param connection A connection to a database that has been successfully migrated to include the needed auth tables.
     *                   For more information, see <code>DatabaseMutator</code>
     * @return The last date of modification of the user in question.
     */
    long getLastModifiedDate(String username, Password password, Connection connection) throws Exception;

    User getUser(String username, Connection connection) throws Exception;
}