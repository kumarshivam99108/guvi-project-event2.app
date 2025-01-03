// Authentication related functions
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    // Clear previous error messages
    errorDiv.textContent = '';
    
    // Basic validation
    if (!username || !password) {
        errorDiv.textContent = 'Please fill in all fields';
        return false;
    }
    
    // You can add more validation rules here
    
    return true;
}

async function handleLogin(event) {
    event.preventDefault();
    
    if (!validateLoginForm()) {
        return;
    }
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token if using JWT
            localStorage.setItem('token', data.token);
            // Redirect based on user role
            window.location.href = data.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
        } else {
            document.getElementById('error-message').textContent = data.message || 'Login failed';
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
        console.error('Login error:', error);
    }
}

// Authentication functions

// Function to handle logout
function logout() {
    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Function to check if user is authenticated
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (!isLoggedIn || !currentUser) {
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// Function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
}

// Function to update user profile
function updateUserProfile(userData) {
    const currentUser = getCurrentUser();
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
}
