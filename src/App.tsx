import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, TrendingUp, Flame, Clock, BarChart3, Brain, ChevronDown, X } from 'lucide-react';
import Header from './components/Header';
import MarketCard from './components/MarketCard';
import MarketDetail from './components/MarketDetail';
import PredictionsPage from './components/PredictionsPage';
import PortfolioPage from './components/PortfolioPage';
import LeaderboardPage from './components/LeaderboardPage';
import { markets, categories } from './data/markets';
import { Market, Category, SortOption } from './data/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('volume');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMarkets = useMemo(() => {
    let result = [...markets];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'volume':
        result.sort((a, b) => b.volume - a.volume);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'ending-soon':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'highest-probability':
        result.sort((a, b) => b.outcomes[0].probability - a.outcomes[0].probability);
        break;
      case 'win-rate':
        result.sort((a, b) => b.winRatePrediction.confidence - a.winRatePrediction.confidence);
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleMarketClick = (market: Market) => {
    setSelectedMarket(market);
    setCurrentPage('market-detail');
  };

  const handleBack = () => {
    setSelectedMarket(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedMarket(null);
  };

  // If viewing a specific market
  if (currentPage === 'market-detail' && selectedMarket) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <MarketDetail market={selectedMarket} onBack={handleBack} />
      </div>
    );
  }

  // Predictions page
  if (currentPage === 'predictions') {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <PredictionsPage onMarketClick={handleMarketClick} />
      </div>
    );
  }

  // Portfolio page
  if (currentPage === 'portfolio') {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <PortfolioPage onMarketClick={handleMarketClick} />
      </div>
    );
  }

  // Leaderboard page
  if (currentPage === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <LeaderboardPage />
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-950">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 border border-gray-700/50 rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-emerald-400" />
              </div>
              <span className="text-emerald-400 text-sm font-medium">AI-Powered Predictions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Trade on What Happens Next
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mb-4">
              Predict real-world events with our high win-rate AI model. Our ensemble ML system analyzes 
              thousands of data points to identify market inefficiencies and predict outcomes with up to 91% confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-xs text-gray-300"><span className="text-white font-bold">$38.2M</span> Total Volume</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2">
                <Flame size={14} className="text-orange-400" />
                <span className="text-xs text-gray-300"><span className="text-white font-bold">12</span> Active Markets</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2">
                <Brain size={14} className="text-purple-400" />
                <span className="text-xs text-gray-300"><span className="text-white font-bold">78%</span> Avg AI Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-all"
          >
            <SlidersHorizontal size={14} />
            Filters
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { id: 'volume' as SortOption, label: 'Volume', icon: BarChart3 },
            { id: 'newest' as SortOption, label: 'Newest', icon: Clock },
            { id: 'ending-soon' as SortOption, label: 'Ending Soon', icon: Clock },
            { id: 'highest-probability' as SortOption, label: 'Highest Prob.', icon: TrendingUp },
            { id: 'win-rate' as SortOption, label: 'AI Win Rate', icon: Brain },
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                sortBy === option.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-400 hover:text-white bg-gray-800/30 border border-transparent hover:border-gray-700'
              }`}
            >
              <option.icon size={12} />
              {option.label}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gray-700 text-white border border-gray-600'
                  : 'text-gray-400 hover:text-white bg-gray-800/30 border border-transparent hover:border-gray-700'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span className="text-gray-600 ml-0.5">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map(market => (
              <MarketCard
                key={market.id}
                market={market}
                onClick={handleMarketClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-white font-semibold mb-2">No markets found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">$38.2M</p>
              <p className="text-xs text-gray-500 mt-1">Total Volume Traded</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12,847</p>
              <p className="text-xs text-gray-500 mt-1">Active Traders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">78.3%</p>
              <p className="text-xs text-gray-500 mt-1">AI Model Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-gray-500 mt-1">Markets Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
