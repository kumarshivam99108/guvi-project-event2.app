# Event Management System

A comprehensive web-based event management system built with Java EE, JSP, Servlets, and JSTL. This system allows users to create, manage, and participate in events with a modern and user-friendly interface.

## Features

### User Management
- User registration and authentication
- Role-based access control (Admin, Organizer, Attendee)
- Profile management with user details
- Password encryption for security

### Event Management
- Create and manage events
- Event categorization and tagging
- Event search and filtering
- Event registration and attendance tracking
- Event analytics and reporting

### Interface Features
- Modern, responsive design
- Interactive dashboard for organizers
- User-friendly navigation
- Form validation (client and server-side)
- Secure data handling

## Technology Stack

### Backend
- Java EE 8
- Servlets 4.0
- JSP (JavaServer Pages)
- JSTL (JavaServer Pages Standard Tag Library)
- MySQL Database

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Custom responsive design

### Build Tools & Dependencies
- Maven
- Apache Tomcat 9
- JDBC MySQL Connector
- JSTL 1.2

## Project Structure

```
event-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/eventmanagement/
│   │   │       ├── dao/
│   │   │       ├── model/
│   │   │       ├── servlet/
│   │   │       └── util/
│   │   ├── resources/
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   ├── jspf/
│   │       │   └── web.xml
│   │       ├── css/
│   │       ├── js/
│   │       └── *.jsp
│   └── test/
├── pom.xml
└── README.md
```

## Setup Instructions

1. Prerequisites:
   - JDK 8 or higher
   - Apache Maven 3.6+
   - MySQL 8.0+
   - Apache Tomcat 9

2. Database Setup:
   ```sql
   CREATE DATABASE event_management;
   USE event_management;
   -- Run the SQL scripts in src/main/resources/sql/
   ```

3. Configuration:
   - Update database credentials in `src/main/resources/db.properties`
   - Configure Tomcat server settings

4. Build & Deploy:
   ```bash
   mvn clean install
   # Deploy the generated WAR file to Tomcat
   ```

5. Access the Application:
   ```
   http://localhost:8080/event-management/
   ```

## Key Features Implementation

### User Authentication
- Secure password hashing
- Session management
- Remember-me functionality
- Password reset capability

### JSTL Integration
- Used for dynamic content rendering
- Enhanced security with XSS prevention
- Efficient data iteration and formatting
- Conditional content display

### Form Validation
- Client-side JavaScript validation
- Server-side Java validation
- Custom validation messages
- Input sanitization

### Security Features
- SQL injection prevention
- XSS protection
- CSRF tokens
- Secure password handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Bootstrap for the responsive design framework
- JSTL for enhanced JSP functionality
- Apache Tomcat team for the servlet container
- MySQL team for the database system

## Contact

Your Name -shivamkumar99108@gmail.com.com
Project Link: [https://github.com/kumarshivam99108/event-management](https://github.com/yourusername/event-management)

## Version History

- 1.0.0
  - Initial Release
  - Basic event management functionality
  - User authentication system
  - JSTL integration

## Future Enhancements

- Email notification system
- Payment gateway integration
- Advanced event analytics
- Mobile application
- Real-time chat feature
- Calendar integration
