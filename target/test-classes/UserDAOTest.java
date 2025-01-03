package com.yourdomain.dao;

import com.yourdomain.models.User;
import com.yourdomain.utils.DatabaseConnection;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;

import static org.junit.jupiter.api.Assertions.*;

public class UserDAOTest {

    private Connection connection;
    private UserDAO userDAO;

    @BeforeEach
    public void setUp() throws Exception {
        connection = DatabaseConnection.initializeDatabase();
        userDAO = new UserDAO();

        // Clean the test database before each test
        try (PreparedStatement ps = connection.prepareStatement("DELETE FROM users")) {
            ps.executeUpdate();
        }
    }

    @AfterEach
    public void tearDown() throws Exception {
        connection.close();
    }

    @Test
    public void testSaveUser() throws Exception {
        // Arrange
        User user = new User(0, "John Doe", "john@example.com", "password123");

        // Act
        userDAO.saveUser(user);

        // Assert
        User retrievedUser = userDAO.getUserByEmail("john@example.com");
        assertNotNull(retrievedUser);
        assertEquals("John Doe", retrievedUser.getName());
        assertEquals("john@example.com", retrievedUser.getEmail());
    }

    @Test
    public void testGetUserByEmail() throws Exception {
        // Arrange
        User user = new User(0, "Jane Doe", "jane@example.com", "password123");
        userDAO.saveUser(user);

        // Act
        User retrievedUser = userDAO.getUserByEmail("jane@example.com");

        // Assert
        assertNotNull(retrievedUser);
        assertEquals("Jane Doe", retrievedUser.getName());
    }
}
