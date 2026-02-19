# Next Up


## Technologies
- **Node.js** with **Express** — REST API framework
- **PostgreSQL** — relational database
- **JWT** — authentication and authorization
- **Argon2 algorithm** — password hashing
- **Zod** — input validation and schema parsing
- **Refresh token rotation** — secure session management
- **SHA-256 hashed refresh tokens** — tokens stored hashed in DB

## Features
- JWT access token + refresh token
- Multiple device/session login support
- View all active sessions
- Logout from current device
- Delete account
---
- Create, read, update, and delete todos
- All todo routes are protected

## ENV
```
SERVER_PORT=
DB_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRES_IN=
REFRESH_TOKEN_EXPIRES_IN= # For example: 7d
```

## Getting started
#### Clone the repository
```bash
git clone https://github.com/rezanoohi/NextUp.git
```
#### Install dependencies
```bash
cd NextUp && npm i
```
#### Create .env file and fill in the [environment variables](#env)
#### Run the server
```bash
npm start
```
