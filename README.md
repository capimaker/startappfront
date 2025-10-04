# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# startappfront
.📌 StartApp
StartApp is a web platform built with React, Redux, and Ant Design to support mentoring, startups, and training programs. It provides an interactive dashboard with widgets, a scheduling calendar, and dynamic galleries of startups and mentors.
✨ Features
🔐 Login system
Access with default credentials:
Email/Username: admin
Password: 1234

📊 Dashboard
Customizable drag & drop layout with [react-grid-layout].
Widgets include:
Summary of hours worked
Gauge chart and Pie chart (progress visualization).
Mentorship calendar (react-big-calendar).
Notes, Weather, and News widgets.

👩‍💼 Mentorship management
Add mentorship sessions.
View sessions in a large interactive calendar.

🚀 Startup & Mentor galleries
Dynamic cards for browsing and exploring startups and mentors.

🎨 Modern UI/UX
Built with Ant Design components and custom CSS.
Responsive design, works on desktop and mobile.

⚙️ Tech Stack
Frontend: React 19, Redux Toolkit, React Router v7, Ant Design 5
Charts: Plotly.js (Gauge + Pie)
Layout: react-grid-layout
Calendar: react-big-calendar + date-fns
State management: Redux Toolkit
Styling: Ant Design + custom CSS

🛠️ Installation & Usage
Clone the repo:
git clone 
cd startapp/frontend/startApp
Install dependencies (using npm, you can adapt to pnpm if needed):
npm install
Start the development server:
npm run dev
Open in your browser:
http://localhost:5173

🔑 Default Login
Use these credentials to log in:
Username/Email: admin
Password: 1234
