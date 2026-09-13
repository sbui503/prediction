import { Market } from './types';

function generatePriceHistory(basePrice: number, days: number): { timestamp: string; price: number; volume: number }[] {
  const history = [];
  let price = basePrice + (Math.random() - 0.5) * 0.2;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    price = Math.max(0.05, Math.min(0.95, price + (Math.random() - 0.5) * 0.08));
    history.push({
      timestamp: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 50000) + 10000
    });
  }
  return history;
}

export const markets: Market[] = [
  {
    id: '1',
    title: 'Will the Federal Reserve cut rates in July 2026?',
    description: 'This market resolves to Yes if the Federal Reserve announces a rate cut at the July 2026 FOMC meeting.',
    category: 'economics',
    outcomes: [
      { id: '1a', name: 'Yes', probability: 0.72, shares: 145000, price: 0.72, color: '#10b981' },
      { id: '1b', name: 'No', probability: 0.28, shares: 56000, price: 0.28, color: '#ef4444' }
    ],
    volume: 2450000,
    liquidity: 890000,
    endDate: '2026-07-28',
    createdAt: '2026-04-15',
    priceHistory: generatePriceHistory(0.72, 30),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.84,
      modelScore: 8.2,
      factors: [
        { name: 'Inflation Trend', weight: 0.3, impact: 'positive', description: 'CPI trending below target for 3 months' },
        { name: 'Employment Data', weight: 0.25, impact: 'positive', description: 'Unemployment rising to 4.3%' },
        { name: 'Fed Rhetoric', weight: 0.25, impact: 'positive', description: 'Multiple governors hinting at cuts' },
        { name: 'Global Central Banks', weight: 0.2, impact: 'positive', description: 'ECB and BOE already cutting' }
      ],
      historicalAccuracy: 0.78
    },
    tags: ['Fed', 'Interest Rates', 'Monetary Policy'],
    isHot: true,
    isNew: false
  },
  {
    id: '2',
    title: 'Will Bitcoin exceed $150,000 by end of 2026?',
    description: 'Resolves Yes if Bitcoin (BTC/USD) trades above $150,000 on any major exchange before December 31, 2026.',
    category: 'crypto',
    outcomes: [
      { id: '2a', name: 'Yes', probability: 0.45, shares: 230000, price: 0.45, color: '#f59e0b' },
      { id: '2b', name: 'No', probability: 0.55, shares: 280000, price: 0.55, color: '#6366f1' }
    ],
    volume: 5800000,
    liquidity: 1200000,
    endDate: '2026-12-31',
    createdAt: '2026-01-01',
    priceHistory: generatePriceHistory(0.45, 60),
    winRatePrediction: {
      predictedOutcome: 'No',
      confidence: 0.62,
      modelScore: 6.5,
      factors: [
        { name: 'Halving Cycle', weight: 0.3, impact: 'positive', description: 'Post-halving momentum typically peaks 12-18 months after' },
        { name: 'ETF Inflows', weight: 0.25, impact: 'positive', description: 'Spot BTC ETFs seeing record inflows' },
        { name: 'Regulatory Risk', weight: 0.2, impact: 'negative', description: 'Potential crypto regulation in Congress' },
        { name: 'Macro Environment', weight: 0.25, impact: 'neutral', description: 'Mixed signals from rate policy' }
      ],
      historicalAccuracy: 0.71
    },
    tags: ['Bitcoin', 'Crypto', 'Price Target'],
    isHot: true,
    isNew: false
  },
  {
    id: '3',
    title: 'Will Democrats win the House in 2026 midterms?',
    description: 'Resolves Yes if Democrats gain majority control of the US House of Representatives in the November 2026 midterm elections.',
    category: 'politics',
    outcomes: [
      { id: '3a', name: 'Yes', probability: 0.63, shares: 340000, price: 0.63, color: '#3b82f6' },
      { id: '3b', name: 'No', probability: 0.37, shares: 198000, price: 0.37, color: '#ef4444' }
    ],
    volume: 8200000,
    liquidity: 2100000,
    endDate: '2026-11-03',
    createdAt: '2025-11-04',
    priceHistory: generatePriceHistory(0.63, 90),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.76,
      modelScore: 7.8,
      factors: [
        { name: 'Historical Pattern', weight: 0.3, impact: 'positive', description: 'Presidents party typically loses seats in midterms' },
        { name: 'Generic Ballot', weight: 0.25, impact: 'positive', description: 'Dems leading generic ballot by 4 points' },
        { name: 'Approval Rating', weight: 0.25, impact: 'positive', description: 'Presidential approval below 42%' },
        { name: 'Economic Sentiment', weight: 0.2, impact: 'neutral', description: 'Mixed consumer confidence signals' }
      ],
      historicalAccuracy: 0.82
    },
    tags: ['Elections', 'Congress', '2026 Midterms'],
    isHot: true,
    isNew: false
  },
  {
    id: '4',
    title: 'Will SpaceX Starship complete orbital flight by August 2026?',
    description: 'Resolves Yes if SpaceX Starship successfully completes a full orbital flight and returns to Earth by August 31, 2026.',
    category: 'science',
    outcomes: [
      { id: '4a', name: 'Yes', probability: 0.81, shares: 89000, price: 0.81, color: '#8b5cf6' },
      { id: '4b', name: 'No', probability: 0.19, shares: 21000, price: 0.19, color: '#ec4899' }
    ],
    volume: 1800000,
    liquidity: 450000,
    endDate: '2026-08-31',
    createdAt: '2026-03-01',
    priceHistory: generatePriceHistory(0.81, 45),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.91,
      modelScore: 9.1,
      factors: [
        { name: 'Test Progress', weight: 0.35, impact: 'positive', description: 'Last 3 test flights showed major improvements' },
        { name: 'FAA Approval', weight: 0.2, impact: 'positive', description: 'License renewal expected soon' },
        { name: 'Technical Readiness', weight: 0.25, impact: 'positive', description: 'Heat shield and booster catch working' },
        { name: 'Schedule History', weight: 0.2, impact: 'positive', description: 'SpaceX accelerating launch cadence' }
      ],
      historicalAccuracy: 0.85
    },
    tags: ['SpaceX', 'Space', 'Technology'],
    isHot: false,
    isNew: true
  },
  {
    id: '5',
    title: 'Will AI pass the Turing Test by 2027?',
    description: 'Resolves Yes if an AI system is widely recognized by the scientific community as having passed a rigorous Turing Test by end of 2027.',
    category: 'technology',
    outcomes: [
      { id: '5a', name: 'Yes', probability: 0.38, shares: 156000, price: 0.38, color: '#06b6d4' },
      { id: '5b', name: 'No', probability: 0.62, shares: 253000, price: 0.62, color: '#f97316' }
    ],
    volume: 3200000,
    liquidity: 780000,
    endDate: '2027-12-31',
    createdAt: '2026-01-15',
    priceHistory: generatePriceHistory(0.38, 75),
    winRatePrediction: {
      predictedOutcome: 'No',
      confidence: 0.68,
      modelScore: 5.9,
      factors: [
        { name: 'Current AI Capability', weight: 0.3, impact: 'positive', description: 'LLMs approaching but not passing rigorous tests' },
        { name: 'Research Pace', weight: 0.25, impact: 'positive', description: 'Rapid progress in reasoning and planning' },
        { name: 'Definition Rigor', weight: 0.25, impact: 'negative', description: 'Scientific community has high bar for recognition' },
        { name: 'Timeline', weight: 0.2, impact: 'neutral', description: '18 months is tight for paradigm shift' }
      ],
      historicalAccuracy: 0.65
    },
    tags: ['AI', 'Turing Test', 'Technology'],
    isHot: true,
    isNew: false
  },
  {
    id: '6',
    title: 'Will Taylor Swift announce a new album before September 2026?',
    description: 'Resolves Yes if Taylor Swift officially announces or releases a new studio album before September 1, 2026.',
    category: 'entertainment',
    outcomes: [
      { id: '6a', name: 'Yes', probability: 0.56, shares: 178000, price: 0.56, color: '#ec4899' },
      { id: '6b', name: 'No', probability: 0.44, shares: 140000, price: 0.44, color: '#64748b' }
    ],
    volume: 1500000,
    liquidity: 320000,
    endDate: '2026-09-01',
    createdAt: '2026-02-14',
    priceHistory: generatePriceHistory(0.56, 50),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.72,
      modelScore: 7.2,
      factors: [
        { name: 'Release Pattern', weight: 0.3, impact: 'positive', description: 'Historically releases album every 1-2 years' },
        { name: 'Social Media Signals', weight: 0.25, impact: 'positive', description: 'Vault posts and studio hints increasing' },
        { name: 'Tour Schedule', weight: 0.25, impact: 'neutral', description: 'Tour wrapping up, time for studio work' },
        { name: 'Industry Sources', weight: 0.2, impact: 'positive', description: 'Producers hinting at new material' }
      ],
      historicalAccuracy: 0.74
    },
    tags: ['Music', 'Taylor Swift', 'Entertainment'],
    isHot: false,
    isNew: true
  },
  {
    id: '7',
    title: 'Will US GDP growth exceed 3% in Q2 2026?',
    description: 'Resolves Yes if the Bureau of Economic Analysis reports Q2 2026 GDP growth (annualized) above 3.0%.',
    category: 'economics',
    outcomes: [
      { id: '7a', name: 'Yes', probability: 0.34, shares: 95000, price: 0.34, color: '#22c55e' },
      { id: '7b', name: 'No', probability: 0.66, shares: 184000, price: 0.66, color: '#dc2626' }
    ],
    volume: 2100000,
    liquidity: 560000,
    endDate: '2026-07-30',
    createdAt: '2026-04-01',
    priceHistory: generatePriceHistory(0.34, 30),
    winRatePrediction: {
      predictedOutcome: 'No',
      confidence: 0.79,
      modelScore: 7.5,
      factors: [
        { name: 'Q1 Momentum', weight: 0.3, impact: 'negative', description: 'Q1 growth came in at 1.8%' },
        { name: 'Consumer Spending', weight: 0.25, impact: 'negative', description: 'Retail sales showing softness' },
        { name: 'Trade Balance', weight: 0.2, impact: 'negative', description: 'Widening trade deficit weighing on GDP' },
        { name: 'Government Spending', weight: 0.25, impact: 'neutral', description: 'Federal spending expected to remain stable' }
      ],
      historicalAccuracy: 0.80
    },
    tags: ['GDP', 'Economy', 'Growth'],
    isHot: false,
    isNew: false
  },
  {
    id: '8',
    title: 'Will Ethereum flip Bitcoin in market cap by 2027?',
    description: 'Resolves Yes if Ethereum total market capitalization exceeds Bitcoin total market cap at any point before December 31, 2027.',
    category: 'crypto',
    outcomes: [
      { id: '8a', name: 'Yes', probability: 0.12, shares: 45000, price: 0.12, color: '#8b5cf6' },
      { id: '8b', name: 'No', probability: 0.88, shares: 327000, price: 0.88, color: '#f59e0b' }
    ],
    volume: 4500000,
    liquidity: 980000,
    endDate: '2027-12-31',
    createdAt: '2025-12-01',
    priceHistory: generatePriceHistory(0.12, 90),
    winRatePrediction: {
      predictedOutcome: 'No',
      confidence: 0.93,
      modelScore: 9.3,
      factors: [
        { name: 'Market Cap Gap', weight: 0.35, impact: 'negative', description: 'BTC market cap is 3.5x larger than ETH' },
        { name: 'Institutional Flows', weight: 0.25, impact: 'negative', description: 'BTC ETFs dominate crypto institutional investment' },
        { name: 'ETH Upgrades', weight: 0.2, impact: 'positive', description: 'Layer 2 growth and deflationary mechanics' },
        { name: 'Network Effects', weight: 0.2, impact: 'negative', description: 'Bitcoin brand recognition remains dominant' }
      ],
      historicalAccuracy: 0.88
    },
    tags: ['Ethereum', 'Bitcoin', 'Crypto Wars'],
    isHot: true,
    isNew: false
  },
  {
    id: '9',
    title: 'Will a major US bank fail in 2026?',
    description: 'Resolves Yes if any US bank with over $50B in assets fails or is placed into FDIC receivership in 2026.',
    category: 'economics',
    outcomes: [
      { id: '9a', name: 'Yes', probability: 0.08, shares: 32000, price: 0.08, color: '#dc2626' },
      { id: '9b', name: 'No', probability: 0.92, shares: 368000, price: 0.92, color: '#16a34a' }
    ],
    volume: 1900000,
    liquidity: 420000,
    endDate: '2026-12-31',
    createdAt: '2026-01-01',
    priceHistory: generatePriceHistory(0.08, 90),
    winRatePrediction: {
      predictedOutcome: 'No',
      confidence: 0.95,
      modelScore: 9.5,
      factors: [
        { name: 'Capital Ratios', weight: 0.3, impact: 'positive', description: 'Major banks well above minimum capital requirements' },
        { name: 'Stress Tests', weight: 0.25, impact: 'positive', description: 'All major banks passed 2026 stress tests' },
        { name: 'Deposit Stability', weight: 0.25, impact: 'positive', description: 'Deposit outflows stabilized after 2023 events' },
        { name: 'Regulatory Oversight', weight: 0.2, impact: 'positive', description: 'Enhanced monitoring post-2023 reforms' }
      ],
      historicalAccuracy: 0.91
    },
    tags: ['Banking', 'Financial Crisis', 'Regulation'],
    isHot: false,
    isNew: false
  },
  {
    id: '10',
    title: 'Will the Champions League final feature an English team in 2026?',
    description: 'Resolves Yes if at least one English Premier League team plays in the 2026 UEFA Champions League final.',
    category: 'sports',
    outcomes: [
      { id: '10a', name: 'Yes', probability: 0.58, shares: 145000, price: 0.58, color: '#3b82f6' },
      { id: '10b', name: 'No', probability: 0.42, shares: 105000, price: 0.42, color: '#f97316' }
    ],
    volume: 980000,
    liquidity: 210000,
    endDate: '2026-05-30',
    createdAt: '2026-02-01',
    priceHistory: generatePriceHistory(0.58, 40),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.71,
      modelScore: 7.0,
      factors: [
        { name: 'EPL Strength', weight: 0.3, impact: 'positive', description: '3 English teams in quarterfinals' },
        { name: 'Historical Performance', weight: 0.25, impact: 'positive', description: 'English teams in 60% of finals last decade' },
        { name: 'Draw Difficulty', weight: 0.25, impact: 'neutral', description: 'Tough matchups against Real Madrid and Bayern' },
        { name: 'Squad Depth', weight: 0.2, impact: 'positive', description: 'English clubs have deepest squads' }
      ],
      historicalAccuracy: 0.73
    },
    tags: ['Football', 'Champions League', 'Soccer'],
    isHot: false,
    isNew: false
  },
  {
    id: '11',
    title: 'Will OpenAI release GPT-5 before Q3 2026?',
    description: 'Resolves Yes if OpenAI officially launches GPT-5 (or equivalent next-gen model) to the public before July 1, 2026.',
    category: 'technology',
    outcomes: [
      { id: '11a', name: 'Yes', probability: 0.67, shares: 198000, price: 0.67, color: '#06b6d4' },
      { id: '11b', name: 'No', probability: 0.33, shares: 97000, price: 0.33, color: '#a855f7' }
    ],
    volume: 3800000,
    liquidity: 890000,
    endDate: '2026-07-01',
    createdAt: '2026-01-20',
    priceHistory: generatePriceHistory(0.67, 60),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.79,
      modelScore: 8.0,
      factors: [
        { name: 'Development Signals', weight: 0.3, impact: 'positive', description: 'Multiple employees hinting at imminent release' },
        { name: 'Competition Pressure', weight: 0.25, impact: 'positive', description: 'Google and Anthropic pushing boundaries' },
        { name: 'Infrastructure', weight: 0.25, impact: 'positive', description: 'New data centers coming online' },
        { name: 'Safety Reviews', weight: 0.2, impact: 'neutral', description: 'Safety evaluations may add delay' }
      ],
      historicalAccuracy: 0.76
    },
    tags: ['OpenAI', 'GPT-5', 'AI'],
    isHot: true,
    isNew: false
  },
  {
    id: '12',
    title: 'Will global temperatures set a new record in 2026?',
    description: 'Resolves Yes if 2026 becomes the hottest year on record according to NASA GISS global temperature data.',
    category: 'science',
    outcomes: [
      { id: '12a', name: 'Yes', probability: 0.74, shares: 112000, price: 0.74, color: '#ef4444' },
      { id: '12b', name: 'No', probability: 0.26, shares: 39000, price: 0.26, color: '#3b82f6' }
    ],
    volume: 1200000,
    liquidity: 280000,
    endDate: '2027-01-15',
    createdAt: '2026-01-01',
    priceHistory: generatePriceHistory(0.74, 90),
    winRatePrediction: {
      predictedOutcome: 'Yes',
      confidence: 0.82,
      modelScore: 8.4,
      factors: [
        { name: 'Warming Trend', weight: 0.3, impact: 'positive', description: 'Consecutive record years since 2023' },
        { name: 'El Niño Effect', weight: 0.25, impact: 'positive', description: 'Developing El Niño expected mid-year' },
        { name: 'CO2 Levels', weight: 0.25, impact: 'positive', description: 'Atmospheric CO2 at new highs' },
        { name: 'Volcanic Activity', weight: 0.2, impact: 'neutral', description: 'No major volcanic cooling events expected' }
      ],
      historicalAccuracy: 0.86
    },
    tags: ['Climate', 'Temperature', 'Environment'],
    isHot: false,
    isNew: false
  }
];

export const categories = [
  { id: 'all', name: 'All Markets', icon: '🌐', count: 12 },
  { id: 'politics', name: 'Politics', icon: '🏛️', count: 1 },
  { id: 'economics', name: 'Economics', icon: '📊', count: 3 },
  { id: 'crypto', name: 'Crypto', icon: '₿', count: 2 },
  { id: 'technology', name: 'Technology', icon: '🤖', count: 2 },
  { id: 'science', name: 'Science', icon: '🔬', count: 2 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 1 },
  { id: 'entertainment', name: 'Entertainment', icon: '🎵', count: 1 }
];
