import { Trophy, Medal, TrendingUp, Target, Crown, Star } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  profit: number;
  profitPercent: number;
  trades: number;
  winRate: number;
  streak: number;
  topPick: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: 'CryptoOracle', avatar: '🧙', profit: 45230, profitPercent: 127.3, trades: 342, winRate: 78.2, streak: 12, topPick: 'Fed Rate Cut' },
  { rank: 2, username: 'PredictionKing', avatar: '👑', profit: 38920, profitPercent: 98.7, trades: 289, winRate: 75.1, streak: 8, topPick: 'GPT-5 Release' },
  { rank: 3, username: 'DataDriven', avatar: '📊', profit: 31450, profitPercent: 84.5, trades: 456, winRate: 72.8, streak: 6, topPick: 'Dem House Win' },
  { rank: 4, username: 'AlphaSeeker', avatar: '🎯', profit: 27890, profitPercent: 76.2, trades: 198, winRate: 71.4, streak: 5, topPick: 'SpaceX Starship' },
  { rank: 5, username: 'MarketWhisper', avatar: '💡', profit: 24100, profitPercent: 68.9, trades: 267, winRate: 69.8, streak: 4, topPick: 'BTC $150K' },
  { rank: 6, username: 'QuantTrader', avatar: '⚡', profit: 21340, profitPercent: 62.1, trades: 523, winRate: 68.5, streak: 7, topPick: 'ETH Flippening' },
  { rank: 7, username: 'NewsHawk', avatar: '🦅', profit: 18920, profitPercent: 57.8, trades: 312, winRate: 67.2, streak: 3, topPick: 'Taylor Swift Album' },
  { rank: 8, username: 'ProbabilityPro', avatar: '🎲', profit: 16750, profitPercent: 52.4, trades: 445, winRate: 66.9, streak: 5, topPick: 'GDP Growth' },
  { rank: 9, username: 'EdgeHunter', avatar: '🏹', profit: 14230, profitPercent: 48.1, trades: 178, winRate: 65.3, streak: 2, topPick: 'Bank Failure' },
  { rank: 10, username: 'TrendRider', avatar: '🌊', profit: 12890, profitPercent: 44.7, trades: 234, winRate: 64.1, streak: 4, topPick: 'Champions League' },
  { rank: 11, username: 'ModelMaker', avatar: '🤖', profit: 11240, profitPercent: 41.2, trades: 389, winRate: 63.8, streak: 3, topPick: 'AI Turing Test' },
  { rank: 12, username: 'SharpBet', avatar: '🔪', profit: 9870, profitPercent: 38.5, trades: 156, winRate: 62.4, streak: 2, topPick: 'Temperature Record' },
];

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={18} className="text-amber-400" />;
      case 2: return <Medal size={18} className="text-gray-300" />;
      case 3: return <Medal size={18} className="text-amber-600" />;
      default: return <span className="text-sm text-gray-500 w-[18px] text-center">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-amber-500/5 border-amber-500/20';
      case 2: return 'bg-gray-400/5 border-gray-400/20';
      case 3: return 'bg-amber-700/5 border-amber-700/20';
      default: return 'bg-gray-900/30 border-gray-700/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
            <p className="text-gray-400 text-sm">Top predictors ranked by profit and win rate</p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((entry, idx) => (
          <div
            key={entry.rank}
            className={`relative bg-gray-800/50 border rounded-xl p-4 sm:p-6 text-center ${
              idx === 0 ? 'border-amber-500/30 order-2 sm:order-2 mt-0 sm:mt-0' :
              idx === 1 ? 'border-gray-400/20 order-1 sm:order-1 mt-4 sm:mt-8' :
              'border-amber-700/20 order-3 sm:order-3 mt-4 sm:mt-8'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              {getRankIcon(entry.rank)}
            </div>
            <div className="text-3xl sm:text-4xl mb-2">{entry.avatar}</div>
            <p className="text-white font-semibold text-sm sm:text-base truncate">{entry.username}</p>
            <p className="text-emerald-400 font-bold text-lg sm:text-xl mt-1">
              +${(entry.profit / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {entry.winRate}% win rate
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star size={10} className="text-amber-400" />
              <span className="text-xs text-amber-400">{entry.streak} streak</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            Full Rankings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-700/50">
                <th className="text-left py-3 px-4 font-medium">Rank</th>
                <th className="text-left py-3 px-4 font-medium">Trader</th>
                <th className="text-right py-3 px-4 font-medium">Profit</th>
                <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Return</th>
                <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Trades</th>
                <th className="text-right py-3 px-4 font-medium">Win Rate</th>
                <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Streak</th>
                <th className="text-right py-3 px-4 font-medium hidden lg:table-cell">Top Pick</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map(entry => (
                <tr key={entry.rank} className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${getRankBg(entry.rank)}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{entry.avatar}</span>
                      <span className="text-sm font-medium text-white">{entry.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-bold text-emerald-400">+${entry.profit.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">
                    <span className="text-sm text-emerald-400">+{entry.profitPercent}%</span>
                  </td>
                  <td className="py-3 px-4 text-right hidden sm:table-cell">
                    <span className="text-sm text-gray-300">{entry.trades}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${entry.winRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{entry.winRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right hidden md:table-cell">
                    <span className="text-sm text-amber-400">🔥 {entry.streak}</span>
                  </td>
                  <td className="py-3 px-4 text-right hidden lg:table-cell">
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded-full">{entry.topPick}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Position */}
      <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Target size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Your Position</p>
              <p className="text-xs text-gray-400">Rank #47 of 12,847 traders</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-emerald-400">+$2,340</p>
            <p className="text-xs text-gray-400">68.5% win rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
