<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Event Management System</title>
    <link rel="stylesheet" href="<c:url value='/css/style.css'/>">
    <style>
        .login-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: bold;
        }
        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .form-control:focus {
            border-color: #4CAF50;
            outline: none;
            box-shadow: 0 0 5px rgba(76,175,80,0.2);
        }
        .btn-login {
            width: 100%;
            padding: 12px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }
        .btn-login:hover {
            background: #45a049;
        }
        .error-message {
            color: #dc3545;
            text-align: center;
            margin-bottom: 15px;
        }
        .register-link {
            text-align: center;
            margin-top: 15px;
        }
        .register-link a {
            color: #4CAF50;
            text-decoration: none;
        }
        .register-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="form-header">
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
        </div>

        <c:if test="${not empty errorMessage}">
            <div class="error-message">
                ${fn:escapeXml(errorMessage)}
            </div>
        </c:if>

        <form action="<c:url value='/user'/>" method="post" id="loginForm">
            <input type="hidden" name="action" value="login">
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" 
                       class="form-control" 
                       id="email" 
                       name="email" 
                       value="${fn:escapeXml(param.email)}"
                       required 
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                       placeholder="Enter your email">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" 
                       class="form-control" 
                       id="password" 
                       name="password" 
                       required 
                       minlength="6"
                       placeholder="Enter your password">
            </div>

            <button type="submit" class="btn-login">Login</button>
        </form>

        <div class="register-link">
            <p>Don't have an account? 
                <a href="<c:url value='/register.jsp'/>">Register here</a>
            </p>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            let isValid = true;
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Email validation
            if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
                isValid = false;
                document.getElementById('email').classList.add('is-invalid');
            }

            // Password validation
            if (password.length < 6) {
                isValid = false;
                document.getElementById('password').classList.add('is-invalid');
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
