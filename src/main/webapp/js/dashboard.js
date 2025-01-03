// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (!isLoggedIn || !currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Update user information
    const userNameElement = document.querySelector('.user-profile h4');
    const userTypeElement = document.querySelector('.user-profile p');
    
    if (userNameElement) {
        userNameElement.textContent = `Welcome, ${currentUser.fullName}`;
    }
    if (userTypeElement) {
        userTypeElement.textContent = currentUser.userType.charAt(0).toUpperCase() + currentUser.userType.slice(1);
    }

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Mobile sidebar toggle
    const sidebarToggle = document.querySelector('.navbar-toggler');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }

    // Initialize charts for organizer dashboard
    if (document.getElementById('ticketSalesChart')) {
        const ticketSalesCtx = document.getElementById('ticketSalesChart').getContext('2d');
        new Chart(ticketSalesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Ticket Sales',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    borderColor: '#FFB347',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Ticket Sales'
                    }
                }
            }
        });
    }

    if (document.getElementById('revenueChart')) {
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [4500, 5900, 8000, 8100, 5600, 5500],
                    backgroundColor: '#FF69B4',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Revenue'
                    }
                }
            }
        });
    }

    // Handle event card interactions
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.role = 'alert';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const notificationContainer = document.querySelector('.notification-container');
        if (notificationContainer) {
            notificationContainer.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
    }

    // Example notification
    // showNotification('Welcome to your dashboard!', 'success');

    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Active link handling
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const eventCards = document.querySelectorAll('.event-card');
            
            eventCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // DOM Elements
    const sidebarToggleAttendee = document.querySelector('.sidebar-toggle');
    const sidebarAttendee = document.querySelector('.sidebar');
    const mainContentAttendee = document.querySelector('.main-content');
    const searchInputAttendee = document.getElementById('eventSearch');
    const categoryButtonsAttendee = document.querySelectorAll('.category-filter button');
    const upcomingEventsGridAttendee = document.getElementById('upcomingEvents');
    const recommendedEventsGridAttendee = document.getElementById('recommendedEvents');

    // Event Listeners
    document.addEventListener('DOMContentLoaded', initializeDashboardAttendee);
    sidebarToggleAttendee.addEventListener('click', toggleSidebarAttendee);
    searchInputAttendee.addEventListener('input', handleSearchAttendee);
    categoryButtonsAttendee.forEach(button => {
        button.addEventListener('click', handleCategoryFilterAttendee);
    });

    // Initialize Dashboard
    function initializeDashboardAttendee() {
        checkAuthenticationAttendee();
        loadUserDataAttendee();
        loadUpcomingEventsAttendee();
        loadRecommendedEventsAttendee();
        setupEventListenersAttendee();
    }

    // Authentication
    function checkAuthenticationAttendee() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

        if (!isLoggedIn || currentUser.userType !== 'attendee') {
            window.location.href = 'index.html';
            return;
        }
    }

    // User Data
    function loadUserDataAttendee() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        document.getElementById('userName').textContent = currentUser.fullName;
        document.getElementById('welcomeUserName').textContent = currentUser.fullName.split(' ')[0] + '!';
    }

    // Navigation
    function navigateToAttendee(section) {
        // Hide all sections
        document.querySelectorAll('.dashboard-content > section').forEach(s => {
            s.style.display = 'none';
        });
        
        // Show selected section
        document.querySelector(`#${section}`).style.display = 'block';
        
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.querySelector(`a[href="#${section}"]`)) {
                item.classList.add('active');
            }
        });
    }

    // Sidebar Toggle
    function toggleSidebarAttendee() {
        sidebarAttendee.classList.toggle('active');
        mainContentAttendee.classList.toggle('expanded');
    }

    // Notifications
    function toggleNotificationsAttendee() {
        const dropdown = document.getElementById('notificationsDropdown');
        dropdown.classList.toggle('show');
    }

    // User Menu
    function toggleUserMenuAttendee() {
        const dropdown = document.getElementById('userMenuDropdown');
        dropdown.classList.toggle('show');
    }

    // Event Search
    function handleSearchAttendee(e) {
        const searchTerm = e.target.value.toLowerCase();
        const events = document.querySelectorAll('.event-card');
        
        events.forEach(event => {
            const title = event.querySelector('.event-title').textContent.toLowerCase();
            const description = event.querySelector('.event-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    }

    // Category Filter
    function handleCategoryFilterAttendee(e) {
        const category = e.target.dataset.category;
        
        // Update active button
        categoryButtonsAttendee.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Filter events
        const events = document.querySelectorAll('.event-card');
        events.forEach(event => {
            if (category === 'all' || event.dataset.category === category) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    }

    // Load Events
    function loadUpcomingEventsAttendee() {
        // Sample upcoming events data
        const events = [
            {
                id: 1,
                title: 'Tech Conference 2024',
                date: '2024-01-15',
                time: '09:00 AM',
                location: 'San Francisco, CA',
                category: 'tech',
                image: 'assets/images/tech-conf.jpg',
                price: '$299'
            },
            {
                id: 2,
                title: 'Summer Music Festival',
                date: '2024-02-01',
                time: '04:00 PM',
                location: 'Austin, TX',
                category: 'music',
                image: 'assets/images/music-fest.jpg',
                price: '$149'
            }
        ];
        
        renderEventsAttendee(upcomingEventsGridAttendee, events);
    }

    function loadRecommendedEventsAttendee() {
        // Sample recommended events data
        const events = [
            {
                id: 3,
                title: 'Sports Championship',
                date: '2024-03-10',
                time: '02:00 PM',
                location: 'Chicago, IL',
                category: 'sports',
                image: 'assets/images/sports.jpg',
                price: '$199'
            },
            {
                id: 4,
                title: 'AI & ML Workshop',
                date: '2024-02-15',
                time: '10:00 AM',
                location: 'Online',
                category: 'tech',
                image: 'assets/images/workshop.jpg',
                price: '$99'
            }
        ];
        
        renderEventsAttendee(recommendedEventsGridAttendee, events);
    }

    // Render Events
    function renderEventsAttendee(container, events) {
        container.innerHTML = events.map(event => `
            <div class="event-card" data-category="${event.category}">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}">
                    <span class="event-category">${event.category}</span>
                </div>
                <div class="event-content">
                    <span class="event-date">
                        <i class="fas fa-calendar"></i> ${event.date} at ${event.time}
                    </span>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </p>
                    <div class="event-footer">
                        <span class="event-price">${event.price}</span>
                        <button class="btn-book" onclick="showEventDetails(${event.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Event Details
    function showEventDetails(eventId) {
        const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
        // Fetch event details and populate modal
        modal.show();
    }

    // Calendar
    function showEventCalendar() {
        const modal = new bootstrap.Modal(document.getElementById('calendarModal'));
        // Initialize calendar if needed
        modal.show();
    }

    // Booking
    function bookEvent() {
        // Handle event booking
        alert('Booking successful! Check your email for confirmation.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('eventDetailsModal'));
        modal.hide();
    }

    // Logout
    function handleLogout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.notifications-dropdown, .user-menu-dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Setup additional event listeners
    function setupEventListenersAttendee() {
        // Handle menu item clicks
        document.querySelectorAll('.menu-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('href').substring(1);
                navigateToAttendee(section);
            });
        });
    }
});
