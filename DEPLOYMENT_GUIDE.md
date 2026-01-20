# RealTime Chat App - Deployment Guide

## Overview
This is a full-stack real-time chat application with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Socket.io
- **Database**: MongoDB (via MongoDB Atlas)
- **Image Storage**: Cloudinary

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

---

## Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and sign in
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Network Access: Add IP address `0.0.0.0/0` (allows all IPs)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password

---

## Step 2: Cloudinary Setup (for image uploads)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret

---

## Step 3: Environment Variables

### Backend (.env file)
Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB Atlas Connection String
MONGODBURI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/realtime-chat?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Client URL (update after frontend deployment)
CLIENT_URL=https://your-frontend.vercel.app

# Cloudinary (from Step 2)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env file)
Create a `.env` file in the `frontend/RealTimeChaatapp/` directory:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Step 4: Backend Deployment (Render)

### Option A: Render (Recommended - Free Tier Available)

1. Go to [Render](https://render.com/) and sign up
2. Connect your GitHub repository
3. Create a new Web Service:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node src/index.js`
4. Add Environment Variables (from Step 3)
5. Deploy

### Option B: Railway

1. Go to [Railway](https://railway.app/) and sign up
2. Create a new project from GitHub
3. Add MongoDB plugin (or use MongoDB Atlas)
4. Add Environment Variables
5. Deploy

### Option C: Fly.io

1. Install Fly CLI
2. Run `fly launch` in backend directory
3. Configure secrets and deploy

---

## Step 5: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/) and sign up
2. Import your GitHub repository
3. Configure:
   - Root Directory: `frontend/RealTimeChaatapp`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL (e.g., https://your-app.onrender.com)
5. Deploy

---

## Step 6: Update CORS Configuration

After deploying frontend, update backend `.env`:
```env
CLIENT_URL=https://your-frontend.vercel.app
```

Then redeploy the backend.

---

## Step 7: Testing

1. Open your frontend URL
2. Register a new user
3. Try sending messages
4. Test real-time functionality (open in two browsers)

---

## Quick Deploy Commands

### Build Frontend
```bash
cd frontend/RealTimeChaatapp
npm run build
```

### Test Backend Locally
```bash
cd backend
npm install
npm start
```

### Deploy to Render (if using CLI)
```bash
# Install render CLI
npm install -g render-cli

# Deploy
render deploy
```

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
- Check that frontend URL is exactly correct (no trailing slashes)

### MongoDB Connection Issues
- Verify IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure password doesn't contain special characters (or URL-encode them)

### Socket.io Not Working
- Verify `CLIENT_URL` environment variable in backend
- Check that frontend is using the correct API URL

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account configured
- [ ] Backend deployed with all environment variables
- [ ] Frontend deployed with VITE_API_URL
- [ ] CORS configured with production frontend URL
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Custom domain configured (optional)

---

## Alternative: Docker Deployment

Create a `Dockerfile` in the root:

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 5000
CMD ["node", "src/index.js"]
```

Then use docker-compose for full stack.

