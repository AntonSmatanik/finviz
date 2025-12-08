# ImageNet Hierarchy Viewer

A full-stack web application for browsing and exploring the ImageNet hierarchy structure. Built with React, TypeScript, and Node.js, this application provides an intuitive interface to navigate through the ImageNet dataset's hierarchical organization.

## Features

- **Search by Full Path**: Navigate through the hierarchy using full paths for O(1) lookup performance
- **Search by Name**: Search for nodes by name with O(n) search capability
- **Tree Visualization**: View the complete hierarchy structure in JSON format
- **Breadcrumb Navigation**: Easy navigation through the hierarchy with clickable breadcrumbs and visual separators
- **Responsive Design**: Mobile-friendly interface with full-screen overlay menu
- **Visual Tree Structure**: Color-coded tree lines and connectors for better hierarchy visualization
- **Lazy Loading**: Code-split pages for optimal initial load performance
- **Server-Side Caching**: In-memory caching for fast data retrieval
- **Client-Side Caching**: Efficient data caching with TanStack Query

## Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query v5** - Server state management
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Styling
- **Vite v7** - Build tool and dev server
- **Biome** - Linting and formatting

### Backend

- **Node.js** - Runtime environment with ES modules
- **Express** - Web server framework
- **TypeScript** - Type safety (ES2022 target)
- **Better-SQLite3** - Embedded SQLite database
- **xml2js** - XML parsing for data import
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Finviz
   ```

2. **Copy the XML data file**

   Place the `structure_released.xml` file in the `server/src/data/` directory.

3. **Setup the server**

   ```bash
   cd ../server
   npm install
   npm run parse:file # Parse XML file to JSON
   npm run db:create  # Create SQLite database
   npm run db:seed    # Populate database with data
   ```

4. **Setup the client**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Development Mode

1. **Start the server** (Terminal 1)

   ```bash
   cd server
   npm run dev
   ```

   Server will run on `http://localhost:3000`

2. **Start the client** (Terminal 2)

   ```bash
   cd client
   npm run dev
   ```

   Client will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The server exposes three REST endpoints:

### GET /tree

Returns the complete tree structure.

**Response:** Full hierarchy tree with nested children

**Performance:** O(1) - Data is cached in memory

---

### GET /search-by-fullpath?val={fullPath}

Search for a node by its full hierarchical path.

**Parameters:**

- `val` (string): Full path (e.g., "entity > physical entity > object")

**Response:**

```json
{
  "name": "object",
  "fullPath": "entity > physical entity > object",
  "size": 5234,
  "children": [...]
}
```

**Performance:** O(1) - Uses hash map lookup

---

### GET /search-by-name?val={name}

Search for a node by its name.

**Parameters:**

- `val` (string): Node name (e.g., "dog")

**Response:**

```json
{
  "name": "dog",
  "fullPath": "entity > ... > dog",
  "size": 234,
  "children": [...]
}
```

**Performance:** O(n) - Traverses the node map

## Architecture Decisions

### Lazy Loading Strategy

**Component-level (Code Splitting)**

- All pages are lazy loaded using React.lazy()
- Each route is a separate chunk loaded on navigation
- Suspense boundary with Loader fallback for smooth UX

**Data-level**

- Only direct children are loaded initially
- Clicking on a node fetches its children on demand
- Reduces initial payload and improves performance

### Caching Strategy

**Server-Side Caching**

- Tree structure is built once on server startup
- Node map is cached in memory for fast lookups
- Eliminates database queries for repeated requests

**Client-Side Caching (TanStack Query)**

- 5-minute stale time for all queries
- Automatic background refetching disabled
- Query results cached by unique keys (path or name)
- Reduces unnecessary API calls and improves perceived performance

### Two Search Modes

**Home Page (Path-based)**

- O(1) lookup using full path as key
- Best for navigation through known paths
- Breadcrumb navigation maintains full path

**Search Page (Name-based)**

- O(n) search through all nodes
- Useful when exact path is unknown
- Returns first matching node

### Component Architecture

**Reusable Components**

- `PageContainer` - Consistent page layout wrapper
- `Breadcrumb` - Navigation with chevron separators
- `TreeNode` - Display node with children list
- `Header` - Responsive navigation with mobile overlay
- SVG icons exported to `/assets` for reusability

### Data Processing

**Duplicate Path Handling**

Source file contains duplicate node names in different hierarchy branches (e.g., "bladderpod" appears multiple times). The parser handles this by:

- Detecting duplicate paths during XML traversal
- Merging sizes of all occurrences of the same path
- Outputting only unique paths with combined descendant counts
- Result: ~60,718 unique entries from ~60,942 total XML nodes

### Database Design

**Schema:**

```sql
CREATE TABLE entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT UNIQUE NOT NULL,
  size INTEGER NOT NULL
);
```

**Why SQLite?**

- Embedded database, no separate server needed
- Fast read performance for our use case
- Simple deployment
- Perfect for single-user or small-scale applications

## Scripts

### Client Scripts

- `npm run dev` - Start development server with Vite (runs lint:fix first)
- `npm run build` - TypeScript compilation + Vite production build
- `npm run lint` - Check code with Biome
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run preview` - Preview production build locally

### Server Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run parse:file` - Parse XML file to JSON
- `npm run db:create` - Create database schema
- `npm run db:seed` - Populate database with data

## License

Free for personal and educational use.
