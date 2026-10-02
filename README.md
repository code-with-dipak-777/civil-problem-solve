# Civic Connect 🏙️

Civic Connect is a modern, interactive web application designed to help citizens report and track civic issues in their city (such as potholes, garbage overflow, broken streetlights, etc.). This platform aims to bridge the gap between local administration and citizens by providing a transparent and efficient reporting system.

## 🌟 Key Features

- **Easy Reporting:** Citizens can easily report issues by taking photos, providing precise locations, and adding descriptions.
- **AI Auto-Merge:** The system uses AI to detect duplicate reports of similar issues in the same area and merges them to help authorities prioritize effectively.
- **Interactive Map:** A custom map view built with D3.js and Recharts allows you to see issues around you or filter them by specific districts (e.g., districts in Jharkhand).
- **Real-time Tracking:** Track the live status of your reports (Pending, In Progress, Resolved, Rejected) through a clear timeline.
- **Dashboard & Analytics:** Beautiful charts and statistics for both administrators and general users, showing issue distribution and resolution rates across different districts.
- **Premium UI/UX:** Features a sleek, modern glassmorphism design with smooth micro-animations using Framer Motion and Tailwind CSS.

## 💻 Tech Stack

This project is built using modern web technologies:

- **Frontend Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS (Modern Glassmorphism Design)
- **Icons:** Lucide React
- **Animations:** Framer Motion, GSAP
- **Charts & Maps:** Recharts, D3.js (Geomapping)
- **Forms & Validation:** React Hook Form, Zod
- **State Management:** Zustand
- **UI Components:** Shadcn UI (Base UI)

## 🚀 Getting Started

Follow these steps to run the project on your local machine:

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd civic-connect
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Folder Structure

- `src/app` - Next.js App Router pages (Dashboard, Report Issue, Authentication, etc.)
- `src/components` - Reusable UI components (Charts, Maps, Navbar, Sidebar, StatCards, etc.)
- `src/data` - Mock data for demonstrations (`mock-data.ts`) and GeoJSON files for maps.
- `src/store` - Zustand state management files.
- `src/types` - TypeScript type definitions and interfaces.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! If you want to make major changes, please open an issue first to discuss what you would like to change.

## 📜 License
This project is open-source and available under the MIT License.
