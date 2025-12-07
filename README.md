# ImageNet Hierarchy Viewer

A full-stack web application for browsing and exploring the ImageNet hierarchy structure. Built with React, TypeScript, and Node.js, this application provides an intuitive interface to navigate through the ImageNet dataset's hierarchical organization.

## Features

- **Path-based Search**: Navigate through the hierarchy using full paths for O(1) lookup performance
- **Name-based Search**: Search for nodes by name with O(n) search capability
- **Tree Visualization**: View the complete hierarchy structure in JSON format
- **Breadcrumb Navigation**: Easy navigation through the hierarchy with clickable breadcrumbs
- **Responsive Design**: Mobile-friendly interface with hamburger menu
- **Real-time Search**: Debounced search with 1-second delay for optimal performance
- **Contact Page**: Developer information and skills showcase

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

- **Node.js** - Runtime environment
- **Express** - Web server framework
- **TypeScript** - Type safety
- **Better-SQLite3** - Database
- **TSX** - TypeScript execution
- **xml2js** - XML parsing
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Finviz
   ```

2. **Parse the XML data** (First time only)

   ```bash
   cd calc
   npm install
   npm run parse
   # This converts structure_released.xml to JSON
   ```

3. **Setup the server**

   ```bash
   cd ../server
   npm install
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

### Production Build

1. **Build the client**

   ```bash
   cd client
   npm run build
   ```

2. **Build the server**
   ```bash
   cd server
   npm run build
   ```

## API Endpoints

The server exposes three REST endpoints:

### GET /tree

Returns the complete tree structure.

**Response:** Full hierarchy tree with nested children

**Performance:** O(1) - Data is cached in memory

---

### GET /search-by-fullPath?val={fullPath}

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

- Only direct children are loaded initially
- Clicking on a node fetches its children on demand
- Reduces initial payload and improves performance

### Server-Side Caching

- Tree structure is built once on server startup
- Node map is cached in memory for fast lookups
- Eliminates database queries for repeated requests

### Two Search Modes

**Home Page (Path-based)**

- O(1) lookup using full path as key
- Best for navigation through known paths
- Breadcrumb navigation maintains full path

**Search Page (Name-based)**

- O(n) search through all nodes
- Useful when exact path is unknown
- Returns first matching node

### Database Design

**Schema:**

```sql
CREATE TABLE entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT UNIQUE NOT NULL,
  size INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_path ON entries(path);
CREATE INDEX idx_size ON entries(size);
```

**Why SQLite?**

- Embedded database, no separate server needed
- Fast read performance for our use case
- Simple deployment
- Perfect for single-user or small-scale applications

## Scripts

### Client Scripts

- `npm run dev` - Start development server (runs lint:fix first)
- `npm run build` - Build for production
- `npm run lint` - Check code for issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run preview` - Preview production build

### Server Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run db:create` - Create database schema
- `npm run db:seed` - Populate database with data
- `npm run parse` - Parse XML to JSON (in calc folder)

## License

This project is private and proprietary.
