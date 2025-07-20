# Customer Hub - File Management & Order Processing System

A modern React-based web application for managing customer orders, file uploads, and vendor interactions with a focus on USB manufacturing and artwork processing.

## Features

### Customer Portal
- **Order Management**: View and manage orders with detailed tracking
- **File Upload**: Drag-and-drop file uploads with cloud storage integration
- **Artwork Management**: Upload and proof artwork with reviewer collaboration
- **Data Processing**: Configure and upload data files for USB manufacturing
- **Version Control**: Track different versions of orders and files

### Vendor Portal
- **Photo Samples**: Upload and manage product photo samples
- **File Management**: Access customer files and upload production materials
- **Production Tracking**: Monitor production status and add comments
- **Bulk Operations**: Handle multiple files and orders efficiently

### File Management
- **Cloud Integration**: Support for Google Drive, Dropbox, OneDrive, and Box
- **Resumable Uploads**: Large file uploads with pause/resume capability
- **AI Recommendations**: Smart file naming and organization suggestions
- **Version Tracking**: Complete file history and version management

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM v7
- **State Management**: Redux + Redux Saga
- **Styling**: Tailwind CSS + Ant Design components
- **File Uploads**: Uppy.js with Tus protocol
- **Icons**: Lucide React
- **PDF Handling**: React PDF

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd customer_hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the proxy server (for API calls):
```bash
npm run server
```

5. Run both simultaneously:
```bash
npm run dev:all
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── component/          # Reusable UI components
├── container/          # Container components with business logic
├── page/              # Page components
├── states/            # Redux store, actions, and reducers
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and hooks
└── App.tsx            # Main application component
```

## Key Components

### File Upload System
- **UppyUploader**: Main upload component with dashboard interface
- **useUppy**: Custom hook for Uppy configuration and file handling
- **Cloud Providers**: Integration with major cloud storage services

### Order Management
- **OrdersList**: Display and filter customer orders
- **OrderDetail**: Detailed order view with version management
- **StepSetup/Upload**: Multi-step order processing workflow

### Artwork Processing
- **ArtworkUpload**: Artwork file upload with guidelines
- **ArtworkProof**: Collaborative artwork review system
- **PhotoSamples**: Product sample management

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://everyusb.info
VITE_COMPANION_URL=http://localhost:3020/companion
```

### Upload Configuration
- **Max File Size**: 10GB per file
- **Supported Formats**: All file types allowed
- **Chunk Size**: 5MB for resumable uploads
- **Cloud Storage**: Configured for major providers

## API Integration

The application uses a proxy server to communicate with the backend API:
- **Proxy Server**: Express.js server on port 3001
- **Target API**: `https://everyusb.info`
- **CORS**: Enabled for cross-origin requests

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start proxy server
- `npm run dev:all` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict mode enabled

## Deployment

### Production Build
```bash
npm run build
```

### Vercel Deployment
The project includes `vercel.json` configuration for SPA routing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is proprietary software developed for USB manufacturing and order management.