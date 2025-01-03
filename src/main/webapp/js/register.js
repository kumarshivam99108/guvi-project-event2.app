// Function to handle registration form submission
function handleRegistration(event) {
    event.preventDefault();

    // Get form data
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    // Create user object
    const user = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
        userType: formData.get('userType')
    };

    // Store user data (in production, this would be sent to a server)
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect based on user type
    if (user.userType === 'organizer') {
        window.location.href = 'organizer-dashboard.html';
    } else if (user.userType === 'attendee') {
        window.location.href = 'attendee-dashboard.html';
    }

    return false;
}

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // In production, this would verify with a server
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect based on user type
        if (storedUser.userType === 'organizer') {
            window.location.href = 'organizer-dashboard.html';
        } else if (storedUser.userType === 'attendee') {
            window.location.href = 'attendee-dashboard.html';
        }
    } else {
        showError('Invalid email or password');
    }

    return false;
}

// Function to show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;

    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Function to show login form
function showLoginForm() {
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

// Function to show registration form
function showRegisterForm() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
}

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (isLoggedIn === 'true') {
        // Redirect to appropriate dashboard
        if (currentUser.userType === 'organizer') {
            window.location.href = 'organizer-dashboard.html';
        } else if (currentUser.userType === 'attendee') {
            window.location.href = 'attendee-dashboard.html';
        }
    }
}

// Initialize auth check when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});
