#!/bin/bash

cat > /vercel/share/v0-project/README.md << 'EOF'
# AI Toolkit

A comprehensive toolkit for building AI-powered applications using Vercel's AI Gateway. Browse models, experiment with the playground, and explore real-world examples.

## Features

- **Browse AI Gateway Models** - Discover and compare 50+ models from leading AI providers (OpenAI, Anthropic, Google, xAI, Groq, and more)
- **Interactive Playground** - Test different models with custom prompts and settings
- **Code Examples** - Real-world implementations and best practices
- **Dashboard** - Quick access to all toolkit features

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/neopilotai/ai-toolkit.git
cd ai-toolkit

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Pages

- **Dashboard** (`/`) - Overview and quick access to all features
- **Models** (`/models`) - Browse and filter AI models from different providers
- **Playground** (`/playground`) - Interactive testing environment for models
- **Examples** (`/examples`) - Code examples and use cases

## Project Structure

```
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home/dashboard page
│   ├── models/       # Models catalog page
│   ├── playground/   # Playground page
│   └── examples/     # Examples page
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── styles/          # Global styles and theming
└── public/          # Static assets
```

## Deployment

### Deploy to Vercel

The easiest way to deploy this application is to use Vercel:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Vercel AI Gateway (automatically configured)
AI_GATEWAY_API_KEY=your_api_key_here
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Vercel AI SDK** - AI integration library

## Learn More

- [Vercel AI Gateway Documentation](https://vercel.com/docs/ai-gateway)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub or visit [Vercel Support](https://vercel.com/help).
EOF
