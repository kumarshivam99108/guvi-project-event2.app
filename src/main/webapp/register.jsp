<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Event Management System</title>
    <link rel="stylesheet" href="<c:url value='/css/style.css'/>">
    <style>
        .register-container {
            max-width: 500px;
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
        .btn-register {
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
        .btn-register:hover {
            background: #45a049;
        }
        .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        }
        .login-link {
            text-align: center;
            margin-top: 15px;
        }
        .login-link a {
            color: #4CAF50;
            text-decoration: none;
        }
        .login-link a:hover {
            text-decoration: underline;
        }
        .required::after {
            content: "*";
            color: #dc3545;
            margin-left: 4px;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <div class="form-header">
            <h2>Create Account</h2>
            <p>Please fill in the details to register</p>
        </div>

        <c:if test="${not empty errorMessage}">
            <div class="error-message">
                ${fn:escapeXml(errorMessage)}
            </div>
        </c:if>

        <form action="<c:url value='/user'/>" method="post" id="registerForm">
            <input type="hidden" name="action" value="register">
            
            <div class="form-group">
                <label for="name" class="required">Full Name</label>
                <input type="text" 
                       class="form-control ${not empty nameError ? 'is-invalid' : ''}" 
                       id="name" 
                       name="name" 
                       value="${fn:escapeXml(param.name)}"
                       required 
                       pattern="^[A-Za-z\\s]{2,50}$"
                       title="Name should contain only letters and spaces, 2-50 characters"
                       placeholder="Enter your full name">
                <c:if test="${not empty nameError}">
                    <div class="error-message">${fn:escapeXml(nameError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="email" class="required">Email</label>
                <input type="email" 
                       class="form-control ${not empty emailError ? 'is-invalid' : ''}" 
                       id="email" 
                       name="email" 
                       value="${fn:escapeXml(param.email)}"
                       required 
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                       placeholder="Enter your email">
                <c:if test="${not empty emailError}">
                    <div class="error-message">${fn:escapeXml(emailError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="password" class="required">Password</label>
                <input type="password" 
                       class="form-control ${not empty passwordError ? 'is-invalid' : ''}" 
                       id="password" 
                       name="password" 
                       required 
                       minlength="6"
                       pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                       title="Password must be at least 6 characters long and contain at least one letter and one number"
                       placeholder="Enter your password">
                <c:if test="${not empty passwordError}">
                    <div class="error-message">${fn:escapeXml(passwordError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="confirmPassword" class="required">Confirm Password</label>
                <input type="password" 
                       class="form-control" 
                       id="confirmPassword" 
                       name="confirmPassword" 
                       required 
                       placeholder="Confirm your password">
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" 
                       class="form-control ${not empty phoneError ? 'is-invalid' : ''}" 
                       id="phone" 
                       name="phone" 
                       value="${fn:escapeXml(param.phone)}"
                       pattern="[0-9]{10}"
                       title="Please enter a valid 10-digit phone number"
                       placeholder="Enter your phone number">
                <c:if test="${not empty phoneError}">
                    <div class="error-message">${fn:escapeXml(phoneError)}</div>
                </c:if>
            </div>

            <button type="submit" class="btn-register">Register</button>
        </form>

        <div class="login-link">
            <p>Already have an account? 
                <a href="<c:url value='/login.jsp'/>">Login here</a>
            </p>
        </div>
    </div>

    <script>
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const phone = document.getElementById('phone').value.trim();

            // Name validation
            if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
                isValid = false;
                document.getElementById('name').classList.add('is-invalid');
            }

            // Email validation
            if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
                isValid = false;
                document.getElementById('email').classList.add('is-invalid');
            }

            // Password validation
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
                isValid = false;
                document.getElementById('password').classList.add('is-invalid');
            }

            // Confirm password validation
            if (password !== confirmPassword) {
                isValid = false;
                document.getElementById('confirmPassword').classList.add('is-invalid');
                alert('Passwords do not match');
            }

            // Phone validation (if provided)
            if (phone && !/^[0-9]{10}$/.test(phone)) {
                isValid = false;
                document.getElementById('phone').classList.add('is-invalid');
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
