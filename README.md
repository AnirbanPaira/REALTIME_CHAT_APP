# RealTime Chat App

A full-stack real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io.

## 🚀 Features

- **Real-time messaging** with Socket.io
- **User authentication** (signup, login, logout) with JWT
- **Online user tracking**
- **Image uploads** via Cloudinary
- **Responsive design** with Tailwind CSS
- **Modern UI** with smooth animations

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS + DaisyUI
- Socket.io Client
- Zustand (state management)
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- Cloudinary
- Cookie Parser

## 📁 Project Structure

```
REALTIME_CHAT_APP/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── lib/            # Database & socket connections
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Entry point
│   ├── package.json
│   ├── Dockerfile
│   └── Procfile
├── frontend/RealTimeChaatapp/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/            # Axios configuration
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   └── App.jsx
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── deploy.sh
└── DEPLOYMENT_GUIDE.md
```

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- Cloudinary account (free)

### Environment Setup

1. **Backend environment:**
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` with your:
   - MongoDB connection string
   - JWT secret
   - Cloudinary credentials
   - Client URL (frontend URL after deployment)

2. **Frontend environment:**
   ```bash
   cp frontend/RealTimeChaatapp/.env.example frontend/RealTimeChaatapp/.env
   ```
   Set `VITE_API_URL` to your backend URL.

### Option 1: Deploy to Render + Vercel (Recommended)

1. **Deploy Backend:**
   - Push code to GitHub
   - Go to [Render](https://render.com)
   - Create Web Service → Connect GitHub repo
   - Root Directory: `backend`
   - Add environment variables from `.env`
   - Deploy

2. **Deploy Frontend:**
   - Go to [Vercel](https://vercel.com)
   - Import GitHub repo
   - Root Directory: `frontend/RealTimeChaatapp`
   - Add `VITE_API_URL` env var (backend URL)
   - Deploy

3. **Update CORS:**
   - Add frontend URL to backend's `CLIENT_URL` env var
   - Redeploy backend

### Option 2: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or for production
docker-compose -f docker-compose.yml up -d
```

### Option 3: Render One-Click

Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🧑‍💻 Development

```bash
# Install dependencies
cd backend && npm install
cd ../frontend/RealTimeChaatapp && npm install

# Start development servers
cd ../..
npm run dev
```

## 📦 API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status
- `PUT /api/auth/update-profile` - Update profile

### Messages
- `GET /api/messages/:userId` - Get conversation
- `POST /api/messages/send/:receiverId` - Send message
- `POST /api/messages/send-image/:receiverId` - Send image

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODBURI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `CLIENT_URL` | Frontend URL for CORS | Yes (production) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Happy Chatting! 💬**

