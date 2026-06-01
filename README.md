# YC Directory — Pitch, Vote and Grow

A modern startup pitch platform where entrepreneurs can submit ideas, discover other startups, and connect with fellow founders.

## Tech Stack

- **Framework**: Next.js 15 (React 19) with App Router
- **Language**: TypeScript
- **CMS**: Sanity (headless, with live preview)
- **Auth**: NextAuth v5 — GitHub OAuth
- **Styling**: Tailwind CSS + shadcn/ui
- **Validation**: Zod
- **Error Tracking**: Sentry
- **Font**: Work Sans

## Features

- Browse and search startup pitches by title, category, or author
- Submit a startup pitch with a markdown editor
- View individual pitch pages with rendered markdown content
- User profiles showing all pitches from a given author
- View counter that increments on each pitch page visit
- Editor Picks — curated playlist of recommended startups
- GitHub OAuth authentication with automatic Sanity user sync
- Partial Pre-Rendering (PPR) via Next.js experimental features

## Project Structure

```
app/
├── (root)/
│   ├── page.tsx              # Home — startup listing + search
│   ├── startup/
│   │   ├── create/page.tsx  # Create pitch (auth required)
│   │   └── [id]/page.tsx    # Startup detail with pitch + views
│   └── user/[id]/page.tsx   # Author profile + their pitches
├── api/auth/[...nextauth]/   # NextAuth route handler
components/
├── Navbar.tsx
├── StartupCard.tsx
├── StartupForm.tsx           # Pitch form with markdown editor
├── View.tsx                  # View counter component
sanity/
├── schemaTypes/              # Startup, Author, Playlist schemas
├── lib/                      # GROQ queries, clients, image builder
lib/
├── actions.ts                # createPitch server action
├── validation.ts             # Zod schema for pitch form
└── utils.ts                  # Helpers: cn, formatDate, parseResponse
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://www.sanity.io/) project
- A GitHub OAuth App

### Environment Variables

Create a `.env.local` file at the root:

```env
# NextAuth
AUTH_SECRET=your_nextauth_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token

# Sentry (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

To access the Sanity Studio, navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typegen` | Generate Sanity TypeScript types |

## Data Models

**Startup** — title, slug, description, category, image URL, markdown pitch, view count, author reference

**Author** — GitHub ID, name, username, email, bio, avatar (synced on first login)

**Playlist** — title, slug, curated list of startup references (used for Editor Picks)

## Deployment

Deploy to [Vercel](https://vercel.com) with zero configuration. Set the environment variables in your Vercel project settings.

Make sure to add your production domain to your GitHub OAuth App's authorized callback URLs:

```
https://your-domain.com/api/auth/callback/github
```
