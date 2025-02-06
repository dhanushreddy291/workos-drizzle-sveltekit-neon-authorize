<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon RLS Authorize + WorkOS Example (SvelteKit)

A quick start SvelteKit template demonstrating user authentication and authorization using Neon RLS Authorize with WorkOS integration. This example showcases how to use WorkOS for authentication and Neon RLS Authorize for securing your database with Row Level Security (RLS).

## Features

- SvelteKit application with TypeScript
- User authentication powered by WorkOS
- Row-level security using Neon RLS Authorize
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Netlify

## Prerequisites

- [Neon](https://neon.tech) account with a new project
- [WorkOS](https://workos.com) account with a new application
- Node.js 18+ installed locally

## One-Click Deploy

Deploy this example to Netlify with a single click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/workos-drizzle-sveltekit-neon-authorize)

> **Important**: After deploying, ensure your WorkOS Redirect URI is set to your deployment URL (e.g., `https://your-app-name.netlify.app/callback`) in your WorkOS Application settings.

![Set Redirect URI in WorkOS](/images/workos-redirect-uri.png)

## Local Development Setup

### 1. Configure WorkOS

1. Navigate to your WorkOS dashboard and create an AuthKit connection.
2. Configure the **Redirect URI** to `http://localhost:5173/callback`.
3. Copy the **Client ID** and **API Key** for the next steps.

![WorkOS AuthKit Connection](/images/workos-authkit-connection.png)

### 2. Set Up Neon RLS Authorize

1. Open your Neon Console and click "RLS Authorize" in your project's settings.
2. Add a new authentication provider.
3. Set the JWKS URL to: `{YOUR_WORKOS_URL}/.well-known/jwks.json`

   > Replace `{YOUR_WORKOS_URL}` with your WorkOS domain (e.g., `https://api.workos.com/sso/jwks/{YOUR_CLIENT_ID}`). You can find the exact format in your `.env.example` as `WORKOS_JWKS_URL`.

   ![Add WorkOS JWKS URL](/images/neon-authorize-workos-jwks.png)

### 3. Local Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neondatabase-labs/workos-drizzle-sveltekit-neon-rls-authorize
   cd workos-drizzle-sveltekit-neon-rls-authorize
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in the necessary values:

   ```env
   # For the admin `neondb_owner` role.
   DATABASE_URL=
   # For the `authenticated`, passwordless role.
   DATABASE_AUTHENTICATED_URL=
   # For the `anonymous` role, passwordless role.
   DATABASE_ANONYMOUS_URL=

   WEBSITE_URL=http://localhost:5173 # Change to your deployment URL

   # from the WorkOS dashboard
   WORKOS_API_KEY=
   # from the WorkOS dashboard
   WORKOS_CLIENT_ID=
   # format is https://api.workos.com/sso/jwks/{client_id}
   WORKOS_JWKS_URL=
   # run `openssl rand -base64 64` to generate a new password
   WORKOS_COOKIE_PASSWORD=
   ```

4. Set up the database:

   ```bash
   npm run db:generate  # Generate migrations
   npm run db:migrate   # Run migrations
   ```

5. Start the development server:

   ```bash
   npm run dev -- --open
   ```

6. Visit `http://localhost:5173` to see the application running.

![SvelteKit App](/images/sveltekit-app.png)

## Important: Production Setup

Update your WorkOS environment to production and the JWKS URL in Neon RLS Authorize accordingly.

![Change Environment to Production](/images/workos-environment.png)

> **Note**: Before deploying to production, ensure you have configured the correct Redirect URI in your WorkOS Application settings to match your deployed application's URL (e.g., `https://your-app-name.netlify.app/callback`).

## Learn More

- [Neon RLS Authorize Tutorial](https://neon.tech/docs/guides/neon-authorize-tutorial)
- [Simplify RLS with Drizzle](https://neon.tech/docs/guides/neon-authorize-drizzle)
- [WorkOS Documentation](https://workos.com/docs)

## Authors

- [Brian Holt](https://github.com/btholt)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
