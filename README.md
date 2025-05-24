# Project Management System

A comprehensive project management application with budget and resource tracking capabilities. This full-stack application is built with Spring Boot on the backend and React with TypeScript on the frontend.

## Project Overview

This application provides a robust platform for managing projects, including budgets, resources, employees, and tasks. It features user authentication via JWT tokens, role-based access control, and real-time data visualization.

## Technology Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material UI (MUI) v7
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Development Tools**: ESLint, TypeScript

#### Frontend Structure

The frontend follows a component-based architecture with the following organization:
- `src/pages`: Main application pages/views
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks
- `src/services`: API service functions
- `src/context`: React context providers
- `src/types`: TypeScript type definitions

### Backend

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database Access**: Spring Data JPA
- **Database**: MySQL
- **Security**: Spring Security with JWT Authentication
- **Build Tool**: Maven
- **Additional Libraries**: Lombok (reduces boilerplate code)

#### Backend Structure

The backend follows a layered architecture:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Interface with the database
- **Models/Entities**: Represent database tables
- **DTOs**: Data Transfer Objects for request/response
- **Security**: JWT authentication and authorization

## Getting Started

### Prerequisites

- Java 17
- Node.js (latest LTS version)
- MySQL Database
- Maven

### Backend Setup

1. Clone the repository
   ```
   git clone https://github.com/AmineGazweni1/Gestion-des-Projets-avec-Budgets-et-Ressources-
   ```

2. Navigate to the backend directory
   ```
   cd JeeProject/backend
   ```

3. Configure your MySQL database in `src/main/resources/application.properties`

4. Build and run the Spring Boot application
   ```
   mvn spring-boot:run
   ```

5. The backend API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory
   ```
   cd ../frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. The frontend application will be available at `http://localhost:5173`

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Project Management**: Create, update, and delete projects
- **Resource Allocation**: Assign employees to projects and track their time
- **Budget Tracking**: Monitor project budgets and expenses
- **Role-Based Access Control**: Different permissions for administrators, managers, and employees
- **Reporting**: Generate reports on project status, budget utilization, and resource allocation
- **Responsive UI**: Modern interface that works on desktop and mobile devices

## API Endpoints

The backend exposes RESTful API endpoints for:

- Authentication (login, register, refresh token)
- User management
- Project operations
- Budget management
- Resource allocation
- Employee management

## Deployment

### Backend Deployment

The Spring Boot application can be deployed as a JAR file to any Java-compatible server or cloud platform.

```
mvn clean package
java -jar target/projectmanagement-1.0-SNAPSHOT.jar
```

### Frontend Deployment

The React application can be built for production using:

```
npm run build
```

This generates static files in the `dist` directory that can be served by any web server.

## Development

### Development Workflow

1. Create a new branch for each feature or fix
2. Implement the changes
3. Run tests and ensure code quality
4. Submit a pull request for review

### Backend Development

- Use Spring Boot DevTools for hot reloading
- Follow RESTful API design principles
- Ensure proper security measures for all endpoints

### Frontend Development

- Follow React best practices and component design patterns
- Use TypeScript for type safety
- Implement responsive design with Material UI
- Use React Query for efficient data fetching and caching

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Spring Boot and React communities
- All open-source libraries used in this project
