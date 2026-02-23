# NextUp

A RESTful todo API with secure authentication, multi-device session management, and interactive API documentation.

## Technologies

- **Node.js** with **Express** — REST API framework
- **PostgreSQL** — relational database
- **JWT** — authentication and authorization
- **Argon2** — password hashing
- **Zod** — input validation and schema parsing
- **Swagger UI** — interactive API documentation (OpenAPI 3.1)
- **Refresh token rotation** — secure session management
- **SHA-256 hashed refresh tokens** — tokens stored hashed in DB

## Features

### Authentication
- Register and login with email and password
- JWT access token + refresh token
- Refresh token rotation on every use
- Multiple device/session login support
- View all active sessions
- Logout from a specific device
- Delete account

### Todos
- Create, read, update, and delete todos
- All todo routes are protected

## Getting Started

#### 1. Clone the repository
```bash
git clone https://github.com/rezanoohi/NextUp.git
cd NextUp
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create `.env` file and fill in the environment variables
```env
SERVER_PORT=

DB_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRES_IN=
REFRESH_TOKEN_EXPIRES_IN= # e.g. 7d
```

#### 4. Run the server
```bash
npm start
```

## API Documentation

After starting the server, interactive API documentation is available at:

```
http://localhost:{SERVER_PORT}/api-docs
```
