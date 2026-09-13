export interface Market {
  id: string;
  title: string;
  description: string;
  category: Category;
  outcomes: Outcome[];
  volume: number;
  liquidity: number;
  endDate: string;
  createdAt: string;
  priceHistory: PricePoint[];
  winRatePrediction: WinRatePrediction;
  tags: string[];
  isHot: boolean;
  isNew: boolean;
}

export interface Outcome {
  id: string;
  name: string;
  probability: number;
  shares: number;
  price: number;
  color: string;
}

export interface PricePoint {
  timestamp: string;
  price: number;
  volume: number;
}

export interface WinRatePrediction {
  predictedOutcome: string;
  confidence: number;
  modelScore: number;
  factors: PredictionFactor[];
  historicalAccuracy: number;
}

export interface PredictionFactor {
  name: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface PortfolioPosition {
  marketId: string;
  outcomeId: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface Trade {
  id: string;
  marketId: string;
  outcomeId: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  timestamp: string;
  total: number;
}

export type Category = 'politics' | 'sports' | 'crypto' | 'entertainment' | 'science' | 'economics' | 'technology';

export type SortOption = 'volume' | 'newest' | 'ending-soon' | 'highest-probability' | 'win-rate';
