# Mail Service Application

A robust mail service application built with React for the frontend and Spring Boot for the backend. This application allows users to send emails with optional attachments. It features authentication and integrates with a backend API for handling email operations.

## Features

- **Send Emails:** Compose and send emails with or without attachments.
- **User Authentication:** Secure login to access the mail service.
- **Responsive Design:** User-friendly interface for various devices.
- **Error Handling:** Provides feedback for successful and failed email operations.

## Tech Stack

### Frontend
- **React:** JavaScript library for building user interfaces.
- **Recoil:** State management library for React.
- **Axios:** HTTP client for making API requests.
- **React Hot Toast:** For displaying toast notifications.
- **Tailwind CSS:** Utility-first CSS framework for styling.

### Backend
- **Spring Boot:** Framework for building Java-based applications.
- **JavaMailSender:** For sending emails.
- **JWT Authentication:** Secure user authentication.
- **PostgreSQL:** Database for storing user and mail data.

## Setup

### Prerequisites

- **Node.js** and **npm** for frontend dependencies.
- **Java 11+** and **Maven** for backend dependencies.
- **PostgreSQL** for database setup.
- **Spring Boot** application running on `http://localhost:5000`.

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Access the application at `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Update `application.properties` with your PostgreSQL database credentials.

3. Build and run the Spring Boot application:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

4. Ensure the application is running on `http://localhost:5000`.

## API Endpoints

- **POST** `/api/auth/login` - Authenticate users.
- **POST** `/api/mail/send` - Send an email without attachment.
- **POST** `/api/mail/send/attachment` - Send an email with an attachment.

## Usage

1. Navigate to the login page and authenticate using your credentials.
2. Once logged in, use the mail form to compose and send emails.
3. Check the email sending status through toast notifications.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact ak.ayush811311@gmail.com.
