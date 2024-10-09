# Notion-Movie

A full-stack application inspired by Netflix, which enables users to explore, track, and mark their favorite movies. This project leverages a Notion database for content management and integrates TMDB (The Movie Database) API for real-time movie information.

## [Live Demo](https://notion-movie.onrender.com/)

Experience the live demo [here](https://notion-movie.onrender.com/).

## Features

- **User Authentication**: Sign up, login, and logout functionality with session-based authentication.
- **Dynamic Movie Content**: Fetches and displays movies from TMDB, categorized by popular, top-rated, and upcoming movies.
- **Custom Watchlist**:
  - **觀影吉錄（吉's Movie List）**: - Users can select movies by category.
  - **吉選電影（吉's Picks）**: - Movies highly rated by 吉.
- **IMDB Top 100**: Shows IMDb's top 100 movies where users can check watched movies, with a progress bar showing their viewing completion.
- **Movie Search & History**: Allows users to search for movies and keeps a search history.
- **Notion Integration**: Synchronizes movie information with a Notion database.
- **Responsive UI**: Designed to be visually engaging and user-friendly across devices.

## Tech Stack

### Frontend

- **React** - JavaScript library for building the user interface.
- **React Router** - For handling page navigation.
- **Axios** - To make API requests.
- **Tailwind CSS** - For styling and responsive layout.
- **Zustand** - For managing global state.

### Backend

- **Node.js** & **Express.js** - Server-side framework.
- **MongoDB** - Database for user data and movie tracking.
- **JWT** - For user authentication.
- **Cron Jobs** - For automating updates from Notion or TMDB.
- **Notion API** - To sync with Notion for database management.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RoyLee1224/notion-movie.git
   cd notion-movie
   ```

2. **Install Dependencies**

   For both frontend and backend, navigate to each directory and install dependencies:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**

   Create `.env` files in both the `frontend` and `backend` directories with the following variables:

   - **Backend `.env`**

     ```plaintext
     PORT=4000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     TMDB_API_KEY=your_tmdb_api_key
     NOTION_SECRET=your_notion_secret_key
     ```

   - **Frontend `.env`**

     ```plaintext
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     ```

4. **Run the Application**

   In the `frontend` and `backend` directories, start both servers:

   ```bash
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd ../frontend
   npm start
   ```

5. **Access the App**

   Open your browser and go to `http://localhost:3000` to view the frontend, and `http://localhost:4000` for the backend API.

## Folder Structure

### Frontend

- **`/src`**: Contains components, pages, hooks, and store files.
- **`/pages`**: Screens for different app routes, e.g., `HomePage`, `AuthScreen`, `WatchPage`.
- **`/components`**: Reusable components like `Navbar`, `Footer`, `MovieCard`.

### Backend

- **`/models`**: MongoDB schemas, including user and movie models.
- **`/controllers`**: API logic for handling movie search, authentication, and sync with Notion.
- **`/routes`**: Endpoint routes for authentication, movies, and Notion synchronization.
- **`/services`**: Utility functions for TMDB and Notion API integrations.

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Create a new user account.
- `POST /api/v1/auth/login` - User login.
- `POST /api/v1/auth/logout` - User logout.

### Movies

- `GET /api/v1/movie/trending` - Get trending movies.
- `GET /api/v1/movie/watched` - Get watched movies.
- `POST /api/v1/movie/:id/toggle` - Toggle a movie as watched/unwatched.

### Notion Sync

- `POST /api/v1/notion/sync` - Sync Notion database with movie data.

## Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request
