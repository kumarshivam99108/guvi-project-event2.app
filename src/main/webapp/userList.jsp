<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>User Management - ${fn:length(users)} Users</title>
    <style>
        .user-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .user-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 20px;
            transition: transform 0.2s;
        }
        .user-card:hover {
            transform: translateY(-5px);
        }
        .user-card h3 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .user-info {
            color: #666;
            margin: 5px 0;
        }
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .btn {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
        }
        .btn-view {
            background: #3498db;
            color: white;
        }
        .btn-edit {
            background: #2ecc71;
            color: white;
        }
        .add-user-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px;
        }
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #2c3e50;
        }
        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .btn-submit {
            background: #e74c3c;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Management</h1>
        <p>Total Users: ${fn:length(users)}</p>
        
        <c:if test="${not empty message}">
            <div class="alert alert-success">${message}</div>
        </c:if>
        <c:if test="${not empty error}">
            <div class="alert alert-error">${error}</div>
        </c:if>

        <!-- Add User Form -->
        <div class="add-user-section">
            <h2>Add New User</h2>
            <form action="<c:url value='/user'/>" method="post">
                <input type="hidden" name="action" value="add">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" value="${param.name}" required 
                               maxlength="50" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="${param.email}" required 
                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                               placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" value="${param.phone}"
                               pattern="[0-9]{10}" placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label for="role">Role</label>
                        <select id="role" name="role">
                            <c:forEach items="${roles}" var="role">
                                <option value="${role}" ${param.role == role ? 'selected' : ''}>
                                    ${fn:toUpperCase(fn:substring(role, 0, 1))}${fn:toLowerCase(fn:substring(role, 1, fn:length(role)))}
                                </option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn-submit">Add User</button>
            </form>
        </div>

        <!-- User Grid -->
        <div class="user-grid">
            <c:choose>
                <c:when test="${empty users}">
                    <div class="no-users">
                        <p>No users found. Add a new user to get started.</p>
                    </div>
                </c:when>
                <c:otherwise>
                    <c:forEach var="user" items="${users}">
                        <div class="user-card">
                            <h3>${fn:escapeXml(user.name)}</h3>
                            <div class="user-info">
                                <p><strong>Email:</strong> ${fn:escapeXml(user.email)}</p>
                                <p><strong>ID:</strong> ${user.id}</p>
                                <c:if test="${not empty user.phone}">
                                    <p><strong>Phone:</strong> 
                                        <fmt:formatNumber value="${user.phone}" pattern="###-###-####"/>
                                    </p>
                                </c:if>
                                <c:if test="${not empty user.role}">
                                    <p><strong>Role:</strong> 
                                        ${fn:toUpperCase(fn:substring(user.role, 0, 1))}${fn:toLowerCase(fn:substring(user.role, 1, fn:length(user.role)))}
                                    </p>
                                </c:if>
                                <p><strong>Created:</strong> 
                                    <fmt:formatDate value="${user.createdDate}" pattern="MMM dd, yyyy"/>
                                </p>
                            </div>
                            <div class="action-buttons">
                                <c:url value="/user" var="viewUrl">
                                    <c:param name="action" value="view"/>
                                    <c:param name="id" value="${user.id}"/>
                                </c:url>
                                <c:url value="/user" var="editUrl">
                                    <c:param name="action" value="edit"/>
                                    <c:param name="id" value="${user.id}"/>
                                </c:url>
                                <a href="${viewUrl}" class="btn btn-view">View Details</a>
                                <a href="${editUrl}" class="btn btn-edit">Edit</a>
                            </div>
                        </div>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
        </div>
        
        <!-- Pagination -->
        <c:if test="${not empty users}">
            <div class="pagination">
                <c:forEach begin="1" end="${totalPages}" var="page">
                    <c:url value="/user" var="pageUrl">
                        <c:param name="page" value="${page}"/>
                    </c:url>
                    <a href="${pageUrl}" class="page-link ${currentPage == page ? 'active' : ''}">${page}</a>
                </c:forEach>
            </div>
        </c:if>
    </div>
</body>
</html>
