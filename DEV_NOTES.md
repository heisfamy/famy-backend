# Development Notes

## Project Overview
This backend API was developed as part of the CST3144 coursework requirements. It provides a RESTful API for managing educational courses and processing student orders.

## Key Design Decisions

### Database Schema
- Used simple string IDs for lessons (e.g., "1", "2") for easier seeding and testing
- Orders collection stores lesson IDs and number of spaces as parallel arrays
- Added timestamp field to orders for tracking

### Search Implementation
- Chose regex-based search over MongoDB text indexes for simplicity
- Case-insensitive search across subject, location, price, and spaces fields
- Returns structured response with query, count, and results

### Image Handling
- Created placeholder SVG images with color-coded subjects
- Implemented static image middleware with proper caching headers
- Stored image attribution in sources.json for license compliance

### Middleware Architecture
- Custom logger middleware for debugging and monitoring
- Static image handler with error handling and MIME type detection
- CORS enabled for cross-origin requests from frontend

### API Design
- RESTful endpoints following standard conventions
- Comprehensive error handling with appropriate status codes
- JSON responses for all endpoints including errors

## Deployment Strategy
- Configured for Render.com deployment with render.yaml
- Environment variables for database connection and port
- Production-ready with proper error handling

## Testing Approach
- Postman collection provided for API testing
- cURL examples in README for quick testing
- Seed data script for consistent test data

## Future Improvements
- Add authentication and authorization
- Implement pagination for large datasets
- Add input validation middleware
- Create automated tests
- Add rate limiting for API protection

## Known Limitations
- Placeholder images used instead of real images (to keep zip size small)
- Basic search functionality (could be enhanced with fuzzy matching)
- No user authentication system
- No payment processing integration

## License
MIT License - Free to use for educational purposes
