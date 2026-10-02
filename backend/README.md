# CivicConnect Backend API 🚀

This is the official Node.js / Express backend for **CivicConnect**, an advanced hyper-local civic issue reporting platform.

## 🛠 Tech Stack

- **Node.js + Express.js**
- **TypeScript**
- **MongoDB + Mongoose** (Using Geospatial `$nearSphere` queries)
- **JWT + Bcrypt** for Authentication & Security
- **Zod** for Data Validation
- **Cloudinary** for Image Storage
- **OpenAI API** for AI Duplicate Detection
- **Helmet, CORS, Express-Rate-Limit** for API Security

## 📁 Project Structure

```text
src/
├── config/         # Database, Cloudinary, and Env variables
├── controllers/    # Route controllers
├── middlewares/    # Authentication, Role check, Error handling, File upload
├── models/         # Mongoose models (User, Issue, IssueVote, Notification)
├── routes/         # Express API routes
├── services/       # AI Duplicate logic and Cloudinary handlers
├── utils/          # Token generation, ID generation, API Response handler
├── validators/     # Zod schema definitions
├── app.ts          # Express App setup
└── server.ts       # Main entry point
```

## 🚀 Setup & Installation

### 1. Install Dependencies
```sh
npm install
```

### 2. Environment Variables
Create a `.env` file in the root of the backend folder and copy the contents from `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/civic-connect
JWT_SECRET=supersecretjwtkeythatshouldbechanged
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_api_key
AI_DUPLICATE_THRESHOLD=0.85
FRONTEND_URL=http://localhost:3000
```

### 3. Run Development Server
```sh
npm run dev
```

### 4. Build for Production
```sh
npm run build
npm start
```

## 🔗 Main Endpoints

### Health Check
- `GET /api/health` - Check if API is running.

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login.
- `GET /api/auth/me` - Get logged in user data.

### Issues
- `POST /api/issues` - Report an issue (Requires `photo` file upload).
- `GET /api/issues` - Get all issues (supports filtering, sorting, pagination).
- `GET /api/issues/nearby?latitude=...&longitude=...&radius=...` - Get nearby issues.
- `GET /api/issues/:id` - Get specific issue details.
- `PATCH /api/issues/:id/status` - Update issue status (Authority/Admin only).
- `POST /api/issues/:id/upvote` - Upvote an issue.
- `POST /api/issues/:id/timeline` - Add timeline event.

### Notifications
- `GET /api/notifications` - Get user notifications.
- `GET /api/notifications/unread-count` - Get unread count.
- `PATCH /api/notifications/read-all` - Mark all as read.
- `PATCH /api/notifications/:id/read` - Mark one as read.

### Stats
- `GET /api/stats/dashboard` - Get overall stats.
- `GET /api/stats/district` - Get stats per district.
