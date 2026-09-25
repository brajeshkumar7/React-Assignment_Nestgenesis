# Product Admin Dashboard Architecture

## Project state

This repository already contains a Next.js App Router project with login, catalog, detail, edit, and create routes; shared Axios modules; and product/auth components. The declared stack is Next.js 14, React 18, TypeScript, and Axios. Tailwind is not installed or configured yet. This document establishes the implementation contract without changing application code.

## Folder structure

```text
app/
  layout.tsx                 # Root metadata, global styles, AuthProvider
  page.tsx                    # Redirect to /products
  login/page.tsx              # Login screen
  products/
    layout.tsx                # Authenticated AppShell
    page.tsx                  # Catalog state and page composition
    new/page.tsx              # Create flow
    [id]/page.tsx             # Details and not-found state
    [id]/edit/page.tsx        # Edit flow
components/
  auth/LoginForm.tsx
  layout/{AppShell,Header,Sidebar}.tsx
  products/{ProductTable,ProductGrid,ProductSearch,ProductFilters,
    ProductPagination,ProductForm,ProductDetails,DeleteProductModal}.tsx
  ui/{Button,Icon,Loading,EmptyState}.tsx
lib/
  api/{axios,auth,products}.ts # Shared client and endpoint functions
  auth/auth.tsx                # Small auth context
  utils/{urlParams,localProducts}.ts
  constants.ts
types/{auth,product}.ts
```

Keep the existing route and component boundaries. A page coordinates state and composes focused components; presentational components receive data and callbacks. Keep all HTTP calls in `lib/api`.

## Component and data flow

```text
LoginForm -> auth API -> AuthProvider -> local session -> protected AppShell
Catalog URL -> parse/validate -> Products page -> products API -> local overlay
                                              -> table (desktop) / cards (mobile)
Product form -> validate -> products API -> local overlay -> detail/list refresh
```

The products page owns the catalog query, result, loading/error state, and deletion dialog. It requests categories once and requests products when a query value changes. Detail and editor routes load one product through the API module and first check the local overlay for a local or edited record. Components do not know Axios or DummyJSON URL details.

## API and dependencies

Use one Axios instance with `https://dummyjson.com` as its base URL. Its request interceptor attaches the stored access token as a bearer token. Its response interceptor converts API failures to a consistent user-facing error while preserving cancellation errors. `lib/api/auth.ts` owns login; `lib/api/products.ts` owns list, search, category, detail, add, update, and delete calls. Pass an `AbortSignal` to read requests.

| Purpose | Package | Repository status |
| --- | --- | --- |
| Framework | `next` | Present (`^14.2.15`) |
| UI runtime | `react`, `react-dom` | Present (`^18.3.1`) |
| Types | `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | Present |
| HTTP | `axios` | Present (`^1.7.9`) |
| Styling | `tailwindcss`, `@tailwindcss/postcss`, `postcss` | Missing; add as dev dependencies |

Use Tailwind's current PostCSS integration: `npm install -D tailwindcss @tailwindcss/postcss postcss`, a `postcss.config.mjs` entry for `@tailwindcss/postcss`, and `@import "tailwindcss"` in `app/globals.css`. These are the current Tailwind installation instructions for PostCSS; do not add Autoprefixer for this setup ([Tailwind docs](https://tailwindcss.com/docs/installation/using-postcss)). Keep custom CSS only for genuinely bespoke details that are awkward as utilities.

No state, data-fetching, table, pagination, icon, or component library is needed. Continue to use native React state, the existing focused components, and manual table/pagination logic.

## Authentication state

Keep `user` and `ready` in the existing `AuthProvider`; this is the only shared app state. Login posts the assignment credentials to `/auth/login`, stores the returned user and access token, then redirects to the intended internal route or `/products`. On startup, restore the session before rendering protected pages. Logout clears the session and returns protected routes to `/login`.

The route guard is a client-side UX guard, not a security boundary: DummyJSON product endpoints are public, and a browser-only app cannot enforce server authorization. Do not describe it as server-secure authentication.

## URL state and pagination

Use `page`, `limit`, `q`, `category`, `sort`, and `order` as the catalog URL parameters. `skip` is derived as `(page - 1) * limit` for the API; it is not another source of truth. Defaults are page 1, limit 10, no search/category/sort, and ascending order. Accept only positive integer pages, page sizes 10/20/50, supported sort keys (`title`, `price`, `rating`), and `asc`/`desc`; normalize malformed values to defaults. After receiving `total`, clamp an out-of-range page and replace the URL so refresh/share preserves the corrected state.

Use browser history for filter/page changes and handle `popstate` so Back/Forward restores the controls. Search updates after a short debounce and resets page to 1. Selecting a category clears search; entering a search clears category. The assignment describes search and category as separate API operations, so they are mutually exclusive rather than pretending both were applied.

## Search race safety

Debounce input (about 300 ms). For each request, create an `AbortController`; abort the previous request when the query changes or the page unmounts. Also guard state updates with a request identity or active flag. The guard is required because a response can finish as cancellation is processed; only the current request may update products, total, loading, or error state.

## Local CRUD representation

DummyJSON explicitly simulates product add/update/delete responses and does not persist those mutations ([product API docs](https://dummyjson.com/docs/products)). Keep a small local overlay in `localStorage` with three collections: added product records, updated product records keyed by ID, and deleted server IDs. Merge it over fetched records before rendering; do not imply the remote catalog changed.

After add, use a client-generated unique ID for the local record rather than assuming the simulated API response ID is globally unique. Existing server products may call the matching mutation endpoint, then store the returned change locally. A local-only added product can be edited or deleted in the overlay without sending its client ID to DummyJSON. Persist changes so they survive navigation and refresh in the same browser. Clear or version this cache if the data shape changes.

## Responsive design and UI states

Use a persistent desktop sidebar and compact header. At the mobile breakpoint, prioritize the catalog controls and render product cards instead of a horizontally overflowing table. Keep forms and product details in a single-column flow on small screens. Use Tailwind utilities for spacing, typography, color, borders, focus rings, hover and disabled states; keep the palette restrained.

- **Loading:** visible progress indicator/skeleton while list, detail, or categories load.
- **Empty:** distinct message for a genuinely empty catalog versus no search/filter matches.
- **Error:** explain the failed action and provide Retry where a read can be repeated; do not show an empty state for a failed request.
- **Not found:** show a dedicated state for invalid/missing product IDs.
- **Mutation feedback:** disable submit actions while pending, show errors inline, and reflect successful changes from the local overlay.

## Risks and edge cases

- Local storage is browser-specific and can be cleared; it is a demo persistence layer, not shared storage.
- DummyJSON's simulated add response may repeat an ID, so the UI needs its own ID for added records.
- Never call a server delete/update with a client-generated ID for a local-only product.
- Invalid page numbers can cause an empty API page before total is known; clamp and refetch.
- Cancelled requests must not surface as user-facing errors or overwrite newer results.
- Search and category are exclusive by design; make that behavior visible in the controls.
- An expired access token can remain in local storage; handle API auth failures by clearing the session if protected API calls are introduced.
- The current repository's `globals.css` is custom CSS; Tailwind must be installed and configured before the UI can be considered compliant with the required stack.

## Verification commands

```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```

`npm run build` is already defined. There is currently no lint script or configured Tailwind pipeline; add Tailwind configuration before treating styling checks as complete.
