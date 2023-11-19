package com.taskmaster.api.authorization.models;

import java.util.Objects;

/**
 * A simple password object containing the plain text and a hash of the password for long term storage in a database.
 */
public class Password {

    private final String plainText;
    private final long hash;

    public Password(String plainText) {
        this.plainText = plainText;
        this.hash = Objects.hash(plainText);
    }

    public String getPlainText() {
        return plainText;
    }

    public long getHash() {
        return hash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Password password = (Password) o;
        return hash == password.hash && Objects.equals(plainText, password.plainText);
    }

    @Override
    public int hashCode() {
        return Objects.hash(plainText, hash);
    }

    public static Password emptyInstance() {
        return new Password("");
    }
}
