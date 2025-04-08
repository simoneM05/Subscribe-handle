# Subscribe-handle

A subscription management REST API built with Node.js, Express, TypeScript, Prisma, and Redis.

## Features

- User Authentication (JWT-based)
- Subscription Management
  - Create subscriptions
  - Read subscription details
  - Update subscription information
  - Delete subscriptions
- Pagination support for subscription listing
- Token blacklisting for logout
- Error handling middleware
- Input validation using Joi
- Database integration with Prisma
- Redis for token management

## Prerequisites

- Node.js
- PostgreSQL
- Redis
- TypeScript

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your_postgresql_connection_string"
PORT=3000
JWT_SECRET="your_jwt_secret"
```

# Subscribe-handle

A subscription management REST API built with Node.js, Express, TypeScript, Prisma, and Redis.

## Features

- User Authentication (JWT-based)
- Subscription Management
  - Create subscriptions
  - Read subscription details
  - Update subscription information
  - Delete subscriptions
- Pagination support for subscription listing
- Token blacklisting for logout
- Error handling middleware
- Input validation using Joi
- Database integration with Prisma
- Redis for token management

## Prerequisites

- Node.js
- PostgreSQL
- Redis
- TypeScript

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your_postgresql_connection_string"
PORT=3000
JWT_SECRET="your_jwt_secret"
 ```
```

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
 ```

2. Install dependencies:
```bash
npm install
 ```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
 ```

4. Start the server:
```bash
npm run dev
 ```

## API Endpoints
### User Management
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- POST /api/users/logout - Logout user
### Subscription Management
- POST /api/subs/addSub - Create a new subscription
- GET /api/subs/getSub/:id - Get subscription by ID
- GET /api/subs/getSubs/?page=n - Get paginated list of subscriptions
- PUT /api/subs/editSub/:id - Update subscription
- DELETE /api/subs/deleteSub/:id - Delete subscription
## Authentication
The API uses JWT for authentication. Include the token in the Authorization header:

```plaintext
Authorization: Bearer <your_token>
 ```

## Testing
Run tests using:

```bash
npm test
 ```

## Project Structure
```plaintext
src/
├── config/         # Configuration files
├── controller/     # Request handlers
├── error/         # Error handling and validation
├── interface/     # TypeScript interfaces
├── middleware/    # Express middlewares
├── repositories/  # Data access layer
├── Router/        # API routes
├── services/      # Business logic
├── Test/          # Test files
└── utils/         # Utility functions
 ```


## Error Handling
The API implements centralized error handling with custom ApiError class and middleware.

## Data Models
### User
- email (unique)
- password (hashed)
- id
### Subscription
- name
- price
- renewal date
- type (monthly/yearly)
- active status
- user association
## License
MIT License

## Contributing
1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
