import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, DollarSign, Users, BarChart3, Brain, Target, Shield, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Market } from '../data/types';

interface MarketDetailProps {
  market: Market;
  onBack: () => void;
}

export default function MarketDetail({ market, onBack }: MarketDetailProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [selectedOutcome, setSelectedOutcome] = useState(market.outcomes[0].id);
  const [amount, setAmount] = useState('100');
  const [showPrediction, setShowPrediction] = useState(true);

  const selectedOutcomeData = market.outcomes.find(o => o.id === selectedOutcome)!;
  const sharesEstimate = Math.floor(parseFloat(amount || '0') / selectedOutcomeData.price);
  const potentialReturn = sharesEstimate * 1.0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back to Markets</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Header */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full capitalize">
                    {market.category}
                  </span>
                  {market.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">{market.title}</h1>
                <p className="text-gray-400 text-sm">{market.description}</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                  <DollarSign size={12} /> Volume
                </div>
                <p className="text-white font-semibold">${(market.volume / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Users size={12} /> Liquidity
                </div>
                <p className="text-white font-semibold">${(market.liquidity / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                  <Clock size={12} /> Ends
                </div>
                <p className="text-white font-semibold">{new Date(market.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                  <BarChart3 size={12} /> Traders
                </div>
                <p className="text-white font-semibold">{Math.floor(market.volume / 500).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Price History</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={market.priceHistory}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#6b7280" 
                    fontSize={11}
                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={11}
                    domain={[0, 1]}
                    tickFormatter={(val) => `${Math.round(val * 100)}¢`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#9ca3af' }}
                    formatter={(value: number) => [`${Math.round(value * 100)}¢`, 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Prediction Analysis */}
          {showPrediction && (
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Brain size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">AI Win Rate Prediction</h2>
                    <p className="text-xs text-gray-500">Powered by ensemble ML model</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    {Math.round(market.winRatePrediction.confidence * 100)}%
                  </div>
                  <p className="text-xs text-gray-500">confidence</p>
                </div>
              </div>

              {/* Prediction Summary */}
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Model predicts outcome:</p>
                    <p className="text-lg font-bold text-white">{market.winRatePrediction.predictedOutcome}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Shield size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">
                        {Math.round(market.winRatePrediction.historicalAccuracy * 100)}%
                      </span>
                      <span className="text-gray-500">historical accuracy</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Model Score: {market.winRatePrediction.modelScore}/10</p>
                  </div>
                </div>
              </div>

              {/* Factors */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Key Factors</h3>
                {market.winRatePrediction.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-900/30 rounded-lg p-3">
                    <div className={`mt-0.5 ${
                      factor.impact === 'positive' ? 'text-emerald-400' : 
                      factor.impact === 'negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {factor.impact === 'positive' ? <TrendingUp size={14} /> : 
                       factor.impact === 'negative' ? <TrendingDown size={14} /> : 
                       <AlertTriangle size={14} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{factor.name}</span>
                        <span className="text-xs text-gray-500">Weight: {Math.round(factor.weight * 100)}%</span>
                      </div>
                      <p className="text-xs text-gray-400">{factor.description}</p>
                      <div className="mt-1.5 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            factor.impact === 'positive' ? 'bg-emerald-500' :
                            factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${factor.weight * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edge Indicator */}
              <div className="mt-4 p-3 rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Prediction Edge vs Market</span>
                  <span className={`text-sm font-bold ${
                    Math.abs(market.winRatePrediction.confidence - market.outcomes[0].probability) > 0.05
                      ? 'text-emerald-400' : 'text-gray-400'
                  }`}>
                    {Math.abs(market.winRatePrediction.confidence - market.outcomes[0].probability) > 0.05
                      ? `+${Math.round((market.winRatePrediction.confidence - market.outcomes[0].probability) * 100)}% edge`
                      : 'Market fairly priced'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trading Sidebar */}
        <div className="space-y-6">
          {/* Outcomes */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3">Outcomes</h3>
            <div className="space-y-2">
              {market.outcomes.map(outcome => (
                <button
                  key={outcome.id}
                  onClick={() => setSelectedOutcome(outcome.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    selectedOutcome === outcome.id
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: outcome.color }}></div>
                    <span className="text-sm font-medium text-white">{outcome.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{Math.round(outcome.probability * 100)}¢</span>
                    <p className="text-xs text-gray-500">{Math.round(outcome.probability * 100)}% chance</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Panel */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Trade</h3>
            
            {/* Buy/Sell Toggle */}
            <div className="flex bg-gray-900 rounded-lg p-1 mb-4">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  tradeType === 'buy'
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  tradeType === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1.5 block">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter amount"
              />
            </div>

            {/* Quick amounts */}
            <div className="flex gap-2 mb-4">
              {[25, 50, 100, 500].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="flex-1 py-1.5 text-xs font-medium text-gray-400 bg-gray-900 border border-gray-700 rounded-md hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Trade Summary */}
            <div className="bg-gray-900/50 rounded-lg p-3 mb-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Avg. Price</span>
                <span className="text-white">{selectedOutcomeData.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Est. Shares</span>
                <span className="text-white">{sharesEstimate.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Potential Return</span>
                <span className="text-emerald-400">${potentialReturn.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Potential Profit</span>
                <span className="text-emerald-400">+${(potentialReturn - parseFloat(amount || '0')).toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
              tradeType === 'buy'
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            }`}>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedOutcomeData.name} Shares
            </button>
          </div>

          {/* Market Info */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3">Market Info</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Created</span>
                <span className="text-white">{new Date(market.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Resolution Date</span>
                <span className="text-white">{new Date(market.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category</span>
                <span className="text-white capitalize">{market.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Shares</span>
                <span className="text-white">{market.outcomes.reduce((a, b) => a + b.shares, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
