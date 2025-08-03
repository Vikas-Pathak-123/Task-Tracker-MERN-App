# Lalitech ( Task Tracker App )

This template provides a minimal setup to get React working in Vite with HMR, testing, and ESLint rules.

## Features

- React 18 with Vite
- Vitest for unit testing
- Testing Library for React component testing
- ESLint with React hooks and refresh plugins
- Pre-configured JSX and modern JavaScript support

## Available Scripts

In the project directory, you can run:

### `npm install`
Install all project dependencies.

### `npm run dev`
Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Preview the production build locally.

### `npm run lint`
Run ESLint to check for code quality issues.

### `npm test`
Run all Vitest unit tests once.

### `npm run test:watch`
Run tests in watch mode (great for development).

### `npm run test:coverage`
Run tests and generate coverage report.

## Testing Setup

This project uses:
- [Vitest](https://vitest.dev/) for unit testing
- [Testing Library](https://testing-library.com/) for React component testing

Tests should be placed in the `src/tests` directory with `.test.js` or `.test.jsx` extensions.

## Project Structure
src/
├── components/ # Reusable components
├── pages/ # Page components
├── services/ # API service modules
├── tests/ # Test files
├── App.jsx # Main application component
└── main.jsx # Application entry point


## Expanding the ESLint configuration

For production applications, we recommend:
- Using TypeScript with [`typescript-eslint`](https://typescript-eslint.io)
- Enabling type-aware lint rules
- Consider using the [React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) with:
  - [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (for Vue/JSX support)

## Learn More

To learn more about Vite and React, check out:
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
- [Vitest Documentation](https://vitest.dev/guide/)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
