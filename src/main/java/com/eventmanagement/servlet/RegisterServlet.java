package com.eventmanagement.servlet;

import com.eventmanagement.dao.UserDAO;
import com.eventmanagement.model.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private UserDAO userDAO;

    public void init() {
        userDAO = new UserDAO();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String role = request.getParameter("role");

        try {
            // Check if user already exists
            User existingUser = userDAO.findByEmail(email);
            if (existingUser != null) {
                request.setAttribute("error", "Email already registered");
                request.getRequestDispatcher("register.html").forward(request, response);
                return;
            }

            // Create new user
            User newUser = new User(username, password, email, role);
            userDAO.create(newUser);

            // Redirect to login page with success message
            response.sendRedirect("login.html?registered=true");
            
        } catch (SQLException e) {
            throw new ServletException("Database error occurred", e);
        }
    }
}
