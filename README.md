
<p align="center">
  <img src="https://img.shields.io/badge/ShowSphere-Movie%20Ticket%20Booking-dc2626?style=for-the-badge&logo=film&logoColor=white" alt="ShowSphere" />
</p>

<h1 align="center">🎬 ShowSphere</h1>

<p align="center">
  <strong>A Full-Stack Movie Ticket Booking Platform with Real-Time Seat Locking & Razorpay Payments</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-Payment%20Gateway-02042B?style=flat-square&logo=razorpay&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=flat-square&logo=clerk&logoColor=white" />
  <img src="https://img.shields.io/badge/Inngest-Background%20Jobs-4F46E5?style=flat-square" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite&logoColor=white" />
</p>

<p align="center">
  <a href="https://show-sphere-frontend.vercel.app/">
    <img src="https://img.shields.io/badge/🚀%20Try%20it%20Live-show--sphere--frontend.vercel.app-dc2626?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## 🌐 Live Demo

> **[👉 Click here to try ShowSphere live](https://show-sphere-frontend.vercel.app/)**

| | Link |
|---|---|
| 🖥️ **Frontend** | https://show-sphere-frontend.vercel.app/ |

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Core Logic](#-core-logic)
  - [Seat Locking System](#1--seat-locking-system)
  - [Razorpay Payment Integration](#2--razorpay-payment-integration)
  - [Inngest Background Jobs](#3--inngest-background-jobs)
  - [Clerk Auth & Role Management](#4--clerk-auth--role-management)
  - [TMDB API Integration](#5--tmdb-api-integration)
  - [Favorites System](#6--favorites-system)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)

---

## 🌟 Overview

**ShowSphere** is a production-ready, full-stack movie ticket booking platform. It integrates with **The Movie Database (TMDB)** to fetch live now-playing movies, allows admins to schedule shows with custom pricing, and enables users to browse movies, pick seats, and pay securely — all in a sleek, cinema-inspired dark UI.

> **The core problem it solves:** Preventing double-booking in real time.
>
> ShowSphere uses an **atomic seat reservation mechanism** — seats are locked in MongoDB the moment a user initiates payment. An **Inngest background job** then waits 10 minutes and automatically releases the seats if payment is not completed.

---

## ✨ Features

### 👤 User Features

- 🎬 **Browse Now Playing Movies** — Fetched live from TMDB API
- 🎥 **Movie Detail Page** — Overview, cast, genres, runtime, rating, and embedded YouTube trailer
- 📅 **Date & Time Selection** — Pick an available show slot for any movie
- 💺 **Interactive Seat Layout** — Visual 10-row × 9-column theatre grid with centre aisle
  - Real-time occupied seat fetching from the database
  - Maximum **5 seats per booking**
  - Hover animations & colour-coded seat states (**Available / Selected / Booked**)
- 💳 **Razorpay Payment Gateway** — Secure, HMAC-verified INR payments
- 📋 **My Bookings Page** — View booking history with payment status, seat numbers, and a **"Pay Now"** button for pending payments
- ❤️ **Favorites** — Add/remove movies to a personal watchlist (stored in Clerk private metadata)

### 🛡️ Admin Features

- 📊 **Dashboard** — Total bookings, total revenue, active shows, total users
- ➕ **Add Shows** — Select any now-playing movie → set ticket price → schedule multiple date/time slots in one form
- 📋 **List All Bookings** — View every user booking with full show, user, and seat details
- 🔐 **Role-Based Access Control** — Admin panel protected by Clerk `privateMetadata.role === "admin"`

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Core UI library |
| **Vite** | Lightning-fast build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router DOM v7** | Client-side routing |
| **Clerk React** | Authentication UI (Sign In / Sign Up / User Button) |
| **Razorpay JS SDK** | Client-side payment checkout modal |
| **Axios** | HTTP client for all API calls |
| **React Hot Toast** | Toast notifications |
| **React Player** | YouTube trailer embedding |
| **Swiper.js** | Carousel / slider components |
| **Lucide React** | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | NoSQL database & ODM |
| **Clerk Express** | JWT authentication middleware (`clerkMiddleware`) |
| **Razorpay Node SDK** | Server-side order creation & HMAC signature verification |
| **Inngest** | Durable background job execution (seat release, user sync) |
| **TMDB API (Axios)** | Fetch live now-playing movies, details, credits, trailers |
| **Cloudinary** | (Configured) Image upload support |
| **Crypto (Node built-in)** | HMAC-SHA256 payment signature verification |
| **dotenv** | Environment variable management |
| **Nodemon** | Dev server auto-restart |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────┐
│              CLIENT  (React 19 + Vite)                   │
│                                                          │
│  Home ─► Movies ─► MovieDetails ─► SeatLayout           │
│  MyBookings ─► Favourites                                │
│  Admin: Dashboard | AddShows | ListBookings              │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ Clerk Auth  │  │  AppContext  │  │ Razorpay Modal │  │
│  │ (JWT Token) │  │ (Global State│  │ window.Razorpay│  │
│  └─────────────┘  └──────────────┘  └────────────────┘  │
└────────────────────────┬─────────────────────────────────┘
                         │  HTTPS + Bearer Token
┌────────────────────────▼─────────────────────────────────┐
│              SERVER  (Express 5 + Node.js)               │
│                                                          │
│  /api/show     ─►  showController    ─►  TMDB API        │
│  /api/booking  ─►  bookingController ─►  Razorpay        │
│  /api/admin    ─►  adminController   ─►  protectAdmin    │
│  /api/user     ─►  userController    ─►  Clerk metadata  │
│  /api/inngest  ─►  Inngest serve()                       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │            MongoDB  (Mongoose)                   │    │
│  │    User  │  Movie  │  Show  │  Booking           │    │
│  └──────────────────────────────────────────────────┘    │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│              INNGEST  (Background Jobs)                   │
│                                                          │
│  clerk/user.created  ─►  Sync user to MongoDB            │
│  clerk/user.updated  ─►  Update user in MongoDB          │
│  clerk/user.deleted  ─►  Delete user from MongoDB        │
│  app/checkpayment    ─►  Release seats after 10 min      │
└──────────────────────────────────────────────────────────┘
```

---

## 🧠 Core Logic

### 1. 💺 Seat Locking System

This is the **most critical feature** of ShowSphere. The challenge: two users could select the same seat simultaneously.ShowSphere solves this with an **atomic seat reservation and timed release strategy**.


### How the reservation works step by step

```text
User selects seats → clicks "Proceed to Pay"
        │
        ▼
POST /api/booking/create-order
        │
        ├─ 1. Atomic MongoDB seat reservation
        │       updateOne(
        │         { seat free },
        │         { reserve seat }
        │       )
        │
        │       If another user already reserved
        │       the seat → request fails
        │
        ├─ 2. Create Booking document
        │       (isPaid: false)
        │
        ├─ 3. Trigger Inngest timeout workflow
        │
        ├─ 4. Create Razorpay order
        │
        └─ 5. Return order details to frontend
```


#### Atomic seat reservation

```js
const query = { _id: showId };
const update = {};

selectedSeats.forEach((seat) => {
  query[`occupiedSeats.${seat}`] = { $exists: false };
  update[`occupiedSeats.${seat}`] = userId;
});

const lockResult = await Show.updateOne(
  query,
  {
    $set: update
  }
);

if (lockResult.modifiedCount === 0) {
  throw new Error("Seat already reserved");
}
```

#### Why this prevents double booking

The seat availability check and seat reservation happen in a single MongoDB operation.

```js
Show.updateOne(
  {
    "occupiedSeats.A1": { $exists: false }
  },
  {
    $set: {
      "occupiedSeats.A1": userId
    }
  }
)
```

If two users attempt to reserve the same seat simultaneously, MongoDB guarantees that only one update succeeds. The second request receives `modifiedCount = 0` and is rejected.

This eliminates race conditions that occur when availability checks and seat updates are performed as separate operations.
> **Why `markModified`?**
> `occupiedSeats` is a `{ type: Object }` — a Mongoose "Mixed" type. Mongoose doesn't auto-detect nested object changes, so `markModified()` is called explicitly to force the save.

> **Why `minimize: false` on the Show model?**
> By default Mongoose strips empty `{}` objects from documents. `minimize: false` ensures `occupiedSeats: {}` is preserved even before any seats are booked.

---

### 2. 💳 Razorpay Payment Integration

ShowSphere uses Razorpay's full **Order → Payment → Verify** lifecycle.

#### Complete payment flow

```
Backend creates Razorpay order  (amount × 100, currency: INR)
        │
        ▼
Frontend opens Razorpay Checkout modal  (window.Razorpay)
        │
        ▼
User completes payment ─► Razorpay calls handler() with:
  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        │
        ▼
POST /api/booking/verify-payment
Backend computes HMAC-SHA256:
  crypto.createHmac("sha256", RAZORPAY_KEY_SECRET)
         .update(order_id + "|" + payment_id)
         .digest("hex")
        │
        ├─ Signature matches ─► booking.isPaid = true  ✅
        └─ Signature mismatch ─► Payment verification failed  ❌
```

#### Server-side signature verification

```js
// server/controllers/bookingController.js
const generatedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(razorpay_order_id + "|" + razorpay_payment_id)
  .digest("hex");

if (generatedSignature !== razorpay_signature) {
  return res.json({ success: false, message: "Payment verification failed" });
}

booking.isPaid = true;
booking.paymentId = razorpay_payment_id;
await booking.save();
```

#### Pay existing (pending) booking

If a user closes the modal and comes back later, the **My Bookings** page shows a **"Pay Now"** button for unpaid bookings. This hits `POST /api/booking/pay-existing-booking`, which creates a **fresh Razorpay order** for the same booking without re-locking any seats.

---

### 3. ⏱️ Inngest Background Jobs

[Inngest](https://www.inngest.com) handles **durable, delayed background execution** — no cron jobs or message queues needed.

#### Auto-release seats after 10 minutes

```js
// server/inngest/index.js
const releaseSeatsAndDeleteBooking = inngest.createFunction(
  { id: "release-seats-delete-booking" },
  { event: "app/checkpayment" },

  async ({ event, step }) => {

    // Pause for 10 minutes
    await step.sleepUntil(
      "wait-for-10-minutes",
      new Date(Date.now() + 10 * 60 * 1000)
    );

    await step.run("check-payment-status", async () => {
      const booking = await Booking.findById(event.data.bookingId);

      if (!booking) return; // Already handled

      if (!booking.isPaid) {
        // Release the locked seats back
        const show = await Show.findById(booking.show);
        booking.bookedSeats.forEach(seat => {
          delete show.occupiedSeats[seat];
        });
        show.markModified("occupiedSeats");
        await show.save();

        // Delete the unpaid booking record
        await Booking.findByIdAndDelete(booking._id);
      }
      // isPaid === true → do nothing, booking is confirmed
    });
  }
);
```

#### Clerk Webhook → User Sync

Inngest listens to Clerk webhook events to keep MongoDB's `User` collection in sync automatically.

| **Inngest Event** | **Trigger** | **Action** |
|---|---|---|
| `clerk/user.created` | New user signs up | Create User document in MongoDB |
| `clerk/user.updated` | User updates profile | Update User document in MongoDB |
| `clerk/user.deleted` | User deletes account | Delete User document from MongoDB |

---

### 4. 🔐 Clerk Auth & Role Management

**Clerk** handles all authentication. The backend uses `@clerk/express`.

#### Attaching auth to every request

```js
// server.js
app.use(clerkMiddleware()); // Attaches req.auth() to every request
```

#### Admin-only middleware

```js
// server/middleware/auth.js
export const protectAdmin = async (req, res, next) => {
  const { userId } = req.auth();
  const user = await clerkClient.users.getUser(userId);

  if (user.privateMetadata.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }
  next();
};
```

#### How to assign admin role

In **Clerk Dashboard → Users → Select user → Private Metadata**, set:

```json
{
  "role": "admin"
}
```

The frontend also redirects non-admins away from `/admin` routes automatically using `AppContext`.

---

### 5. 🎬 TMDB API Integration

ShowSphere integrates with [The Movie Database (TMDB)](https://www.themoviedb.org/) API for all movie data.

**What is fetched from TMDB:**

- ✅ Now-playing movies list (for admin "Add Show" screen)
- ✅ Movie runtime per film (parallel `Promise.all` calls)
- ✅ Full movie details — title, overview, genres, poster, backdrop, release date, tagline, vote average
- ✅ Full cast & credits
- ✅ YouTube trailer key (finds first `type: "Trailer"` from `/movie/{id}/videos`)

**Smart caching:** Once a movie is added to a show, its full data is stored in MongoDB. On subsequent show additions for the same movie, the DB document is reused — **no repeated TMDB API calls**.

```js
// server/controllers/showController.js
let movie = await Movie.findById(movieId);

if (!movie) {
  // Only fetch from TMDB if not already in our DB
  const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, { headers }),
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { headers }),
  ]);
  const trailer = movieVideosResponse.data.results
    .find(v => v.type === "Trailer" && v.site === "YouTube");

  movie = await Movie.create({ ...movieDetails, trailerKey: trailer?.key });
}
```

---

### 6. ❤️ Favorites System

Users can toggle a movie as a favourite from the Movie Details page. Favourites are stored in **Clerk's `privateMetadata`** — no extra database model required.

```js
// server/controllers/userController.js
const user = await clerkClient.users.getUser(userId);

if (!user.privateMetadata.favorites.includes(movieId)) {
  user.privateMetadata.favorites.push(movieId);         // Add
} else {
  user.privateMetadata.favorites =
    user.privateMetadata.favorites.filter(id => id !== movieId); // Remove (toggle)
}

await clerkClient.users.updateUserMetadata(userId, {
  privateMetadata: user.privateMetadata
});
```

---

## 📁 Project Structure

```
ShowSphere/
│
├── client/                           # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx            # Top nav with Clerk auth
│       │   ├── Footer.jsx
│       │   ├── HeroSection.jsx       # Landing hero with Swiper slider
│       │   ├── FeaturedSection.jsx   # Featured movies grid
│       │   ├── MovieCard.jsx         # Reusable movie card component
│       │   ├── DateSelect.jsx        # Show date & time slot picker
│       │   ├── TrailerSection.jsx    # Embedded YouTube trailer player
│       │   └── admin/
│       │       ├── AdminNavbar.jsx
│       │       ├── AdminSidebar.jsx
│       │       └── Title.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx              # Landing page
│       │   ├── Movies.jsx            # Movie listing grid
│       │   ├── MovieDetails.jsx      # Movie info + show slot selection
│       │   ├── SeatLayout.jsx        # Interactive seat picker + Razorpay checkout
│       │   ├── MyBookings.jsx        # User booking history + Pay Now
│       │   ├── Favourite.jsx         # Favourited movies page
│       │   └── admin/
│       │       ├── Layout.jsx        # Admin shell layout
│       │       ├── Dashboard.jsx     # Stats overview cards
│       │       ├── AddShows.jsx      # Schedule new shows (TMDB + multi-slot)
│       │       └── ListBookings.jsx  # All bookings (admin view)
│       │
│       ├── context/
│       │   └── AppContext.jsx        # Global state — shows, user, isAdmin, favourites
│       │
│       └── lib/
│           ├── isoTimeFormat.js      # ISO timestamp → 12hr time string
│           └── timeFormat.js         # Minutes → "Xhr Ymin" format
│
└── server/                           # Express backend
    ├── configs/
    │   ├── db.js                     # MongoDB connection
    │   └── razorpay.js               # Razorpay instance initialisation
    ├── controllers/
    │   ├── showController.js         # TMDB integration + show CRUD
    │   ├── bookingController.js      # Seat lock, order creation, payment verify
    │   ├── adminController.js        # Dashboard stats, admin show/booking lists
    │   └── userController.js         # User bookings + favourites (Clerk metadata)
    ├── inngest/
    │   └── index.js                  # All Inngest functions (user sync + seat release)
    ├── middleware/
    │   └── auth.js                   # protectAdmin middleware
    ├── models/
    │   ├── User.js
    │   ├── Movie.js
    │   ├── Show.js
    │   └── Booking.js
    ├── routes/
    │   ├── showroutes.js
    │   ├── bookingRoutes.js
    │   ├── adminRoutes.js
    │   └── userRoutes.js
    └── server.js                     # App entry point
```

---

## 🗄️ Database Schema

### **User**
```js
{
  _id: String,        // Clerk user ID (synced via Inngest webhook)
  name: String,
  email: String,
  image: String,
  timestamps: true
}
```

### **Movie**
```js
{
  _id: String,              // TMDB movie ID (used as primary key)
  title: String,
  overview: String,
  genres: Array,            // [{ id, name }]
  poster_path: String,
  backdrop_path: String,
  release_date: String,
  runtime: Number,          // in minutes
  vote_average: Number,
  original_language: String,
  tagline: String,
  casts: Array,             // Full TMDB cast array
  trailerKey: String,       // YouTube video key for trailer
  timestamps: true
}
```

### **Show**
```js
{
  movie: String,            // ref → Movie._id
  showDateTime: Date,       // Combined show date + time
  showPrice: Number,        // Per-seat price in INR
  occupiedSeats: Object     // { "A1": "userId", "B3": "userId2" }
  // minimize: false — keeps empty {} in DB
}
```

### **Booking**
```js
{
  user: String,             // ref → User._id (Clerk ID)
  show: String,             // ref → Show._id
  amount: Number,           // Total = seats × showPrice
  bookedSeats: Array,       // ["A1", "B3", "C5"]
  isPaid: Boolean,          // false = pending, true = confirmed
  razorpayOrderId: String,  // Razorpay order ID
  paymentLink: String,
  timestamps: true
}
```

---

## 🔌 API Reference

### Show Routes &nbsp; `/api/show`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/all` | Public | Get all unique movies that have upcoming shows |
| `GET` | `/:movieId` | Public | Get show slots grouped by date for a movie |
| `GET` | `/now-playing` | Admin | Fetch live now-playing movies from TMDB |
| `POST` | `/add` | Admin | Add new show slots for a movie |

### Booking Routes &nbsp; `/api/booking`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/create-order` | User | Check availability → lock seats → create Razorpay order |
| `POST` | `/verify-payment` | User | HMAC verify payment & mark booking as paid |
| `POST` | `/pay-existing-booking` | User | Create new Razorpay order for a pending booking |
| `GET` | `/seats/:showId` | Public | Get all occupied seat IDs for a show |

### Admin Routes &nbsp; `/api/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/is-admin` | User | Check if the logged-in user has the admin role |
| `GET` | `/dashboard` | Admin | Get total bookings, revenue, active shows, users |
| `GET` | `/shows` | Admin | Get all upcoming shows (with movie populated) |
| `GET` | `/bookings` | Admin | Get all bookings with user + show + movie details |

### User Routes &nbsp; `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/bookings` | User | Get current user's full booking history |
| `POST` | `/update-favorite` | User | Toggle a movie in/out of favourites |
| `GET` | `/favorites` | User | Get all of the user's favourited movies |

---

## 🔐 Environment Variables

### `client/.env`

```env
VITE_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_CURRENCY=₹
VITE_FRONTEND_URL=http://localhost:5173
```

### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/showsphere
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
TMDB_API_KEY=eyJhbGciOiJSUzI1NiJ9...   # Bearer token
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
INNGEST_SIGNING_KEY=signkey-xxxxxxxxxxxx
INNGEST_EVENT_KEY=xxxxxxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- MongoDB Atlas account (or local MongoDB)
- [Clerk](https://clerk.com) account & application
- [Razorpay](https://razorpay.com) account (Test mode works fine)
- [TMDB](https://www.themoviedb.org) API account (free)
- [Inngest](https://www.inngest.com) account (free tier available)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/yourusername/ShowSphere.git
cd ShowSphere
```

### Step 2 — Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 3 — Set up environment variables

Create `.env` files in both `client/` and `server/` folders using the templates above.

### Step 4 — Set up Clerk Webhook (for user sync)

In your **Clerk Dashboard → Webhooks**, add an endpoint:

```
https://your-backend-url/api/inngest
```

Subscribe to events: `user.created`, `user.updated`, `user.deleted`

### Step 5 — Run all three dev servers

```bash
# Terminal 1 — Backend server
cd server
npm run dev

# Terminal 2 — Frontend (React + Vite)
cd client
npm run dev

# Terminal 3 — Inngest local dev server
npx inngest-cli@latest dev
```

### Step 6 — Assign admin role

In **Clerk Dashboard → Users → Select a user → Private Metadata**, add:

```json
{
  "role": "admin"
}
```

Now visit `http://localhost:5173/admin` to access the admin dashboard.

---

## ☁️ Deployment (Vercel)

Both `client/` and `server/` include a `vercel.json` for one-click Vercel deployment.

**🔴 Live Frontend:** https://show-sphere-frontend.vercel.app/

```bash
# Deploy backend
cd server && vercel --prod

# Deploy frontend
cd client && vercel --prod
```

> After deploying, update `VITE_BASE_URL` in the client `.env` to point to your live backend URL, and add your production frontend URL to the server's CORS `origin` list.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ using React · Node.js · MongoDB · Razorpay · Clerk · Inngest · TMDB
</p>

<p align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
</p>
