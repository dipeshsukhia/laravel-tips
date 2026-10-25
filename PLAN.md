# Static Laravel Tips Blog

## Summary

Build a responsive Next.js blog in the supplied `dipeshsukhia/laravel-tips` repository. Use the existing category Markdown files as the source of truth, with a separate static page for every tip and copy buttons on code examples.

## Implementation

- Add a Next.js App Router site that reads the category Markdown files in `knowledge-base/` at build time. Treat each `##` heading as a category and each `###` heading as a tip; render the content between tip headings as that tip’s body.
- Create a home page with category browsing and client-side search, category pages with their tips, and individual tip pages at `/[category]/[tip-slug]/`. Generate all routes at build time.
- Render Markdown and fenced code with language-aware highlighting. Add a copy button to each code block, with clear success or failure feedback.
- Configure static export, trailing-slash URLs, and the `/laravel-tips` base path for the repository’s GitHub Pages project URL.
- Export the static site into the repository’s `docs/` directory so GitHub Pages can serve it from `main/docs`. Document local development and deployment.

## Acceptance Checks

- Every category and `###` tip heading in the source files has a corresponding page and valid navigation links.
- Markdown prose, inline code, links, and fenced code render correctly; each code block can be copied.
- Search and category browsing work without a server.
- The production build exports static files with links and assets using the GitHub Pages base path.

## Assumptions

- The supplied `dipeshsukhia/laravel-tips` repository is the intended publishing target.
- Existing Markdown files remain the content source; the site does not introduce a separate content database or manually duplicated tip data.
- Category and tip slugs are generated from their headings, with stable URLs for the current content.
