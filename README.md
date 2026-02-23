# Highlight VMAF Frontend V2

A modern web application for evaluating video quality using VMAF (Video Multi-Method Assessment Fusion). Built with Next.js 16, React 19, and TypeScript.

## Features

### 📹 Video Management

- Browse and search videos with advanced filtering
- Real-time status tracking (Pending, Processing, Completed, Failed)
- Pagination support with customizable page sizes
- Sort by ID, title, or status

### 🎯 Highlight Analysis

- View detailed highlight segments for each video
- Side-by-side comparison of original and highlight videos
- Expandable/collapsible highlight sections with frame details
- VMAF metrics (mean, min, max) for quality assessment

### 🖼️ Frame Comparison

- Frame-by-frame analysis with VMAF scores
- Side-by-side original vs highlight frame comparison
- Visual quality indicator bars
- Color-coded VMAF scores (green: excellent, yellow: good, orange: fair, red: poor)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd highlight-vmaf-fe-v2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## Project Structure

```
highlight-vmaf-fe-v2/
├── app/
│   ├── components/
│   │   ├── VideosList.tsx       # Videos list with filters
│   │   └── FramesList.tsx       # Frames display component
│   ├── videos/
│   │   └── [id]/
│   │       └── page.tsx         # Video detail page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── lib/
│   ├── api.ts                   # API client functions
│   └── types.ts                 # TypeScript type definitions
├── public/                      # Static assets
├── API_DOCS.md                  # API documentation
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## API Integration

The application connects to the Highlight VMAF API at:

```
https://audio3.tivi360.vn/api/v1
```

### Available Endpoints:

- `GET /videos` - List videos with pagination and filters
- `GET /videos/{id}/highlights` - Get highlights for a video
- `GET /highlights/{id}/frames` - Get frames for a highlight

See [API_DOCS.md](API_DOCS.md) for complete API documentation.

## Usage Guide

### Viewing Videos

1. **Browse Videos**: The home page displays all available videos in a table format
2. **Search**: Use the search box to filter videos by title
3. **Filter by Status**: Select a status from the dropdown to filter videos
4. **Sort**: Choose sort criteria (ID, Title, Status) and direction (Ascending/Descending)
5. **Pagination**: Navigate through pages using the pagination controls at the bottom

### Video Details

1. **Click on a Video**: Click "View Details →" on any video to see its highlights
2. **Video Comparison**: View original and highlight videos side-by-side
3. **Browse Highlights**: Scroll through the list of highlight segments
4. **View Frames**: Click on any highlight to expand and see its frames

### Frame Analysis

1. **Expand Highlight**: Click on a highlight row to reveal its frames
2. **Compare Frames**: Each frame shows original and highlight side-by-side
3. **VMAF Score**: Review the VMAF score and quality indicator for each frame
4. **Navigate Frames**: Use pagination to browse through all frames

## Video Status Codes

- **0 (Pending)**: Video is queued for processing
- **1 (Processing)**: Video is currently being analyzed
- **2 (Completed)**: Analysis completed successfully
- **3 (Failed)**: Analysis failed

## VMAF Score Interpretation

VMAF scores range from 0-100:

- **90-100**: Excellent quality (Green)
- **75-89**: Good quality (Yellow)
- **50-74**: Fair quality (Orange)
- **0-49**: Poor quality (Red)

## Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Next.js Image**: Optimized image loading

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory to override default settings:

```env
# API Base URL (optional, defaults to https://audio3.tivi360.vn/api/v1)
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com/api/v1
```

### Image Domains

External image domains are configured in [next.config.ts](next.config.ts). The current configuration allows all HTTPS and HTTP domains for flexibility during development.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and confidential.

## Support

For issues or questions, please contact the development team.
