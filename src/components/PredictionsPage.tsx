import { Brain, TrendingUp, TrendingDown, Target, Shield, Zap, Award, BarChart3 } from 'lucide-react';
import { markets } from '../data/markets';
import { Market } from '../data/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PredictionsPageProps {
  onMarketClick: (market: Market) => void;
}

export default function PredictionsPage({ onMarketClick }: PredictionsPageProps) {
  // Sort markets by model confidence
  const sortedByConfidence = [...markets].sort(
    (a, b) => b.winRatePrediction.confidence - a.winRatePrediction.confidence
  );

  // Markets where AI disagrees with market (edge opportunities)
  const edgeMarkets = markets
    .map(m => ({
      market: m,
      edge: m.winRatePrediction.confidence - m.outcomes[0].probability
    }))
    .sort((a, b) => Math.abs(b.edge) - Math.abs(a.edge));

  // Aggregate stats
  const avgConfidence = markets.reduce((a, b) => a + b.winRatePrediction.confidence, 0) / markets.length;
  const avgAccuracy = markets.reduce((a, b) => a + b.winRatePrediction.historicalAccuracy, 0) / markets.length;
  const totalEdge = edgeMarkets.filter(e => Math.abs(e.edge) > 0.05).length;

  const chartData = sortedByConfidence.map(m => ({
    name: m.title.length > 25 ? m.title.substring(0, 25) + '...' : m.title,
    confidence: Math.round(m.winRatePrediction.confidence * 100),
    marketPrice: Math.round(m.outcomes[0].probability * 100),
    accuracy: Math.round(m.winRatePrediction.historicalAccuracy * 100)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Win Rate Predictions</h1>
            <p className="text-gray-400 text-sm">Ensemble ML model analyzing market inefficiencies</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Target size={16} />
            <span className="text-xs font-medium">Avg Confidence</span>
          </div>
          <p className="text-2xl font-bold text-white">{Math.round(avgConfidence * 100)}%</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Shield size={16} />
            <span className="text-xs font-medium">Historical Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white">{Math.round(avgAccuracy * 100)}%</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Zap size={16} />
            <span className="text-xs font-medium">Edge Opportunities</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalEdge}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Award size={16} />
            <span className="text-xs font-medium">Model Score</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {(markets.reduce((a, b) => a + b.winRatePrediction.modelScore, 0) / markets.length).toFixed(1)}
            <span className="text-sm text-gray-500">/10</span>
          </p>
        </div>
      </div>

      {/* Confidence Chart */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <BarChart3 size={18} className="text-emerald-400" />
            Model Confidence vs Market Price
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-gray-400">AI Confidence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span className="text-gray-400">Market Price</span>
            </div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={10} angle={-20} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af', fontSize: '11px' }}
              />
              <Bar dataKey="confidence" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="marketPrice" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Edge Opportunities */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
        <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
          <Zap size={18} className="text-amber-400" />
          Top Edge Opportunities
        </h2>
        <p className="text-gray-400 text-sm mb-4">Markets where our AI model significantly disagrees with current market pricing</p>
        <div className="space-y-3">
          {edgeMarkets.slice(0, 6).map(({ market, edge }) => (
            <div
              key={market.id}
              onClick={() => onMarketClick(market)}
              className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-emerald-500/30 cursor-pointer transition-all"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-white truncate">{market.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">
                    Market: <span className="text-white">{Math.round(market.outcomes[0].probability * 100)}%</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    AI: <span className="text-emerald-400">{Math.round(market.winRatePrediction.confidence * 100)}%</span>
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
                edge > 0.05 ? 'bg-emerald-500/10 text-emerald-400' :
                edge < -0.05 ? 'bg-red-500/10 text-red-400' :
                'bg-gray-700/50 text-gray-400'
              }`}>
                {edge > 0 ? <TrendingUp size={14} /> : edge < 0 ? <TrendingDown size={14} /> : null}
                {edge > 0 ? '+' : ''}{Math.round(edge * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Predictions */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
          <Brain size={18} className="text-emerald-400" />
          All Model Predictions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-700/50">
                <th className="text-left pb-3 font-medium">Market</th>
                <th className="text-center pb-3 font-medium">Prediction</th>
                <th className="text-center pb-3 font-medium">Confidence</th>
                <th className="text-center pb-3 font-medium">Market Price</th>
                <th className="text-center pb-3 font-medium">Edge</th>
                <th className="text-center pb-3 font-medium">Accuracy</th>
                <th className="text-center pb-3 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedByConfidence.map(market => {
                const edge = market.winRatePrediction.confidence - market.outcomes[0].probability;
                return (
                  <tr
                    key={market.id}
                    onClick={() => onMarketClick(market)}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <p className="text-sm text-white font-medium truncate max-w-[200px]">{market.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{market.category}</p>
                    </td>
                    <td className="text-center py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        market.winRatePrediction.predictedOutcome === 'Yes'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {market.winRatePrediction.predictedOutcome}
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className="text-sm font-bold text-emerald-400">
                        {Math.round(market.winRatePrediction.confidence * 100)}%
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className="text-sm text-white">
                        {Math.round(market.outcomes[0].probability * 100)}%
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className={`text-sm font-bold ${
                        edge > 0.05 ? 'text-emerald-400' : edge < -0.05 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {edge > 0 ? '+' : ''}{Math.round(edge * 100)}%
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className="text-sm text-cyan-400">
                        {Math.round(market.winRatePrediction.historicalAccuracy * 100)}%
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className="text-sm text-white font-medium">
                        {market.winRatePrediction.modelScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
