import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { markets } from '../data/markets';
import { PortfolioPosition, Market } from '../data/types';

interface PortfolioPageProps {
  onMarketClick: (market: Market) => void;
}

// Simulated portfolio positions
const portfolioPositions: PortfolioPosition[] = [
  {
    marketId: '1',
    outcomeId: '1a',
    shares: 200,
    avgPrice: 0.65,
    currentPrice: 0.72,
    pnl: 14,
    pnlPercent: 10.8
  },
  {
    marketId: '2',
    outcomeId: '2b',
    shares: 500,
    avgPrice: 0.60,
    currentPrice: 0.55,
    pnl: -25,
    pnlPercent: -8.3
  },
  {
    marketId: '3',
    outcomeId: '3a',
    shares: 350,
    avgPrice: 0.55,
    currentPrice: 0.63,
    pnl: 28,
    pnlPercent: 14.5
  },
  {
    marketId: '5',
    outcomeId: '5b',
    shares: 400,
    avgPrice: 0.58,
    currentPrice: 0.62,
    pnl: 16,
    pnlPercent: 6.9
  },
  {
    marketId: '11',
    outcomeId: '11a',
    shares: 150,
    avgPrice: 0.50,
    currentPrice: 0.67,
    pnl: 25.5,
    pnlPercent: 34.0
  },
  {
    marketId: '8',
    outcomeId: '8b',
    shares: 600,
    avgPrice: 0.85,
    currentPrice: 0.88,
    pnl: 18,
    pnlPercent: 3.5
  }
];

export default function PortfolioPage({ onMarketClick }: PortfolioPageProps) {
  const totalValue = portfolioPositions.reduce((acc, pos) => acc + (pos.shares * pos.currentPrice), 0);
  const totalCost = portfolioPositions.reduce((acc, pos) => acc + (pos.shares * pos.avgPrice), 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPercent = (totalPnl / totalCost) * 100;
  const cashBalance = 12450 - totalValue;

  const pieData = portfolioPositions.map(pos => {
    const market = markets.find(m => m.id === pos.marketId)!;
    return {
      name: market.title.substring(0, 30),
      value: Math.round(pos.shares * pos.currentPrice),
      color: market.outcomes.find(o => o.id === pos.outcomeId)?.color || '#6b7280'
    };
  });

  const getMarketForPosition = (pos: PortfolioPosition) => markets.find(m => m.id === pos.marketId)!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Portfolio</h1>
            <p className="text-gray-400 text-sm">Track your positions and performance</p>
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <DollarSign size={16} />
            <span className="text-xs font-medium">Portfolio Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">Total P&L</span>
          </div>
          <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
          </p>
          <p className={`text-xs ${totalPnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <PieChart size={16} />
            <span className="text-xs font-medium">Positions</span>
          </div>
          <p className="text-2xl font-bold text-white">{portfolioPositions.length}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Wallet size={16} />
            <span className="text-xs font-medium">Cash Balance</span>
          </div>
          <p className="text-2xl font-bold text-white">${cashBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Positions Table */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Open Positions</h2>
            <div className="space-y-3">
              {portfolioPositions.map((pos, idx) => {
                const market = getMarketForPosition(pos);
                const outcome = market.outcomes.find(o => o.id === pos.outcomeId)!;
                const currentValue = pos.shares * pos.currentPrice;
                
                return (
                  <div
                    key={idx}
                    onClick={() => onMarketClick(market)}
                    className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-emerald-500/30 cursor-pointer transition-all"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium text-white truncate">{market.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: outcome.color }}></div>
                        <span className="text-xs text-gray-400">{outcome.name} × {pos.shares} shares</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">${currentValue.toFixed(2)}</p>
                      <div className={`flex items-center gap-1 justify-end ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pos.pnl >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        <span className="text-xs font-medium">
                          {pos.pnl >= 0 ? '+' : ''}{pos.pnlPercent.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Allocation</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`$${value}`, 'Value']}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-400 truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span className="text-xs text-white font-medium">${item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Performance</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Winning Positions</span>
                <span className="text-sm font-medium text-emerald-400">
                  {portfolioPositions.filter(p => p.pnl > 0).length}/{portfolioPositions.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Best Performer</span>
                <span className="text-sm font-medium text-emerald-400">
                  +{Math.max(...portfolioPositions.map(p => p.pnlPercent)).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Worst Performer</span>
                <span className="text-sm font-medium text-red-400">
                  {Math.min(...portfolioPositions.map(p => p.pnlPercent)).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Avg Return</span>
                <span className="text-sm font-medium text-white">
                  +{(portfolioPositions.reduce((a, b) => a + b.pnlPercent, 0) / portfolioPositions.length).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
