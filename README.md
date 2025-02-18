# CAJ Viewer - Online CAJ to PDF Converter

## Overview

CAJ Viewer is a web application that allows users to convert CAJ files to PDF format online. Built with React, TypeScript, and Vite, it provides a fast and efficient way to view and convert academic documents from the CNKI (China National Knowledge Infrastructure) platform.

## Features

- **Online Conversion**: Convert CAJ files to PDF directly in your browser
- **Cross-Platform**: Works on Windows, Mac, and Linux
- **Fast Processing**: Utilizes modern web technologies for quick conversions
- **Privacy Protection**: Files are processed locally and not stored on servers
- **User-Friendly Interface**: Simple and intuitive design for easy navigation

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Handling**: pdfjs-dist
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Wacque/caj-frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

### Linting

The project uses ESLint for code quality checks:

```bash
npm run lint
```

## Configuration

The project includes the following configuration files:

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration

## Project Structure

```
src/
├── components/        # React components
├── assets/            # Static assets (images, icons)
├── styles/            # Global styles
├── main.tsx           # Application entry point
├── Index.tsx          # Main page component
└── Provider.tsx       # Context provider for state management
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist) for PDF rendering
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool

## Environment Variables

The project uses the following environment variables:

| Variable Name       | Description                  | Default Value |
| ------------------- | ---------------------------- | ------------- |
| `VITE_API_BASE_URL` | Base URL for the backend API | `http://      |

To configure these variables:

1. Create a `.env` file in the root directory
2. Add the required variables following the format:
   ```env
   VITE_API_BASE_URL=http://your-api-url
   ```
3. Restart the development server

For production, ensure these variables are set in your deployment environment.

## Backend Integration

This frontend application is designed to work with the [CAJ Backend](https://github.com/Wacque/caj-backend.git) project. The backend handles the actual CAJ to PDF conversion process.

### Setting Up the Backend

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Wacque/caj-backend.git
   ```
2. Follow the installation instructions in the backend repository's README
3. Configure the frontend's environment variables to point to your backend instance:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### Development Workflow

1. Start the backend server first
2. Then start the frontend development server
3. Both servers should be running simultaneously during development
