# Portfolio Frontend

A modern, animated portfolio website built with React + Vite + Tailwind CSS, featuring a full admin panel to manage projects, services, profile, and messages.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State/Data:** TanStack React Query
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnimatedCounter.jsx   # Animated number counter
│   │   ├── Footer.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx    # JWT-protected route wrapper
│   │   └── PublicLayout.jsx      # Layout with Navbar + Footer
│   ├── hooks/
│   │   └── useTheme.js           # Dark/light mode hook
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   └── admin/
│   │       ├── ContactManager.jsx    # View/delete messages
│   │       ├── Dashboard.jsx         # Admin layout + sidebar
│   │       ├── DashboardOverview.jsx # Stats & activity feed
│   │       ├── Login.jsx             # Admin login
│   │       ├── ProfileManager.jsx    # Edit profile
│   │       ├── ProjectManager.jsx    # CRUD projects
│   │       └── ServiceManager.jsx    # CRUD services
│   ├── services/
│   │   └── api.js                # Axios instance + all API calls
│   ├── App.jsx                   # Routes + view counter
│   ├── index.css                 # Global styles
│   └── main.jsx
├── .env.example
├── vercel.json                   # Vercel SPA rewrite config
├── tailwind.config.js
└── package.json
```

---

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set this to your Render backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs on `http://localhost:5173`

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, skills, featured projects |
| `/about` | About | Bio, experience, skills |
| `/projects` | Projects | All projects with filters |
| `/services` | Services | Services offered |
| `/contact` | Contact | Contact form |
| `/admin/login` | Login | Admin login |
| `/admin/dashboard` | Dashboard | Stats overview |
| `/admin/projects` | ProjectManager | Add/edit/delete projects |
| `/admin/services` | ServiceManager | Manage services |
| `/admin/messages` | ContactManager | View/delete messages |
| `/admin/profile` | ProfileManager | Edit profile info |

---

## Admin Panel Features

- 📊 **Real-time stats** — Total views, project count, service count, message count
- 📋 **Recent activity feed** — Live log of admin actions with timestamps
- 🖼️ **Image upload** — Upload profile/project images to Cloudinary
- 🌙 **Dark/Light mode** — Persisted theme toggle
- 🔐 **JWT auth** — Protected admin routes

---

## Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Connect your GitHub repo, set **Root Directory** to `frontend`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy!

The `vercel.json` already handles SPA routing (all routes redirect to `index.html`).

> ⚠️ Make sure your backend's `FRONTEND_URL` env var is set to your Vercel URL to allow CORS.
