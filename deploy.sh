#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 RealTime Chat App - Deployment Script${NC}"
echo "================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${GREEN}📋 Deployment Steps:${NC}"
echo ""
echo "1. Database Setup (MongoDB Atlas)"
echo "   - Go to https://cloud.mongodb.com"
echo "   - Create a free cluster"
echo "   - Create a database user"
echo "   - Get your connection string"
echo ""
echo "2. Cloudinary Setup"
echo "   - Go to https://cloudinary.com"
echo "   - Create a free account"
echo "   - Get your API credentials"
echo ""
echo "3. Backend Deployment"
echo "   - Push code to GitHub"
echo "   - Go to https://render.com"
echo "   - Create a new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Set root directory: backend"
echo "   - Add environment variables (see backend/.env.example)"
echo ""
echo "4. Frontend Deployment"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set root directory: frontend/RealTimeChaatapp"
echo "   - Add VITE_API_URL environment variable"
echo ""
echo "5. Update CORS"
echo "   - Add your frontend URL to backend's CLIENT_URL env var"
echo "   - Redeploy backend"
echo ""

# Check for required tools
echo -e "${GREEN}🔍 Checking prerequisites...${NC}"

if command_exists node; then
    echo -e "${GREEN}✓ Node.js is installed${NC}"
    node --version
else
    echo -e "${RED}✗ Node.js is not installed${NC}"
fi

if command_exists git; then
    echo -e "${GREEN}✓ Git is installed${NC}"
else
    echo -e "${RED}✗ Git is not installed${NC}"
fi

echo ""
echo -e "${GREEN}📦 Building frontend...${NC}"
if [ -d "frontend/RealTimeChaatapp" ]; then
    cd frontend/RealTimeChaatapp
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend built successfully${NC}"
    else
        echo -e "${RED}✗ Frontend build failed${NC}"
    fi
    cd ../..
else
    echo -e "${RED}✗ Frontend directory not found${NC}"
fi

echo ""
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Copy backend/.env.example to backend/.env and fill in your values"
echo "2. Copy frontend/RealTimeChaatapp/.env.example to frontend/RealTimeChaatapp/.env"
echo "3. Push your code to GitHub"
echo "4. Deploy backend to Render/Railway"
echo "5. Deploy frontend to Vercel"
echo "6. Update CLIENT_URL in backend env vars with your frontend URL"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"

