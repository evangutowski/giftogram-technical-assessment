# Giftogram Technical Assessment

## Name
Evan Gutowski

## Time to Complete
Approximately four hours. Three hours of planning and implementation. One hour of testing and bug fixing.

## Summary of Steps Taken
I started by reviewing the assessment's requirements and identifying the key features that I needed. This included a RESTful API, MySQL database, user authentication, messaging functionality, listing all users, and JSON responses.

I decided to use an existing framework rather than building the HTTP server from scratch because Express provides a basic server and routing functionality that I needed without adding unnecessary complexity to a relatively small API. This allowed me to focus on the assessment's requirements.

I planned the database structure before implementing the endpoints. I created a `users` table to store account information and a `messages` table to store messages between users. I used primary and foreign keys to establish relationships between the tables while also using a unique constraint to prevent duplicate email addresses from being used. I used MySQL Workbench for database creation, inspection, resetting, and verifying that tables were implemented properly. 

When it came to implementation of the backend, I started by getting the express server running. After that, I implemented each required endpoint one by one. In between adding the endpoint requirements, I tested each endpoint using the REST Client extension in VS Code with an HTTP file. This allowed me to perform integrationing test my code, while also verifying successful requests and expected errors.

## Issues With the Endpoints
No major issues were encountered during testing. All required endpoints were tested successfully, including both successful requests and expected errors.

## Suggested Improvements

### Security
- Hash user passwords instead of storing them as plain text.
- Add user authentication using sessions.
- Add authorization so users can only perform actions they are permitted to perform.
- Add stronger input validation.
- Add rate limiting to protect login and registration endpoints.
- Use HTTPS in a production environment.
- Avoid exposing sensitive database information through API error responses.
- Add email verification for newly registered users.

### Usability
- Add pagination to message history and user lists.
- Add more detailed input validation and user-friendly error messages.
- Add message timestamps in a user friendly format in addition to epoch time.
- Add functionality for users to delete or edit their own messages.
- Add password reset and account recovery functionality.

### API Design
- Add API versioning, such as `/api/v1`.
- Use middleware for request validation and authentication.
- Add automated unit and integration tests.
- Add API documentation,.
