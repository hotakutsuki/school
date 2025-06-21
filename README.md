# Next.js Authentication Course Application

This is a Next.js application with basic authentication functionality using React and TypeScript.

## Features

- **User Registration**: Form to create new accounts
- **Login**: Authentication for existing users
- **Protected Home Page**: Only accessible to authenticated users
- **Responsive Design**: Modern interface with Tailwind CSS
- **Course Navigation**: Sidebar with chapter organization
- **Interactive Content**: Videos, text content, and quizzes

## Available Routes

1. `/` - Automatically redirects to `/login`
2. `/signup` - Registration page
3. `/login` - Login page
4. `/home` - Main page (requires authentication)
5. `/home/introduccion` - Course introduction
6. `/home/capitulo1/video` - Chapter 1 video
7. `/home/capitulo1/texto` - Chapter 1 text content
8. `/home/capitulo1/preguntas` - Chapter 1 quiz
9. `/home/capitulo2/video` - Chapter 2 video
10. `/home/capitulo2/texto` - Chapter 2 text content
11. `/home/capitulo2/preguntas` - Chapter 2 quiz

## Functionality

### Registration (`/signup`)
- Form with fields: Name, Phone, Email
- Registration button (placeholder - does nothing for now)
- Link to go to login

### Login (`/login`)
- Form with fields: Email, Password
- On successful login, sets a global user variable
- Automatically redirects to `/home`

### Course Home (`/home`)
- Verifies if user is authenticated
- If no user, redirects to `/login`
- Shows course navigation with sidebar
- Includes logout button

### Course Content
- **Introduction**: Welcome content with course overview
- **Videos**: Embedded YouTube videos for each chapter
- **Text Content**: Detailed theoretical content with Lorem Ipsum placeholders
- **Quizzes**: Interactive questionnaires with multiple choice questions

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS** - CSS framework

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Course Structure

The application includes a course with the following structure:

- **Introduction**: Course overview and objectives
- **Chapter 1**: 
  - Video: Fundamentals with embedded YouTube content
  - Text: Detailed theoretical content
  - Quiz: Interactive assessment
- **Chapter 2**:
  - Video: Advanced concepts
  - Text: In-depth theoretical material
  - Quiz: Advanced assessment

## Important Notes

- This is a basic implementation using global variables
- In a real application, you should use React context or a more robust global state
- Authentication is simulated (placeholder)
- Data is not persisted between page reloads
- The sidebar uses an accordion structure for better organization
- All content uses placeholder data (Lorem Ipsum, sample videos, mock quizzes)
