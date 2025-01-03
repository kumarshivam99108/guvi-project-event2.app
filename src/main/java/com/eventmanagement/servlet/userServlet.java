package com.eventmanagement.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.eventmanagement.dao.UserDAO;
import com.eventmanagement.model.User;

@WebServlet("/user")
public class UserServlet extends HttpServlet {
    private UserDAO userDAO;

    public void init() {
        userDAO = new UserDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Get the user ID from the request parameter
        String userIdStr = request.getParameter("id");
        
        if (userIdStr != null) {
            // Get specific user
            int userId = Integer.parseInt(userIdStr);
            User user = userDAO.getUserById(userId);
            if (user != null) {
                request.setAttribute("user", user);
                request.getRequestDispatcher("userDetails.jsp").forward(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not found");
            }
        } else {
            // Get all users
            request.setAttribute("users", userDAO.getAllUsers());
            request.getRequestDispatcher("userList.jsp").forward(request, response);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Get user details from request parameters
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        
        // Basic validation
        if (name == null || name.trim().isEmpty() || email == null || email.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Name and email are required");
            return;
        }
        
        // Create and save new user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        
        try {
            userDAO.addUser(user);
            response.sendRedirect("user");  // Redirect to user list
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error creating user");
        }
    }
}