# u-auth - Simplified Authentication for Node.js

A lightweight authentication library for Node.js applications. Provides utilities to handle common authentication tasks like managing authentication tokens, verifying sessions, handling cookies, and supporting both OTP and token-based authentication.

## ✨ Features

- 📱 OTP-based login support
- 🔐 JWT token session handling
- 💼 Works with Express.js API and server functions
- 💅 Minimal styles with Tailwind support

---

## 🚀 Installation

```bash
npm install @explita/u-auth-node
```

or

```bash
yarn add @explita/u-auth-node
```

or

```bash
pnpm add @explita/u-auth-node
```

Make sure you also have these as peer dependencies:

```bash
npm install express
```

---

### 📜 Session Management

The u-auth library handles session management by automatically storing and retrieving authentication tokens using HTTP-only cookies for better security.

Authentication tokens are stored in cookies, with the HttpOnly flag to prevent JavaScript access.

---

### 🔐 Authentication Methods

#### Token-Based Authentication

Use JWT tokens for stateless authentication. The library provides helpers to manage tokens and sessions using cookies.

#### OTP-Based Authentication

You can implement OTP-based authentication by using the OTPProvider, OTPInput and useOTP hook. This is ideal for scenarios where you want to verify users via an OTP sent to their email or phone.

---

### 📄 License

MIT — Made with ❤️ by [Explita](https://explita.ng)
