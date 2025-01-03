package com.eventmanagement.servlet;

import com.eventmanagement.dao.UserDAO;
import com.eventmanagement.model.User;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private UserDAO userDAO;

    public void init() {
        userDAO = new UserDAO();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            User user = userDAO.findByEmail(email);
            
            if (user != null && verifyPassword(password, user.getPassword())) {
                // Create session
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                session.setAttribute("userId", user.getUserId());
                session.setAttribute("role", user.getRole());

                // Redirect based on role
                switch (user.getRole()) {
                    case "ADMIN":
                        response.sendRedirect("admin/dashboard.html");
                        break;
                    case "ORGANIZER":
                        response.sendRedirect("organizer/dashboard.html");
                        break;
                    case "ATTENDEE":
                        response.sendRedirect("attendee/dashboard.html");
                        break;
                    default:
                        response.sendRedirect("index.html");
                }
            } else {
                request.setAttribute("error", "Invalid email or password");
                request.getRequestDispatcher("login.html").forward(request, response);
            }
        } catch (SQLException e) {
            throw new ServletException("Database error occurred", e);
        }
    }

    private boolean verifyPassword(String inputPassword, String storedPassword) {
        // In a real application, you would use a proper password hashing library
        // This is a simplified version for demonstration
        return inputPassword.equals(storedPassword);
    }
}
