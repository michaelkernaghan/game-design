#!/bin/bash

echo "Stopping any existing servers..."

# More aggressive process cleanup
cleanup() {
    # Kill any Python HTTP servers
    pkill -f "python3 -m http.server"
    
    # Kill any Node.js processes running our server
    pkill -f "node.*server.js"
    
    # Direct port kills
    lsof -ti :3000 | xargs kill -9 2>/dev/null
    lsof -ti :8000 | xargs kill -9 2>/dev/null
    
    # Small delay to ensure ports are freed
    sleep 2
}

# Run cleanup
cleanup

echo "Starting backend server..."
cd src/backend
node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

echo "Starting frontend server..."
cd ../frontend
python3 -m http.server 8000 &
FRONTEND_PID=$!

echo "Servers started!"
echo "Backend running on http://localhost:3000"
echo "Frontend running on http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup on script exit
trap "cleanup; exit" INT TERM EXIT

# Keep script running
wait