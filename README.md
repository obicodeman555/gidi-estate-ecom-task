# 🛍️ E-commerce Product Listing Platform

[![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

## 📝 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Local Storage](#-local-storage-implementation)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 📂 Project Structure

````text
/src
├── app/
│   ├── products/         # Product-related routes
│   │   └── [id]/        # Dynamic product detail pages
│   ├── components/       # App-specific components
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── assets/               # Static assets (SVGs, etc.)
├── components/           # Shared UI components
├── data/                # Mock data and constants
├── lib/                 # Business logic libraries
├── styles/              # Global CSS/SASS files
├── types/               # TypeScript type definitions
└── utils/               # Utility functions

## ✨ Features

### 🛒 User Features

- Browse product catalog with responsive grid layout
- View detailed product information
- Filter products by category/price/search
- Persistent data in browser's Local Storage

### ⚙️ Admin Features

- Full CRUD operations for products
- Data initialization/reset functionality
- Form validation for product management

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.3+
- **State Management**: React Context API
- **Persistence**: Browser Local Storage
- **Tooling**: ESLint + Prettier + Husky

## 🚀 Getting Started

### Prerequisites

- Node.js ≥16.x
- npm ≥8.x or yarn ≥1.x

### Installation

```bash
git clone https://github.com/your-username/ecommerce-product-listing.git
cd ecommerce-product-listing
npm install
npm run dev

````
