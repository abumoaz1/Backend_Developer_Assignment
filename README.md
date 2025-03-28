# User Profile Management API

A robust RESTful API for user profile management with JWT authentication built using Express.js and MongoDB.

## Assignment Overview

This is a backend development assignment focused on building a user profile management API with authentication. The API allows users to register, log in, and manage their profile information securely.

### Core Requirements
- User registration/profile creation
- Profile retrieval
- Profile update
- JWT authentication
- Protected routes (users can only access their own profiles)
- MongoDB database integration
- Comprehensive error handling

### User Profile Data
- **Required fields**: name, email, address, password (hashed)
- **Optional fields**: bio, profile picture URL

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: express-validator
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **CORS Support**: cors

## Project Structure

```
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   └── profile.controller.js # Profile management logic
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT authorization
│   │   └── error.middleware.js  # Error handling
│   ├── models/
│   │   └── user.model.js        # User schema and model
│   ├── routes/
│   │   ├── auth.routes.js       # Auth routes
│   │   └── profile.routes.js    # Profile routes
│   ├── utils/                   # Utility functions
│   └── server.js                # Express app entry point
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-profile-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env` with your configuration
   ```bash
   cp .env.example .env
   ```

4. Start MongoDB (if using local installation):
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

5. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth` - View auth documentation

### Profile Management
- **GET** `/api/profile` - Get user profile (requires authentication)
- **PUT** `/api/profile` - Update user profile (requires authentication)
- **DELETE** `/api/profile` - Delete user profile (requires authentication)
- **GET** `/api/profile/docs` - View profile documentation

### Documentation
- **GET** `/` - API root with documentation links
- **GET** `/api/test` - Test endpoint

## Postman Documentation

### 1. Register a User

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "address": "123 Main St"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "_id": "60f6e1a3c2dfa00015a7b3a4",
    "createdAt": "2023-03-28T14:23:15.123Z",
    "updatedAt": "2023-03-28T14:23:15.123Z"
  }
}
```

### 2. Login User

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "_id": "60f6e1a3c2dfa00015a7b3a4",
    "createdAt": "2023-03-28T14:23:15.123Z",
    "updatedAt": "2023-03-28T14:23:15.123Z"
  }
}
```

### 3. Get User Profile (Authenticated)

**Request:**
```http
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "bio": null,
    "profilePicture": null,
    "_id": "60f6e1a3c2dfa00015a7b3a4",
    "createdAt": "2023-03-28T14:23:15.123Z",
    "updatedAt": "2023-03-28T14:23:15.123Z"
  }
}
```

### 4. Update User Profile (Authenticated)

**Request:**
```http
PUT /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "John Doe Updated",
  "bio": "Software Developer",
  "address": "456 New St"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "name": "John Doe Updated",
    "email": "john@example.com",
    "address": "456 New St",
    "bio": "Software Developer",
    "profilePicture": null,
    "_id": "60f6e1a3c2dfa00015a7b3a4",
    "createdAt": "2023-03-28T14:23:15.123Z",
    "updatedAt": "2023-03-28T15:45:22.890Z"
  }
}
```

### 5. Delete User Profile (Authenticated)

**Request:**
```http
DELETE /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User profile deleted successfully"
}
```

## Data Models

### User Model

```javascript
{
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    trim: true
  }
}
```

## Authentication

This API uses JWT (JSON Web Token) for authentication. For protected routes:
1. Obtain a token by registering or logging in
2. Include the token in the `Authorization` header of your request
3. Format: `Authorization: Bearer <your-token>`

## Validation

Input validation is implemented using express-validator:
- Email validation
- Password length validation (minimum 6 characters)
- Required fields validation (name, email, password, address)

## Error Handling

The API implements comprehensive error handling:
- **Validation errors**: When input data doesn't pass validation
- **Authentication errors**: When token is invalid or missing
- **Database errors**: When there are issues with database operations
- **Generic server errors**: For unexpected server issues

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes (users can only access their own profiles)
- Input validation and sanitization
- CORS enabled
- Environment variables for sensitive information

## Troubleshooting

### Common Issues

1. **404 Not Found**: Ensure you're using the correct URL path. All API endpoints should start with `/api/`.

2. **401 Unauthorized**: For protected routes, make sure you're including the JWT token in the Authorization header with the format `Bearer <token>`.

3. **MongoDB Connection Issues**: Verify MongoDB is running and the connection string in your `.env` file is correct.

4. **Validation Errors**: Check your request body against the API documentation to ensure all required fields are provided and correctly formatted.

## Environment Variables

The project uses the following environment variables that should be defined in your `.env` file:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/user_profile_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

## Testing

Test the API with Postman or any HTTP client:
1. Register a user to obtain a JWT token
2. Use the token for authenticated routes
3. Test CRUD operations on user profile 