# Atelier Product Workspace

A responsive product admin dashboard built with Next.js, React, TypeScript, and Axios. Product data and login use the [DummyJSON API](https://dummyjson.com).

## Run locally

1. Install Node.js 20 or later.
2. Install packages with `npm install`.
3. Start the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).
5. Sign in with username `emilys` and password `emilyspass`.

Run `npm run build` to create the production build, then `npm start` to serve it.

## Features

- Login and logout with a shared Axios client that attaches the login token and normalizes API errors.
- Product catalog with desktop table and mobile cards, search, category filter, sort, page size, and URL-persisted controls.
- Product detail and review pages, plus validated create and edit forms and a delete confirmation.
- Loading, empty, retry, and not-found states.
- Catalog changes are saved in browser local storage because DummyJSON's write endpoints return simulated changes and do not persist them.
- Search and category filtering are mutually exclusive. Typing a search clears the category; choosing a category clears the search. DummyJSON exposes search and category as separate endpoints and does not combine both operations, so the interface makes the active server-side filter explicit.
- Invalid page and page-size values fall back to safe defaults. Pages past the end of the current result set are clamped to the last valid page.
- Requests are cancelled when their query changes, and save/login buttons are disabled while a request is in flight.

## Assignment notes

The main implementation problem was keeping URL state, pagination, and rapid search input in sync without allowing a slower earlier request to replace newer results. I debounce search, abort the previous request, ignore responses from an unmounted request, and clamp the page after the API returns its result count.

AI assistance was used to scaffold the component structure and help implement the API and URL-state logic. The implementation should be reviewed and understood before presenting or extending it.

## Deployment

Deploy the repository to Vercel or Netlify using the default Next.js build command `npm run build` and start command `npm start`. Add the resulting live URL here after deployment:

- Live app: _not deployed_
- Public repository: _not published_
