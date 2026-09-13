import { TrendingUp, TrendingDown, Clock, DollarSign, Flame, Sparkles } from 'lucide-react';
import { Market } from '../data/types';

interface MarketCardProps {
  market: Market;
  onClick: (market: Market) => void;
}

export default function MarketCard({ market, onClick }: MarketCardProps) {
  const primaryOutcome = market.outcomes[0];
  const probabilityPercent = Math.round(primaryOutcome.probability * 100);
  const winRatePercent = Math.round(market.winRatePrediction.confidence * 100);
  
  const formatVolume = (vol: number) => {
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`;
    if (vol >= 1000) return `$${(vol / 1000).toFixed(0)}K`;
    return `$${vol}`;
  };

  const getTimeRemaining = () => {
    const end = new Date(market.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 30) return `${Math.floor(days / 30)}mo`;
    if (days > 0) return `${days}d`;
    return 'Ended';
  };

  return (
    <div
      onClick={() => onClick(market)}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/30 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {market.isHot && (
            <span className="flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">
              <Flame size={12} /> Hot
            </span>
          )}
          {market.isNew && (
            <span className="flex items-center gap-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
              <Sparkles size={12} /> New
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={12} />
          {getTimeRemaining()}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
        {market.title}
      </h3>

      {/* Probability Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">{primaryOutcome.name}</span>
          <span className="text-lg font-bold text-white">{probabilityPercent}¢</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${probabilityPercent}%`,
              background: `linear-gradient(90deg, ${primaryOutcome.color}, ${primaryOutcome.color}dd)`
            }}
          ></div>
        </div>
      </div>

      {/* Win Rate Prediction Badge */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg p-2.5 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <TrendingUp size={10} className="text-emerald-400" />
            </div>
            <span className="text-xs text-emerald-300 font-medium">AI Prediction</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-emerald-400">{winRatePercent}%</span>
            <span className="text-xs text-gray-500">confidence</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Model predicts: <span className="text-white font-medium">{market.winRatePrediction.predictedOutcome}</span>
        </p>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-400">
          <DollarSign size={12} />
          <span>{formatVolume(market.volume)} vol</span>
        </div>
        <div className="flex items-center gap-2">
          {market.outcomes.map(outcome => (
            <div key={outcome.id} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: outcome.color }}></div>
              <span className="text-gray-400">{outcome.name} {Math.round(outcome.probability * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
