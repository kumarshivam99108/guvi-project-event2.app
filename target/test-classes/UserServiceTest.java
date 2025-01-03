package com.yourdomain.services;

import com.yourdomain.dao.UserDAO;
import com.yourdomain.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    private UserService userService;
    private UserDAO mockUserDAO;

    @BeforeEach
    public void setUp() {
        mockUserDAO = Mockito.mock(UserDAO.class);
        userService = new UserService();
        // Inject the mocked DAO into the service if necessary
        // For this structure, manually simulate a connection for testing.
    }

    @Test
    public void testRegisterUser() throws Exception {
        // Arrange
        User user = new User(0, "John Doe", "john@example.com", "password123");

        // Act
        userService.registerUser(user);

        // Assert
        verify(mockUserDAO, times(1)).saveUser(user);
    }

    @Test
    public void testFetchUser() throws Exception {
        // Arrange
        String email = "john@example.com";
        User user = new User(1, "John Doe", "john@example.com", "password123");
        when(mockUserDAO.getUserByEmail(email)).thenReturn(user);

        // Act
        User fetchedUser = userService.fetchUser(email);

        // Assert
        assertNotNull(fetchedUser);
        assertEquals(user.getEmail(), fetchedUser.getEmail());
        assertEquals(user.getName(), fetchedUser.getName());
    }
}
