# Newslt.rs-client

[![Bun CI](https://github.com/DiegoEnriquezSerrano/newslt.rs-client/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoEnriquezSerrano/newslt.rs-client/actions/workflows/ci.yml)

A PWA for a multi-tenant blog built with SvelteKit that allows multiple users to create, manage, and subscribe to newsletters via a separate authorized Rust-based API server application. Includes support for unregistered user subscriptions. The API supports http-only cookie based sessions for authentication-gated requests.

---

## Index

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [License](#license)

---

## Features

- User http-only cookie based authentication
- Subscriptions
- User profiles
- Newsletter issue creation and publishing
- Email delivery to subsribers

---

## Requirements

- Node.js 22.19.0+
- npm 10.9.3 +
- Bun 1.3.4+

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/DiegoEnriquezSerrano/newslt.rs-client
   cd ./newslt.rs-client
   ```

2. Install project dependencies

   ```bash
   bun install
   ```

3. Start development server
   ```bash
   bun dev --host --open
   ```

---

## Configuration

1. Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

2. Update environment variables in `.env`, refer to comments for directions on setting values.

---

## Running the Application

1. Start your services using docker compose
   ```bash
   bun dev --host --open
   ```

Your client server will be accessible at `http://localhost:5173/`.

---

## Testing

To run all tests use npm:

```bash
npm run test
```

Otherwise you can run test suites independently with bun

```bash
bun test:unit
```

or

```bash
bun test:e2e
```

---

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE. See the COPYING file for details.
