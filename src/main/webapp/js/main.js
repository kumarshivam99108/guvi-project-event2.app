// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }

        // Password validation
        if (input.type === 'password' && input.value) {
            if (input.value.length < 8) {
                isValid = false;
                showError(input, 'Password must be at least 8 characters long');
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.classList.remove('error');
}

// Dashboard Charts
function initializeDashboardCharts() {
    if (document.getElementById('eventsChart')) {
        const ctx = document.getElementById('eventsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Events per Month',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Event Registration
function handleEventRegistration(eventId) {
    // Show registration modal
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Set event ID in hidden field
        const eventIdInput = modal.querySelector('[name="eventId"]');
        if (eventIdInput) {
            eventIdInput.value = eventId;
        }
    }
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Ticket Price Calculation
function calculateTotal() {
    const quantity = document.getElementById('ticketQuantity').value;
    const price = document.getElementById('ticketPrice').value;
    const totalElement = document.getElementById('totalPrice');
    
    if (quantity && price && totalElement) {
        const total = (quantity * price).toFixed(2);
        totalElement.textContent = `$${total}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard charts if on dashboard page
    initializeDashboardCharts();
    
    // Add event listeners for ticket quantity changes
    const quantityInput = document.getElementById('ticketQuantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', calculateTotal);
    }
    
    // Initialize date pickers
    const datePickers = document.querySelectorAll('.date-picker');
    datePickers.forEach(picker => {
        flatpickr(picker, {
            enableTime: false,
            dateFormat: "Y-m-d"
        });
    });
    
    // Initialize time pickers
    const timePickers = document.querySelectorAll('.time-picker');
    timePickers.forEach(picker => {
        flatpickr(picker, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i"
        });
    });
});
