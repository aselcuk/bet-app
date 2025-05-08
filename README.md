## 🎲 Bet App

Bet App is a simple web-based betting application. It lists events by category, and each event includes detailed information.

### 🚀 Getting Started

To run the project locally, follow these steps:

```bash
npm install
npm run dev
```

**Note: Make sure you're using Node.js v18.19.0 or higher.**

### 🔧 Tech Stack

- JavaScript Library: React
- State Management: Redux Toolkit
- Bundler: Vite
- Language: TypeScript
- Styling: SCSS
- Service: Axios & Firebase

### 📁 Project Folder Structure

| Folder / File        | Description                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `assets/`            | Contains static assets such as images, icons, and fonts used throughout the application.              |
| `components/`        | Includes reusable and core UI components used across the project.                                     |
| `hooks/`             | Contains custom React hooks that encapsulate reusable logic.                                          |
| `layouts/`           | Defines different layout structures used in the application.                                          |
| `model/`             | Stores TypeScript interfaces and types used across the project.                                       |
| `pages/`             | Contains route-level pages. Page-specific and non-reusable components are also placed here.           |
| `redux/`             | Holds Redux-related files including the global store configuration and feature slices.                |
| `routes/`            | Contains routing configurations and route-related components.                                         |
| `services/`          | Includes API request logic, typically built with Axios or similar libraries.                          |
| `styles/`            | Shared styling files such as global SCSS or CSS modules.                                              |
| `utils/`             | Utility functions for common tasks such as date formatting, Firebase integration, and event handling. |
| `app.tsx`            | Main application component, often used for layout and route rendering.                                |
| `main.tsx`           | Entry point of the React application.                                                                 |
| `protectedRoute.tsx` | Defines logic for route protection, typically for authentication-based access control.                |
