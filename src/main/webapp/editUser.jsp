<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit User - ${fn:escapeXml(user.name)}</title>
    <style>
        .edit-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-header {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
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
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .form-control:focus {
            border-color: #4CAF50;
            outline: none;
            box-shadow: 0 0 5px rgba(76,175,80,0.2);
        }
        .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        }
        .success-message {
            color: #28a745;
            font-size: 14px;
            margin-top: 5px;
        }
        .button-group {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
        }
        .btn-primary {
            background: #4CAF50;
            color: white;
        }
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .required::after {
            content: "*";
            color: #dc3545;
            margin-left: 4px;
        }
    </style>
</head>
<body>
    <%-- Include the header --%>
    <jsp:include page="/WEB-INF/jspf/header.jspf"/>

    <div class="edit-container">
        <div class="form-header">
            <h2>Edit User Profile</h2>
            <p>Last updated: 
                <c:choose>
                    <c:when test="${not empty user.lastUpdated}">
                        <fmt:formatDate value="${user.lastUpdated}" pattern="MMMM dd, yyyy HH:mm:ss"/>
                    </c:when>
                    <c:otherwise>
                        Not updated yet
                    </c:otherwise>
                </c:choose>
            </p>
        </div>

        <%-- Display Messages --%>
        <c:if test="${not empty successMessage}">
            <div class="success-message">${fn:escapeXml(successMessage)}</div>
        </c:if>
        <c:if test="${not empty errorMessage}">
            <div class="error-message">${fn:escapeXml(errorMessage)}</div>
        </c:if>

        <form action="<c:url value='/user'/>" method="post" id="editUserForm">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" value="${user.id}">

            <div class="form-group">
                <label for="name" class="required">Name</label>
                <input type="text" id="name" name="name" 
                       class="form-control ${not empty nameError ? 'is-invalid' : ''}"
                       value="${fn:escapeXml(user.name)}"
                       required maxlength="50"
                       pattern="^[A-Za-z\\s]{2,50}$"
                       title="Name should contain only letters and spaces, 2-50 characters">
                <c:if test="${not empty nameError}">
                    <div class="error-message">${fn:escapeXml(nameError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="email" class="required">Email</label>
                <input type="email" id="email" name="email" 
                       class="form-control ${not empty emailError ? 'is-invalid' : ''}"
                       value="${fn:escapeXml(user.email)}"
                       required
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
                <c:if test="${not empty emailError}">
                    <div class="error-message">${fn:escapeXml(emailError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" 
                       class="form-control ${not empty phoneError ? 'is-invalid' : ''}"
                       value="${user.phone}"
                       pattern="[0-9]{10}"
                       title="Please enter a valid 10-digit phone number">
                <c:if test="${not empty phoneError}">
                    <div class="error-message">${fn:escapeXml(phoneError)}</div>
                </c:if>
            </div>

            <div class="form-group">
                <label for="role" class="required">Role</label>
                <select id="role" name="role" class="form-control" required>
                    <c:forEach items="${roles}" var="roleOption">
                        <option value="${roleOption}" ${user.role eq roleOption ? 'selected' : ''}>
                            ${fn:toUpperCase(fn:substring(roleOption, 0, 1))}${fn:toLowerCase(fn:substring(roleOption, 1, -1))}
                        </option>
                    </c:forEach>
                </select>
                <c:if test="${not empty roleError}">
                    <div class="error-message">${fn:escapeXml(roleError)}</div>
                </c:if>
            </div>

            <div class="button-group">
                <c:url var="cancelUrl" value="/user">
                    <c:param name="action" value="view"/>
                    <c:param name="id" value="${user.id}"/>
                </c:url>
                <a href="${cancelUrl}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </div>

    <script>
        // Client-side validation
        document.getElementById('editUserForm').addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
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
