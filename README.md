# Servayam 

A motion-heavy React + Vite portfolio site for Servayam Animation Studio. The site uses a bold comic-inspired visual system, animated section reveals, a category picker for projects, and a dedicated all-projects view without the home navbar.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- Lucide React

## Features

- **Animated landing page** with hero slideshow (mobile-compatible transitions/layout) and showreel modal
- **Category-based project browsing** for `Interior`, `Exterior`, `3D Models`, and `Giggle Filmz`
- **Dedicated all-projects page** with organized grid layout and filtering
- **Dark mode toggle** with persistent theme preference
- **Contact modal** with Web3Forms submission, client-side email regex validation, and sticky hire CTA
- **Responsive design** optimized for mobile, tablet, and desktop
- **Performance optimized** with Vite fast refresh and tree-shaking
- **Centralized theme tokens** in `src/index.css` for consistent styling
- **Smooth navigation** with category-to-project navigation that resets scroll to top

## Project Structure

```text
src/
  App.tsx                  App-level view switching and popup state
  main.tsx                 React entry point
  index.css                Theme tokens and custom utilities
  components/
    Navbar.tsx             Home navbar
    Hero.tsx               Landing hero and showreel modal
    KineticVault.tsx       Portfolio teaser with explore button
    AllProjects.tsx        Category project grids
    ContactModal.tsx       Contact form modal
    StickyHireBtn.tsx      Floating CTA
    ...other landing sections
public/
  assets/                  Portfolio images used by cards and hero
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The Vite dev server runs on port `3000`.

## Environment Variables

Create a `.env` file from `.env.example` and set:

- `VITE_WEB3FORMS_ACCESS_KEY` for contact form submissions

Get your key from `https://web3forms.com`.

### Web3Forms Setup

1. Create or sign in to your account at `https://web3forms.com`.
2. Create a form and copy the access key.
3. Add the key in `.env`:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Restart the dev server after editing `.env`.

### Contact Form Validation

- The email field is validated with a regex pattern before submit.
- If the email is invalid, submission is blocked and an error message is shown.
- If `VITE_WEB3FORMS_ACCESS_KEY` is missing, the form shows a configuration error.

## Available Scripts

- `npm run dev` starts the local dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build
- `npm run lint` runs TypeScript type-checking

## Editing Content

### Update project cards

Project card data lives in [src/components/AllProjects.tsx](src/components/AllProjects.tsx).

To add an image to a card:

1. Place the file in `public/assets/`
2. Add an `image` field to the project object

Example:

```ts
{
  id: 1,
  title: "Modern Loft",
  image: "assets/Scene 10.webp",
  placeholder: "Interior Design - 2024"
}
```

### Update the hero slideshow

Edit the `images` array in [src/components/Hero.tsx](src/components/Hero.tsx).

### Update the category popup

Edit the `projectCategories` array in [src/App.tsx](src/App.tsx).

Category selection behavior (including scroll reset) is handled in `handleCategoryClick` in [src/App.tsx](src/App.tsx).

### Update team or section copy

Most content is currently hardcoded directly inside the relevant component file in `src/components/`.

## Notes

- The projects page intentionally hides the home navbar.
- The `Explore All Projects` button opens a category selection popup before navigating.
- Opening a project category scrolls to the top of the projects view.
- Some dependencies and env wiring are present from the original starter template, but this app currently behaves like a frontend portfolio site.
- If you see `Contact form is not configured`, check `.env` and restart `npm run dev`.

## Deployment

### Vercel

This project is configured for deployment on Vercel. The `vercel.json` file contains routing configuration that:

- Handles static file serving
- Routes all requests to `index.html` for client-side routing
- Configures security headers

**To deploy:**

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in your Vercel dashboard
3. Set environment variables:
   - `VITE_WEB3FORMS_ACCESS_KEY` for contact form functionality
4. Deploy with a single click

Vercel will automatically detect the Vite configuration and build accordingly.

### Build for Production

```bash
npm run build
```

This generates a production-optimized build in the `dist/` directory.

## Verification

Type-check the project with:

```bash
npm run lint
```
