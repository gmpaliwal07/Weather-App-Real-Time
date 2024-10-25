# Weather-App-Real-Time
A full-stack weather monitoring application that allows users to view real-time weather data, track changes, and visualize historical trends. The application consists of a backend API built with Express and a frontend client developed using React and Vite.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MongoDB (installed and running)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-monitoring-app.git
   cd weather-monitoring-app



Install dependencies for both the backend and frontend:

bash
Copy code
# For backend
cd w-api
npm install

# For frontend
cd ../weather-monitoring-client
npm install


Backend Setup
Navigate to the backend directory:

bash
Copy code
cd w-api
Create a .env file in the w-api directory with the following structure:

plaintext
Copy code

MONGO_URL=mongodb://localhost:27017/weather
OPENWEATHER_API_KEY=Your_API_KEY
MONGO_URL: The connection string for your MongoDB database. Make sure MongoDB is running locally.
OPENWEATHER_API_KEY: Your API key for accessing OpenWeatherMap.
Start the backend server:

bash
Copy code
npm run dev
The backend API should now be running on http://localhost:5000 (or the port specified in your setup).

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../weather-monitoring-client
Start the development server:

bash
Copy code
npm run dev
Open your browser and go to http://localhost:3000 (or the appropriate port specified in your frontend setup).

Environment Variables
Backend (.env)
MONGO_URL: Connection string for MongoDB.
OPENWEATHER_API_KEY: API key for OpenWeatherMap.
Ensure to replace placeholder values with your actual credentials.

Usage
Backend API: The backend provides a RESTful API that allows the frontend to fetch weather data, manage user preferences, and store historical weather trends.
Frontend Client: The frontend displays weather information using charts and graphs, allowing users to visualize data trends effectively.
Features
Real-time weather updates from OpenWeatherMap.
Visualizations using react-chartjs-2 and recharts.
Responsive design with Tailwind CSS.
