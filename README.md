# Somethings Backend

Backend API for the Somethings mentor matching app.

## Setup

```bash
npm install
npm run dev
```

The server runs on `http://localhost:3000`

## Endpoints

### Health Check
- `GET /` - Basic status
- `GET /api/health` - Health check

### Authentication
- `POST /api/login` - Login with email/password
  ```json
  {
    "email": "alex@example.com",
    "password": "password123"
  }
  ```

### Users
- `GET /api/users/:id` - Get user by ID

### Mentors
- `GET /api/mentors` - List all mentors
- `GET /api/mentors/:id` - Get mentor by ID (e.g., `mnt_001`)

### Matching
- `POST /api/match` - Find best mentor match
  ```json
  {
    "userId": "usr_001"
  }
  ```
  OR
  ```json
  {
    "traits": ["night_owl", "loves_music"],
    "preferences": ["anxiety", "relationships"]
  }
  ```

- `GET /api/match?traits=night_owl,loves_music&preferences=anxiety` - Query param version

## Test Users

| Email | Password |
|-------|----------|
| alex@example.com | password123 |
| jordan@example.com | jordan456 |
| taylor@example.com | taylor789 |

## Your Task

This codebase was written quickly and has issues. Your job is to:

1. **Identify and fix bugs** - Some endpoints don't work correctly
2. **Add proper error handling** - The API should handle edge cases gracefully
3. **Improve code quality** - Make it more maintainable and type-safe

We're looking for your ability to navigate unfamiliar code, debug issues, and write clean solutions.

Good luck!
