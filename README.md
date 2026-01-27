## User List – Frontend Task

## Overview

This project is a small frontend application built with Vue 3 (Composition API) that displays a list of users with common data‑table features such as filtering, sorting, and pagination.

## Features

- User list displayed in a responsive table

- Client‑side filtering by:

  Name
  Address
  Phone

- Sorting via dropdown selector:

  Newest first
  Date (Oldest first)
  Name (A → Z)
  Name (Z → A)

- Pagination with configurable page size

- Reusable composables for logic isolation

- URL Query Synchronization

  The following state is synchronized with the URL query parameters:
  Filters
  Sorting key & direction
  Current page
  Page size

  This allows:
  Bookmarkable views
  State persistence on refresh
  Easy sharing of filtered results

## Tech Stack

Vue 3 (Composition API)
Vue Router (query synchronization)
Vite (build tool)
Plain CSS (scoped styles)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
