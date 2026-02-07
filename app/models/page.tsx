'use client';

import { Header } from '@/components/header';
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Copy, ExternalLink } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  provider: string;
  type: 'language' | 'embedding' | 'image';
  contextWindow: number;
  maxTokens: number;
  pricing?: {
    input: string;
    output: string;
  };
  tags: string[];
  capabilities: string[];
}

const MODELS: Model[] = [
  {
    id: 'openai/gpt-5.2',
    name: 'GPT-5.2',
    provider: 'OpenAI',
    type: 'language',
    contextWindow: 128000,
    maxTokens: 16000,
    pricing: { input: '0.003', output: '0.006' },
    tags: ['reasoning', 'tool-use', 'vision'],
    capabilities: ['Text Generation', 'Vision', 'Tool Use', 'Function Calling'],
  },
  {
    id: 'anthropic/claude-opus-4.5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    type: 'language',
    contextWindow: 200000,
    maxTokens: 4096,
    pricing: { input: '0.003', output: '0.015' },
    tags: ['reasoning', 'tool-use'],
    capabilities: ['Text Generation', 'Tool Use', 'Complex Reasoning'],
  },
  {
    id: 'google/gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    type: 'language',
    contextWindow: 1000000,
    maxTokens: 64000,
    pricing: { input: '0.000002', output: '0.000012' },
    tags: ['reasoning', 'vision', 'file-input'],
    capabilities: ['Text Generation', 'Vision', 'File Input', 'Large Context'],
  },
  {
    id: 'xai/grok-4.1-fast-non-reasoning',
    name: 'Grok 4.1 Fast',
    provider: 'xAI',
    type: 'language',
    contextWindow: 128000,
    maxTokens: 8192,
    pricing: { input: '0.002', output: '0.01' },
    tags: ['fast', 'reasoning'],
    capabilities: ['Text Generation', 'Fast Inference', 'Real-time'],
  },
  {
    id: 'groq/mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    provider: 'Groq',
    type: 'language',
    contextWindow: 32768,
    maxTokens: 4096,
    pricing: { input: '0.00024', output: '0.00024' },
    tags: ['fast', 'open-source'],
    capabilities: ['Text Generation', 'Ultra-Fast Inference'],
  },
  {
    id: 'meta/llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    type: 'language',
    contextWindow: 8192,
    maxTokens: 2048,
    pricing: { input: '0.0007', output: '0.0009' },
    tags: ['open-source', 'reasoning'],
    capabilities: ['Text Generation', 'Open Source', 'Large Scale'],
  },
  {
    id: 'mistral/mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    type: 'language',
    contextWindow: 128000,
    maxTokens: 8192,
    pricing: { input: '0.00024', output: '0.00072' },
    tags: ['reasoning', 'tool-use'],
    capabilities: ['Text Generation', 'Tool Use', 'Large Context'],
  },
  {
    id: 'deepseek/deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    type: 'language',
    contextWindow: 64000,
    maxTokens: 4096,
    pricing: { input: '0.00027', output: '0.00108' },
    tags: ['reasoning', 'coding'],
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation'],
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    type: 'language',
    contextWindow: 128000,
    maxTokens: 4096,
    pricing: { input: '0.00015', output: '0.0006' },
    tags: ['fast', 'cost-effective'],
    capabilities: ['Text Generation', 'Vision', 'Fast & Affordable'],
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    type: 'language',
    contextWindow: 200000,
    maxTokens: 4096,
    pricing: { input: '0.003', output: '0.015' },
    tags: ['vision', 'tool-use'],
    capabilities: ['Text Generation', 'Vision', 'Tool Use'],
  },
  {
    id: 'google/text-embedding-005',
    name: 'Text Embedding 005',
    provider: 'Google',
    type: 'embedding',
    contextWindow: 2048,
    maxTokens: 1,
    pricing: { input: '0.000025', output: '0.000025' },
    tags: ['embedding'],
    capabilities: ['Embedding Generation', 'Semantic Search'],
  },
  {
    id: 'openai/text-embedding-3-small',
    name: 'Text Embedding 3 Small',
    provider: 'OpenAI',
    type: 'embedding',
    contextWindow: 8192,
    maxTokens: 1,
    pricing: { input: '0.00002', output: '0.00002' },
    tags: ['embedding', 'fast'],
    capabilities: ['Embedding Generation', 'Fast Embedding'],
  },
  {
    id: 'openai/dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    type: 'image',
    contextWindow: 1024,
    maxTokens: 1,
    pricing: { input: '0.04', output: '0.04' },
    tags: ['image-generation', 'vision'],
    capabilities: ['Image Generation', 'High Quality'],
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    type: 'language',
    contextWindow: 1000000,
    maxTokens: 8192,
    pricing: { input: '0.000075', output: '0.0003' },
    tags: ['fast', 'multimodal'],
    capabilities: ['Text Generation', 'Vision', 'Fast'],
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'OpenAI',
    type: 'language',
    contextWindow: 128000,
    maxTokens: 8192,
    pricing: { input: '0.0001', output: '0.0004' },
    tags: ['fast', 'cost-effective'],
    capabilities: ['Text Generation', 'Ultra Fast', 'Budget Friendly'],
  },
];

