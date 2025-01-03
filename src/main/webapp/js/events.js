// Event management related functions
async function fetchEvents() {
    try {
        const response = await fetch('/api/events', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        showError('Failed to load events');
    }
}

function displayEvents(events) {
    const eventContainer = document.getElementById('events-container');
    eventContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">${event.description}</p>
            <p class="card-text">
                <small class="text-muted">Date: ${new Date(event.date).toLocaleDateString()}</small>
            </p>
            <button class="btn btn-primary" onclick="registerForEvent(${event.event_id})">
                Register
            </button>
        </div>
    `;
    return card;
}

async function registerForEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Successfully registered for the event!');
        } else {
            showError(data.message || 'Failed to register for event');
        }
    } catch (error) {
        console.error('Error registering for event:', error);
        showError('An error occurred while registering');
    }
}

function showError(message) {
    // Implement error notification
    alert(message);
}

function showSuccess(message) {
    // Implement success notification
    alert(message);
}

// Event Data Management
class EventManager {
    constructor() {
        this.events = [];
        this.favorites = new Set();
    }

    // Load events from API/localStorage
    async loadEvents() {
        // Simulated API call
        this.events = [
            {
                id: 1,
                title: 'Tech Conference 2024',
                description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
                date: '2024-01-15',
                time: '09:00 AM',
                location: 'San Francisco, CA',
                category: 'tech',
                image: 'assets/images/tech-conf.jpg',
                price: 299,
                capacity: 1000,
                registered: 750,
                speakers: [
                    { name: 'John Smith', role: 'CEO, Tech Corp' },
                    { name: 'Sarah Johnson', role: 'AI Research Lead' }
                ]
            },
            {
                id: 2,
                title: 'Summer Music Festival',
                description: 'Experience an unforgettable day of live music performances from top artists across multiple genres.',
                date: '2024-02-01',
                time: '04:00 PM',
                location: 'Austin, TX',
                category: 'music',
                image: 'assets/images/music-fest.jpg',
                price: 149,
                capacity: 5000,
                registered: 3500,
                performers: [
                    'The Rock Band',
                    'Electronic Dreams',
                    'Jazz Ensemble'
                ]
            },
            {
                id: 3,
                title: 'Sports Championship',
                description: 'Watch the ultimate showdown between top teams competing for the championship title.',
                date: '2024-03-10',
                time: '02:00 PM',
                location: 'Chicago, IL',
                category: 'sports',
                image: 'assets/images/sports.jpg',
                price: 199,
                capacity: 20000,
                registered: 15000,
                teams: [
                    'Chicago Bulls',
                    'LA Lakers'
                ]
            },
            {
                id: 4,
                title: 'AI & ML Workshop',
                description: 'Learn the latest in Artificial Intelligence and Machine Learning from industry experts.',
                date: '2024-02-15',
                time: '10:00 AM',
                location: 'Online',
                category: 'tech',
                image: 'assets/images/workshop.jpg',
                price: 99,
                capacity: 500,
                registered: 350,
                requirements: [
                    'Basic Python knowledge',
                    'Laptop with minimum 8GB RAM'
                ]
            }
        ];

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('eventFavorites');
        if (savedFavorites) {
            this.favorites = new Set(JSON.parse(savedFavorites));
        }
    }

    // Get event by ID
    getEvent(id) {
        return this.events.find(event => event.id === id);
    }

    // Toggle favorite status
    toggleFavorite(eventId) {
        if (this.favorites.has(eventId)) {
            this.favorites.delete(eventId);
        } else {
            this.favorites.add(eventId);
        }
        localStorage.setItem('eventFavorites', JSON.stringify([...this.favorites]));
        return this.favorites.has(eventId);
    }

    // Get favorite events
    getFavorites() {
        return this.events.filter(event => this.favorites.has(event.id));
    }

    // Filter events by category
    filterByCategory(category) {
        if (category === 'all') return this.events;
        return this.events.filter(event => event.category === category);
    }

    // Search events
    searchEvents(query) {
        query = query.toLowerCase();
        return this.events.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        );
    }

    // Book event
    async bookEvent(eventId, userData) {
        const event = this.getEvent(eventId);
        if (!event) throw new Error('Event not found');
        if (event.registered >= event.capacity) {
            throw new Error('Event is fully booked');
        }

        // Simulated booking process
        return new Promise((resolve) => {
            setTimeout(() => {
                event.registered++;
                // Add to user's booked events in localStorage
                const bookedEvents = JSON.parse(localStorage.getItem('bookedEvents') || '[]');
                bookedEvents.push({
                    eventId,
                    bookingDate: new Date().toISOString(),
                    ...userData
                });
                localStorage.setItem('bookedEvents', JSON.stringify(bookedEvents));
                resolve({
                    success: true,
                    message: 'Booking successful',
                    ticketId: `TICKET-${Date.now()}`
                });
            }, 1000);
        });
    }

    // Get user's booked events
    getBookedEvents() {
        const bookedEvents = JSON.parse(localStorage.getItem('bookedEvents') || '[]');
        return bookedEvents.map(booking => ({
            ...booking,
            eventDetails: this.getEvent(booking.eventId)
        }));
    }
}

// Initialize Event Manager
const eventManager = new EventManager();

// Event Detail Modal Functions
function showEventDetails(eventId) {
    const event = eventManager.getEvent(eventId);
    if (!event) return;

    const modalBody = document.querySelector('#eventDetailsModal .modal-body');
    modalBody.innerHTML = `
        <div class="event-detail-content">
            <div class="event-detail-header">
                <img src="${event.image}" alt="${event.title}" class="event-detail-image">
                <div class="event-detail-info">
                    <h2>${event.title}</h2>
                    <p class="event-detail-meta">
                        <i class="fas fa-calendar"></i> ${event.date} at ${event.time}<br>
                        <i class="fas fa-map-marker-alt"></i> ${event.location}<br>
                        <i class="fas fa-ticket-alt"></i> ${event.capacity - event.registered} spots remaining
                    </p>
                    <div class="event-price-tag">$${event.price}</div>
                </div>
            </div>
            <div class="event-detail-description">
                <h3>About This Event</h3>
                <p>${event.description}</p>
            </div>
            ${event.speakers ? `
                <div class="event-speakers">
                    <h3>Speakers</h3>
                    <div class="speakers-list">
                        ${event.speakers.map(speaker => `
                            <div class="speaker-card">
                                <div class="speaker-avatar">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="speaker-info">
                                    <h4>${speaker.name}</h4>
                                    <p>${speaker.role}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${event.performers ? `
                <div class="event-performers">
                    <h3>Performers</h3>
                    <ul>
                        ${event.performers.map(performer => `
                            <li>${performer}</li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            ${event.requirements ? `
                <div class="event-requirements">
                    <h3>Requirements</h3>
                    <ul>
                        ${event.requirements.map(req => `
                            <li>${req}</li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    modal.show();
}

// Initialize events when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    eventManager.loadEvents().then(() => {
        // Load initial events
        const upcomingEvents = document.getElementById('upcomingEvents');
        const recommendedEvents = document.getElementById('recommendedEvents');
        
        if (upcomingEvents) {
            renderEvents(upcomingEvents, eventManager.events.slice(0, 2));
        }
        
        if (recommendedEvents) {
            renderEvents(recommendedEvents, eventManager.events.slice(2));
        }
    });
});
