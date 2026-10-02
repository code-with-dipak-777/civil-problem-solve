# Civic Connect - Backend Architecture & Requirements 🚀

Ye document Civic Connect ke frontend ko ek proper backend se connect karne ka pura plan aur structure define karta hai. Isme database schema, API routes, aur tech stack ki details di gayi hain.

## 🛠️ Recommended Tech Stack

- **Framework:** Node.js with Express.js (ya NestJS agar jyada structured chahiye)
- **Database:** MongoDB (Mongoose) ya PostgreSQL (Prisma ORM) - *Geo-location (coordinates) store karne ke liye dono achhe hain.*
- **Authentication:** JSON Web Tokens (JWT)
- **File Storage (Photos):** Cloudinary ya AWS S3
- **AI Integration (For Auto-Merge):** OpenAI API ya koi doosra Embedding Model (to detect duplicate issues using vector search aur distance).

---

## 🗄️ Database Schema Models

Frontend ke `src/types/index.ts` ke hisaab se, humein mainly 3 Collections/Tables chahiye:

### 1. User Model
Citizens aur Authorities ki details store karne ke liye.
- `id`: UUID / ObjectId
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `avatar`: String (URL)
- `role`: Enum ('Citizen', 'Authority', 'Admin')
- `district`: String
- `city`: String
- `badge`: String

### 2. Issue Model
Main complaints/reports store karne ke liye.
- `id`: UUID / ObjectId
- `complaintId`: String (e.g., "CMP-1024")
- `title`: String
- `description`: String
- `category`: Enum ('Pothole', 'Garbage', 'Streetlight', 'Drainage', 'Water Leakage', 'Road Damage', 'Other')
- `status`: Enum ('Pending', 'In Progress', 'Resolved', 'Rejected')
- `priority`: Enum ('High', 'Medium', 'Low')
- `location`: String (Address format)
- `landmark`: String (Optional)
- `district`: String
- `coordinates`:
  - `latitude`: Number
  - `longitude`: Number
- `photoUrl`: String
- `votes`: Number (Default: 0)
- `reportedBy`: Ref -> User.id
- `reportedOn`: Date
- `timeline`: Array of Objects
  - `date`: Date
  - `stage`: String
  - `note`: String
  - `department`: String
  - `isCompleted`: Boolean

### 3. Notification Model
Users ko updates dene ke liye.
- `id`: UUID / ObjectId
- `userId`: Ref -> User.id
- `title`: String
- `description`: String
- `type`: Enum ('status_update', 'official_response', 'merged', 'resolved', 'nearby', 'district_update')
- `isRead`: Boolean (Default: false)
- `date`: Date

---

## 🔗 REST API Endpoints

### 👤 Authentication
- `POST /api/auth/register` - Naya user banaye.
- `POST /api/auth/login` - Login karke JWT token de.
- `GET /api/auth/me` - Logged in user ki details laaye.

### 📝 Issues (Complaints)
- `POST /api/issues` - Naya issue report kare (Photo upload ke sath).
- `GET /api/issues` - Saare issues laye (with filters like category, status, district).
- `GET /api/issues/:id` - Ek specific issue ki details laye.
- `PATCH /api/issues/:id/status` - Issue ka status update kare (Authority only).
- `POST /api/issues/:id/upvote` - Issue par vote/support add kare.
- `POST /api/issues/:id/timeline` - Timeline event add kare.

### 📊 Analytics & Stats (Dashboard ke liye)
- `GET /api/stats/dashboard` - Overall dashboard stats (Total, Pending, Resolved) de.
- `GET /api/stats/district` - District-wise statistics de map aur charts ke liye.

### 🔔 Notifications
- `GET /api/notifications` - User ke saare notifications fetch kare.
- `PATCH /api/notifications/:id/read` - Notification ko 'read' mark kare.

---

## 🤖 AI Auto-Merge Logic (How it should work)

Jab bhi koi naya `Issue` create ho:
1. Backend naye issue ka `latitude` aur `longitude` check karega.
2. Database mein 100-200 meters ki radius mein mojood same `category` (e.g., Pothole) ke 'Pending' ya 'In Progress' issues find karega (MongoDB `$geoNear` ya PostGIS use karke).
3. OpenAI API (text embeddings) ko naye issue ka description aur as-paas ke issues ka description bhejega.
4. Agar AI bolta hai ki "Yes, they are the same issue", toh:
   - Naye issue ko purane wale mein merge kar dega.
   - Purane wale ka `votes` count +1 ho jayega.
   - Citizen ko "Merged" ka notification jayega.

---

## 🚀 Backend Setup Folder Structure (Recommendation)

Agar aap Node/Express use karte hain, toh kuch aisa structure banaye:

```text
backend/
├── src/
│   ├── config/         # DB connection, Cloudinary config
│   ├── controllers/    # API logic (authController, issueController)
│   ├── middlewares/    # authMiddleware, uploadMiddleware
│   ├── models/         # Mongoose models (User, Issue, Notification)
│   ├── routes/         # Express routes (authRoutes, issueRoutes)
│   ├── services/       # AI logic, external API calls
│   └── index.js        # Main server file
├── .env                # Environment variables
├── package.json
└── README.md
```

## 📝 Frontend me kya change karna hoga?
Abhi frontend mein `src/data/mock-data.ts` use ho raha hai. Backend banne ke baad:
1. `axios` ya Next.js `fetch` use karna hoga.
2. Zustand store (`src/store/`) mein data mock jagah API calls se aana chahiye.
3. `.env.local` mein `NEXT_PUBLIC_API_URL=http://localhost:5000/api` daalna hoga.