const PROVIDERS = ['All', ...new Set(MODELS.map(m => m.provider))].sort();
const MODEL_TYPES = ['All', 'language', 'embedding', 'image'];
const ALL_TAGS = ['All', ...new Set(MODELS.flatMap(m => m.tags))].sort();

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredModels = useMemo(() => {
    return MODELS.filter(model => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProvider =
        selectedProvider === 'All' || model.provider === selectedProvider;
      const matchesType = selectedType === 'All' || model.type === selectedType;
      const matchesTag =
        selectedTag === 'All' || model.tags.includes(selectedTag);

      return matchesSearch && matchesProvider && matchesType && matchesTag;
    });
  }, [searchQuery, selectedProvider, selectedType, selectedTag]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'language':
        return 'bg-blue-900/30 text-blue-300';
      case 'embedding':
        return 'bg-purple-900/30 text-purple-300';
      case 'image':
        return 'bg-pink-900/30 text-pink-300';
      default:
        return 'bg-gray-900/30 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Browse AI Gateway Models
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover and compare 100+ AI models from leading providers. Filter
            by capabilities, pricing, and performance metrics to find the
            perfect model for your use case.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search models by name or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-input-bg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-4">
            {/* Provider Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  Provider
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROVIDERS.map(provider => (
                  <button
                    key={provider}
                    onClick={() => setSelectedProvider(provider)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedProvider === provider
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-input-bg text-foreground hover:bg-hover-bg'
                    }`}
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  Model Type
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {MODEL_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-input-bg text-foreground hover:bg-hover-bg'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-medium text-foreground">
                  Capabilities
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-input-bg text-foreground hover:bg-hover-bg'
                    }`}
                  >
                    {tag
                      .split('-')
                      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                      .join('-')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredModels.length} of {MODELS.length} models
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <Card
              key={model.id}
              className="hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {model.provider}
                    </CardDescription>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(model.type)}`}
                  >
                    {model.type === 'language' && 'LLM'}
                    {model.type === 'embedding' && 'Embed'}
                    {model.type === 'image' && 'Image'}
                  </span>
                </div>

                {/* Model ID with Copy */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Model ID</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono bg-input-bg px-2 py-1 rounded text-foreground truncate">
                      {model.id}
                    </code>
                    <button
                      onClick={() => handleCopyId(model.id)}
                      className="p-1.5 rounded hover:bg-hover-bg transition-colors"
                      title="Copy model ID"
                    >
                      {copiedId === model.id ? (
                        <span className="text-xs text-success">✓</span>
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Context</div>
                    <div className="text-sm font-semibold text-foreground">
                      {model.contextWindow.toLocaleString()} tokens
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Max Output
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {model.maxTokens.toLocaleString()} tokens
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                {model.pricing && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Pricing (per 1M tokens)
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Input
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          ${model.pricing.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Output
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          ${model.pricing.output}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {model.tags.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Capabilities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {model.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag
                            .split('-')
                            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                            .join('-')}
                        </span>
                      ))}
                      {model.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          +{model.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="secondary" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredModels.length === 0 && (
          <div className="text-center py-16">
            <div className="text-lg text-muted-foreground mb-2">
              No models found
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedProvider('All');
                setSelectedType('All');
                setSelectedTag('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
