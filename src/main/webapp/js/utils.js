// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function isAuthenticated() {
    return !!getAuthToken();
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

// Error handling
function handleApiError(error) {
    console.error('API Error:', error);
    if (error.status === 401) {
        logout();
    }
    return Promise.reject(error);
}
