# Portfolio Website

This is a professional portfolio website built with React, TypeScript, and Django.

## Project Structure

- `haroon-motion-design-main/`: Frontend React application
- `backend/`: Backend Django API

## Getting Started

### Frontend

1. Navigate to the frontend directory:
   ```
   cd haroon-motion-design-main
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (if not already created):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

6. The API will be available at `http://127.0.0.1:8000/api/`

## Important Notes

- The frontend application requires the backend server to be running for the Resume and Contact sections to work properly.
- If you see an error message about the backend server not being available, make sure to start the backend server following the instructions above.
- The backend server uses SQLite as the database, which is included in the repository.
- Email functionality is configured to use Gmail SMTP. You may need to update the email settings in `backend/portfolio_backend/settings.py` if you want to use a different email provider.

## Features

- Responsive design
- Dark/Light mode toggle
- Resume upload and download
- Contact form with email notification
- Animated sections using Framer Motion
- Modern UI with Tailwind CSS 