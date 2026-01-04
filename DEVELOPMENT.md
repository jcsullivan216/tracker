# Local Development Guide

This guide explains how to run the DoD Engagement Tracker application locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## Quick Start

```bash
# 1. Navigate to the project directory
cd jcs

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser to http://localhost:3000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

## Development Server

### Starting the Server

```bash
npm run dev
```

This will start the Vite development server:
- **Local URL**: http://localhost:3000
- **Network URL**: http://[your-ip]:3000 (accessible from other devices on the same network)

### Features
- **Hot Module Replacement (HMR)**: Changes to your code are reflected instantly without full page reload
- **Fast Refresh**: React components maintain their state during updates
- **Error Overlay**: Compilation errors are displayed directly in the browser

## Production Build

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory:
- JavaScript is minified and bundled
- CSS is extracted and optimized
- Source maps are generated for debugging

### Preview Production Build

```bash
npm run preview
```

This starts a local server to preview the production build before deployment.

## Project Structure

```
jcs/
├── public/                 # Static assets
│   └── vite.svg           # Favicon
├── src/
│   ├── components/        # React components
│   │   ├── AddBuyerModal.jsx
│   │   ├── AddModal.jsx
│   │   ├── AddUnitModal.jsx
│   │   ├── BuyerCard.jsx
│   │   ├── BuyerModal.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Header.jsx
│   │   ├── ItemCard.jsx
│   │   ├── ItemModal.jsx
│   │   ├── KanbanView.jsx
│   │   ├── ListView.jsx
│   │   ├── UserCard.jsx
│   │   ├── UserModal.jsx
│   │   └── index.js
│   ├── data/              # Data files
│   │   ├── buyers.json    # 273 buyer/program entries
│   │   ├── config.js      # Configuration (colors, statuses)
│   │   └── users.json     # 144 user/unit entries
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .eslintrc.cjs          # ESLint configuration
├── .gitignore             # Git ignore rules
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Configuration

### Changing the Port

Edit `vite.config.js` to change the development server port:

```javascript
server: {
  port: 3000,  // Change to your preferred port
  open: false, // Set to true to auto-open browser
  host: true   // Set to false to only listen on localhost
}
```

### Environment Variables

Create a `.env` file in the project root for environment variables:

```bash
# .env
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution**: Change the port in `vite.config.js` or kill the process using port 3000:
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### Module Not Found
```
Error: Cannot find module 'xyz'
```
**Solution**: Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Build Fails
```
Error: Build failed with X errors
```
**Solution**: Check for syntax errors, run lint, and review console output:
```bash
npm run lint
```

### Getting Help

- Check the [Vite documentation](https://vitejs.dev/)
- Check the [React documentation](https://react.dev/)
- Review the project's `README.md` for feature-specific information

## Development Tips

### Adding New Components

1. Create a new file in `src/components/`
2. Export the component from `src/components/index.js`
3. Import and use in your parent component

### Modifying Data

- **Users**: Edit `src/data/users.json`
- **Buyers**: Edit `src/data/buyers.json`
- **Colors/Statuses**: Edit `src/data/config.js`

### Code Style

The project uses ESLint for code quality. Run before committing:

```bash
npm run lint
```

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` directory to your hosting provider

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t dod-engagement-tracker .
docker run -p 8080:80 dod-engagement-tracker
```

---

For more information, see the main [README.md](README.md).
