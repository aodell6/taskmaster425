package com.taskmaster.api.authorization.models;

import java.util.Objects;
import java.util.UUID;

/**
 * A conventional User model, containing things like ID, first and last name, username, password, etc.
 */
public class User {
    private UUID id;
    private String username;
    private Password password;
    private long lastAccessed;
    private long lastModified;
    private long lockoutDate;
    private long lockedOutUntilDate;
    private String lockoutReason;
    private boolean isDeleted;
    private long passwordHash;

    public User(String username, Password password) {
        this.username = username;
        this.password = password;
        this.lastAccessed = System.currentTimeMillis();
        this.lastModified = System.currentTimeMillis();
        this.lockoutDate = 0;
        this.lockedOutUntilDate = 0;
        this.lockoutReason = null;
        this.id = UUID.randomUUID();
        this.isDeleted = false;
        this.passwordHash = password.getHash();
    }

    public User(String username, long passwordHash) {
        this.username = username;
        this.password = Password.emptyInstance();
        this.lastAccessed = System.currentTimeMillis();
        this.lastModified = System.currentTimeMillis();
        this.lockoutDate = 0;
        this.lockedOutUntilDate = 0;
        this.lockoutReason = null;
        this.id = UUID.randomUUID();
        this.isDeleted = false;
        this.passwordHash = passwordHash;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Password getPassword() {
        return password;
    }

    public void setPassword(Password password) {
        this.password = password;
    }

    public long getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(long lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public long getLastModified() {
        return lastModified;
    }

    public void setLastModified(long lastModified) {
        this.lastModified = lastModified;
    }

    public long getLockoutDate() {
        return lockoutDate;
    }

    public void setLockoutDate(long lockoutDate) {
        this.lockoutDate = lockoutDate;
    }

    public long getLockedOutUntilDate() {
        return lockedOutUntilDate;
    }

    public void setLockedOutUntilDate(long lockedOutUntilDate) {
        this.lockedOutUntilDate = lockedOutUntilDate;
    }

    public String getLockoutReason() {
        return lockoutReason;
    }

    public void setLockoutReason(String lockoutReason) {
        this.lockoutReason = lockoutReason;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id,  username, password, lastAccessed, lastModified, lockoutDate, lockedOutUntilDate, lockoutReason);
    }
    
    public static User emptyInstance() {
        return new User("", Password.emptyInstance());
    }

    public User getNoPasswordVersion() {
        return new User(username, Password.emptyInstance());
    }
}