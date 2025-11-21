# Course Management System - Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing educational courses and orders.

## Features

- **Lesson Management**: CRUD operations for course lessons
- **Order Processing**: Create and manage student orders
- **Search Functionality**: Server-side search across multiple fields
- **Image Serving**: Static image middleware for lesson thumbnails
- **Request Logging**: Comprehensive request/response logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/heisfamy/famy-backend.git
cd afam-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB credentials:
```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
PORT=3000
```

4. Seed the database with sample data:
```bash
node utils/seed.js
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your .env file)

## API Endpoints

### Health Check
- **GET /** - Returns API status and available endpoints

### Lessons
- **GET /lessons** - Get all lessons
- **GET /lessons/:id** - Get a specific lesson by ID
- **PUT /lessons/:id** - Update a lesson (updates spaces after order)

### Orders
- **POST /orders** - Create a new order
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "lessonIDs": ["1", "2"],
    "numSpaces": [2, 1]
  }
  ```

### Search
- **GET /search?q=query** - Search lessons by subject, location, price, or spaces

### Images
- **GET /images/:filename** - Serve lesson images

## Example cURL Commands

### Get all lessons:
```bash
curl http://localhost:3000/lessons
```

### Search for lessons:
```bash
curl "http://localhost:3000/search?q=math"
```

### Create an order:
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "phone": "9876543210",
    "lessonIDs": ["1"],
    "numSpaces": [1]
  }'
```

### Update lesson spaces:
```bash
curl -X PUT http://localhost:3000/lessons/1 \
  -H "Content-Type: application/json" \
  -d '{"spaces": 5}'
```

## Project Structure

```
afam-backend/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (not in repo)
├── .gitignore         # Git ignore file
├── middleware/        # Custom middleware
│   ├── logger.js      # Request logging
│   └── staticImage.js # Image serving
├── routes/            # API route handlers
│   ├── lessons.js     # Lesson endpoints
│   ├── orders.js      # Order endpoints
│   └── search.js      # Search endpoint
├── utils/             # Utility functions
│   ├── database.js    # MongoDB connection
│   └── seed.js        # Database seeding
├── data/              # Data files
│   └── lessons-seed.json # Sample lesson data
└── images/            # Lesson images
    └── sources.json   # Image attribution info
```

## Deployment

This API is configured for deployment on Render.com:

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy!

The deployed API is available at: `https://famy-backend.onrender.com`

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Native Driver** - Database connectivity
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## License

MIT
