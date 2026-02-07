import os

readme_content = """# AI Toolkit

A comprehensive toolkit for building AI-powered applications with Vercel's AI Gateway.

## Overview

The AI Toolkit provides developers with an integrated environment to explore, test, and implement AI features using models from leading providers like OpenAI, Anthropic, Google, xAI, and more.

## Features

- **Dashboard**: Monitor and manage your AI applications
- **Model Catalog**: Browse and compare 50+ AI models with detailed specifications
- **Playground**: Test models interactively with different configurations
- **Examples**: Explore real-world AI implementation patterns
- **Integration Ready**: Built-in support for Vercel's AI Gateway

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Vercel project with AI Gateway access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/neopilotai/ai-toolkit.git
cd ai-toolkit
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── dashboard/            # Dashboard section
│   ├── models/               # Model catalog and browser
│   ├── playground/           # Interactive model testing
│   ├── examples/             # Example implementations
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
├── lib/                      # Utility functions and helpers
├── public/                   # Static assets
└── scripts/                  # Build and utility scripts
```

## Key Sections

### Models Page (`/models`)
Browse the complete catalog of available AI models from various providers. Filter by:
- Provider (OpenAI, Anthropic, Google, xAI, etc.)
- Model type (Language, Embedding, Image)
- Capabilities (Reasoning, Tool Use, Vision)

View detailed specifications including:
- Context window size
- Maximum output tokens
- Pricing information
- Provider details

### Playground (`/playground`)
Interactively test AI models with:
- Real-time model testing
- Configurable parameters
- Response streaming
- Usage analytics

### Examples (`/examples`)
Pre-built examples demonstrating:
- Chat implementations
- Content generation
- Code generation
- Structured data extraction
- Tool use and function calling

## Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [Implementation Details](./IMPLEMENTATION.md)
- [API Integration Guide](./docs/api-guide.md)

## Environment Variables

Key environment variables for the AI Toolkit:

```
NEXT_PUBLIC_API_URL=          # Public API endpoint (if applicable)
AI_GATEWAY_API_KEY=           # Your Vercel AI Gateway API key
```

## Technologies

- **Framework**: Next.js 15+ with App Router
- **UI Components**: Shadcn UI with Tailwind CSS
- **AI Integration**: Vercel AI SDK
- **Database**: PostgreSQL (optional, for storing conversations/logs)
- **Styling**: Tailwind CSS with custom design tokens

## Contributing

We welcome contributions to the AI Toolkit! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check the documentation in `/docs`
- Review existing examples for common patterns

## License

MIT License - see LICENSE file for details

## Resources

- [Vercel AI Gateway Documentation](https://vercel.com/docs/ai-gateway)
- [AI SDK Documentation](https://sdk.vercel.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Built with love for developers by NeoPilot AI
"""

# Write the README.md file
with open('/vercel/share/v0-project/README.md', 'w') as f:
    f.write(readme_content)

print("README.md created successfully")
