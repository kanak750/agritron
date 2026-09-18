# Agritron E-Commerce Platform

A modern, premium e-commerce storefront for agricultural supplies, smart technology, and modern farming equipment. Built with Next.js, Tailwind CSS, and Prisma.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** Built with custom Tailwind classes and Radix UI primitives.

## Features
- **Rich E-commerce Storefront:** Premium, content-dense home page featuring hero banners, promotional sections, and trending products.
- **Dynamic Product Catalog:** Robust product listing and category filtering.
- **Responsive Design:** Fully responsive layout that looks great on mobile, tablet, and desktop.
- **Modern UI/UX:** Features micro-animations, glassmorphism elements, and sleek styling to provide a "WOW" user experience.

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
Make sure your `.env` file is configured with the correct database connection string. Then, push the schema and seed the database (if applicable):
```bash
npx prisma db push
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (Product Cards, Buttons, Headers).
- `src/lib`: Utility functions and database client (`db.ts`).

## Recent Updates
- Transitioned to a single-page storefront architecture to consolidate the shopping experience.
- Overhauled the UI with a premium design system: custom gradient banners, dynamic product cards, and unified visual density.
