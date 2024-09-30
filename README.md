# Wallet Balance

Project retrieves balance of your ETH wallet via Tatum SDK.

## Environment Setup

This project uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the following variable:

```
VITE_TATUM_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Tatum API key.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using Vite.

### `npm run build`

Builds the app for production. This script runs TypeScript compilation (`tsc -b`) and then builds the project with Vite.

### `npm run lint`

Lints the project files using ESLint.

### `npm run prettier`

Formats the project files using Prettier.

### `npm run preview`

Previews the built app locally.
