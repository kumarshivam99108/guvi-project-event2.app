// Registration Handler

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const userData = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                password: formData.get('password'),
                userType: formData.get('userType') // 'organizer' or 'attendee'
            };

            // Store user data in localStorage (temporary solution)
            // In production, this should be handled by your backend
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect based on user type
            redirectToDashboard(userData.userType);
        });
    }
});

// Login handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // In production, verify credentials with backend
        // For demo, we'll check localStorage
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (storedUser.email === loginData.email && storedUser.password === loginData.password) {
            localStorage.setItem('isLoggedIn', 'true');
            redirectToDashboard(storedUser.userType);
        } else {
            showError('Invalid credentials');
        }
    });
}

// Redirect function
function redirectToDashboard(userType) {
    if (userType === 'organizer') {
        window.location.href = 'organizer-dashboard.html';
    } else if (userType === 'attendee') {
        window.location.href = 'attendee-dashboard.html';
    }
}

// Error display function
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.role = 'alert';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Check authentication status
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // If not logged in and trying to access dashboard
    if (!isLoggedIn && (window.location.href.includes('dashboard'))) {
        window.location.href = 'index.html';
    }
    
    // If logged in and on login/register page
    if (isLoggedIn && (window.location.href.includes('index.html'))) {
        redirectToDashboard(currentUser.userType);
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Initialize authentication check
checkAuth();
