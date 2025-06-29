# Project Structure Documentation

This document outlines the architecture and key directories of the Astro-Paper project, providing a guide for understanding and extending the codebase.

## 1. Core Framework & Language

*   **Astro**: The project is built with Astro, a modern static site builder designed for content-focused websites. Astro renders UI components to static HTML, minimizing client-side JavaScript.
    *   `astro.config.ts`: The main configuration file for Astro, defining integrations, build settings, and other project-wide configurations.
*   **TypeScript**: The entire project is written in TypeScript (`.ts`, `.tsx`), providing type safety, improved code readability, and better maintainability.
    *   `tsconfig.json`: TypeScript configuration file.
    *   `src/env.d.ts`: Declaration file for environment variables.
    *   `src/types.ts`: Custom TypeScript type definitions used across the project.

## 2. Content & Data

*   `src/content/`: This directory leverages Astro's Content Collections API for managing structured content.
    *   `src/content/blog/`: Contains all blog posts written in Markdown (`.md`). Each Markdown file represents a single blog post.
    *   `src/content/config.ts`: Configuration for Astro Content Collections, defining schemas for content types (e.g., blog posts) to ensure data consistency and type safety.
*   `src/config.ts`: A central configuration file for site-wide variables such as site title, description, author, social media links, and other global settings.

## 3. Routing & Pages

*   `src/pages/`: Astro uses a file-based routing system, where the structure of this directory directly maps to the website's URL paths.
    *   `src/pages/index.astro`: The main homepage of the website.
    *   `src/pages/404.astro`: The custom 404 error page.
    *   `src/pages/posts/[...page].astro`: Handles pagination for blog post listings.
    *   `src/pages/posts/[slug]/index.astro`: Dynamic route for individual blog post pages, where `[slug]` is replaced by the post's slug.
    *   `src/pages/tags/index.astro`: Page listing all available tags.
    *   `src/pages/tags/[tag]/[...page].astro`: Dynamic route for tag-specific post listings with pagination.
    *   `src/pages/about.md`: A static Markdown page for the "About" section.
    *   `src/pages/labs/`: Contains pages for interactive "Labs" (formerly "Tools").
        *   `src/pages/labs/ai-tools-map.astro`: Page for the AI Tools Map interactive visualization.
        *   `src/pages/labs/react-hooks-explorer.astro`: Page for the React Hooks Explorer.
        *   `src/pages/labs/avatar-gallery.astro`: Page for the Avatar Evolution Gallery.
    *   `src/pages/og.png.ts`: Endpoint for generating Open Graph images.
    *   `src/pages/robots.txt.ts`: Endpoint for generating the `robots.txt` file.
    *   `src/pages/rss.xml.ts`: Endpoint for generating the RSS feed.
    *   `src/pages/search.astro`: The search page.

## 4. UI Components & Layouts

*   `src/components/`: Reusable UI components used across the site.
    *   `src/components/Header.astro`: The site's navigation header, including the logo, main navigation links, and theme toggle.
    *   `src/components/Footer.astro`: The site's footer, containing copyright information and social links.
    *   `src/components/Card.tsx`: A React component likely used for displaying blog post previews or similar content.
    *   `src/components/Datetime.tsx`: A React component for formatting and displaying dates/times.
    *   `src/components/Search.tsx`: A React component for the site's search functionality.
    *   `src/components/labs/`: Contains interactive React components for the "Labs" section.
        *   `src/components/labs/AIToolsMap.tsx`: React component for the AI Tools Map visualization.
        *   `src/components/labs/AvatarGallery/index.tsx`: React component for the Avatar Evolution Gallery.
        *   `src/components/labs/hooks/`: Contains individual React hook demonstration components.
*   `src/layouts/`: Astro layout components that define the overall page structure and common elements.
    *   `src/layouts/Layout.astro`: The base layout for most pages, including `<head>` metadata, `Header`, and `Footer`.
    *   `src/layouts/PostDetails.astro`: Layout specifically for individual blog post pages.
    *   `src/layouts/Main.astro`, `src/layouts/Posts.astro`, `src/layouts/TagPosts.astro`, `src/layouts/AboutLayout.astro`: Other specific layouts for different content types or sections.

## 5. Styling

*   `src/styles/base.css`: Global CSS styles for the project.
*   `tailwind.config.cjs`: Configuration file for Tailwind CSS, a utility-first CSS framework used for rapid UI development.

## 6. Assets

*   `public/`: Static assets that are served directly by the web server without processing.
    *   `public/favicon.svg`: Site favicon.
    *   `public/toggle-theme.js`: JavaScript for theme toggling.
    *   `public/assets/`: Contains images and other media assets.
        *   `public/assets/avatar/`: Contains the avatar images used in the Avatar Evolution Gallery.
*   `src/assets/`: Assets that might be processed by Astro or other build tools.
    *   `src/assets/images/`: Blog post cover images and other general images.
    *   `src/assets/socialIcons.ts`: Configuration for social media icons.

## 7. Utilities

*   `src/utils/`: Helper functions and utilities used across the project.
    *   `src/utils/slugify.ts`: Utility for converting strings to URL-friendly slugs.
    *   `src/utils/getSortedPosts.ts`: Function to retrieve and sort blog posts.
    *   `src/utils/getUniqueTags.ts`: Function to extract unique tags from posts.
    *   `src/utils/generateOgImages.tsx`: Utility for generating Open Graph images programmatically.

## 8. Tooling & Configuration

*   `.gitignore`: Specifies files and directories to be ignored by Git.
*   `.prettierrc`, `.prettierignore`: Configuration for Prettier, a code formatter.
*   `eslint.config.mjs`: Configuration for ESLint, a linter for identifying and reporting on patterns in JavaScript/TypeScript code.
*   `package.json`, `package-lock.json`: Node.js project manifest and dependency lock file.
*   `Dockerfile`, `docker-compose.yml`, `.dockerignore`: Files for Dockerizing the application, enabling consistent development and deployment environments.
*   `CHANGELOG.md`: Records changes made to the project over time.
*   `README.md`: General project information and setup instructions.
*   `feature-docs/avatar-gallery/TODO.md`: Specific TODO list for the Avatar Gallery feature.

This outline should provide a solid foundation for understanding the project's structure and where to find specific functionalities or content.
