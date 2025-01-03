<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>User Details</title>
    <style>
        .details-card {
            max-width: 800px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .user-header {
            background: #3498db;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .user-header h2 {
            margin: 0;
            font-size: 24px;
        }
        .user-info {
            padding: 20px;
        }
        .info-group {
            margin-bottom: 15px;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .info-label {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #2c3e50;
            font-size: 16px;
            font-weight: bold;
        }
        .action-buttons {
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
        }
        .btn-edit {
            background: #2ecc71;
            color: white;
        }
        .btn-back {
            background: #95a5a6;
            color: white;
        }
        .btn-delete {
            background: #e74c3c;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="details-card">
            <div class="user-header">
                <h2>${user.name}</h2>
                <p>${user.email}</p>
            </div>
            
            <div class="user-info">
                <div class="info-group">
                    <div class="info-label">User ID</div>
                    <div class="info-value">${user.id}</div>
                </div>
                
                <div class="info-group">
                    <div class="info-label">Email Address</div>
                    <div class="info-value">${user.email}</div>
                </div>
                
                <c:if test="${not empty user.phone}">
                    <div class="info-group">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value">${user.phone}</div>
                    </div>
                </c:if>
                
                <c:if test="${not empty user.role}">
                    <div class="info-group">
                        <div class="info-label">Role</div>
                        <div class="info-value">${user.role}</div>
                    </div>
                </c:if>
                
                <div class="info-group">
                    <div class="info-label">Account Created</div>
                    <div class="info-value">
                        <fmt:formatDate value="${user.createdDate}" pattern="MMMM dd, yyyy"/>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons">
                <a href="user" class="btn btn-back">Back to List</a>
                <a href="user?action=edit&id=${user.id}" class="btn btn-edit">Edit User</a>
                <button onclick="confirmDelete(${user.id})" class="btn btn-delete">Delete User</button>
            </div>
        </div>
    </div>
    
    <script>
        function confirmDelete(userId) {
            if (confirm('Are you sure you want to delete this user?')) {
                window.location.href = 'user?action=delete&id=' + userId;
            }
        }
    </script>
</body>
</html>
