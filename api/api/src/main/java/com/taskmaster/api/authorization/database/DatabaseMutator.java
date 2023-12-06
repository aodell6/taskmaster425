package com.taskmaster.api.authorization.database;

import com.taskmaster.api.authorization.models.*;

import java.sql.Connection;

/**
 * A utility interface designed to handle the 'update' functions in the
 * required authorization tables.
 * ||
 * It is recommended you implement <code>migrate()</code> in such a way that the tables are made if they do not exist.
 * Then, you can call migrate before all additional calls, for reliability.
 *
 * @apiNote All functions throw <code>Exception</code> because they all contain exception-unsafe SQL operations.
 */
public interface DatabaseMutator {
    /**
     * Create the needed tables in the database engine of your choice.
     * At minimum, you must include an 'auth_users' table in your schema. An example is in the apiNote section.
     *
     * @apiNote id CHAR(36) PRIMARY KEY,
     *      FirstName VARCHAR(255) NOT NULL,
     *      lastName VARCHAR(255) NOT NULL,
     *      username VARCHAR(255) NOT NULL,
     *      password VARCHAR(255) NOT NULL,
     *      lastAccessed BIGINT, lastModified BIGINT,
     *      lockoutDate BIGINT,
     *      lockedOutUntilDate BIGINT,
     *      lockoutReason VARCHAR(255),
     *      isDeleted BIT NOT NULL
     * @param connection A connection to the database you wish to scaffold.
     * @author noahcs2002
     */
    void migrate(Connection connection) throws Exception;

    /**
     * Create a user in a properly migrated database.
     * @param user The user to create.
     * @param connection A connection to a properly migrated Database. See <code>migrate().</code>
     * @return True if successful, else false.
     * @author noahcs2002
     */
    boolean createUser(User user, Connection connection) throws Exception;

    /**
     * Mark a user as deleted from the system.
     * @param user The user to soft-delete.
     * @param connection A connection to a properly migrated DB. See <code>migrate().</code>
     * @return True if successful, else false.
     * @author noahcs2002
     */
    boolean deleteUser(User user, Connection connection) throws Exception;

    /**
     * Alter a user in some way.
     * @param oldUser The user to modify.
     * @param newUser A new model to make the old one reflect.
     * @param connection A connection to a properly migrated Database. See <code>migrate().</code>
     * @return True if successful, else false.
     * @author noahcs2002
     */
    boolean alterUser(User oldUser, User newUser, Connection connection) throws Exception;

    /**
     * Change a user's password. For security purposes, this is locked behind old password knowledge.
     * @param user The user to modify.
     * @param oldPassword The old password.
     * @param newPassword The new password.
     * @param connection A connection to a properly migrated Database. See <code>migrate().</code>
     * @return True if successful, else false.
     * @author noahcs2002
     */
    boolean changePassword(User user, Password oldPassword, Password newPassword, Connection connection) throws Exception;
}