import { createSlice, createSelector } from '@reduxjs/toolkit';

const generateChartData = (basePrice, volatility, trend = 0) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 30; i++) {
    const trendFactor = trend * 0.01;
    const change = (Math.random() - 0.5 + trendFactor) * volatility * currentPrice;
    currentPrice = Math.max(0.01, currentPrice + change);
    data.push(currentPrice);
  }
  
  return data;
};

const generateMockData = () => [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: '/cryptoLogos/bitcoin.svg',
    price: 65432.21,
    percentChange1h: 0.5,
    percentChange24h: 2.3,
    percentChange7d: -1.2,
    marketCap: 1258000000000,
    volume24h: 28500000000,
    circulatingSupply: 19200000,
    maxSupply: 21000000,
    chartData: generateChartData(65432.21, 0.003, -1.2)
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '/cryptoLogos/eth.svg',
    price: 3421.76,
    percentChange1h: -0.2,
    percentChange24h: 1.5,
    percentChange7d: 3.8,
    marketCap: 412000000000,
    volume24h: 15600000000,
    circulatingSupply: 120500000,
    maxSupply: null,
    chartData: generateChartData(3421.76, 0.004, 3.8)
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: '/cryptoLogos/tether.svg',
    price: 1.00,
    percentChange1h: 0.01,
    percentChange24h: -0.02,
    percentChange7d: 0.03,
    marketCap: 95000000000,
    volume24h: 48200000000,
    circulatingSupply: 95000000000,
    maxSupply: null,
    chartData: generateChartData(1.00, 0.0001, 0.03)
  },
  {
    id: 'binancecoin',
    rank: 4,
    name: 'Binance Coin',
    symbol: 'BNB',
    logo: '/cryptoLogos/bnb.svg',
    price: 541.32,
    percentChange1h: 0.8,
    percentChange24h: -1.2,
    percentChange7d: 5.3,
    marketCap: 83000000000,
    volume24h: 2100000000,
    circulatingSupply: 153400000,
    maxSupply: 200000000,
    chartData: generateChartData(541.32, 0.005, 5.3)
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    logo: '/cryptoLogos/solana.svg',
    price: 142.87,
    percentChange1h: 1.2,
    percentChange24h: 4.7,
    percentChange7d: 9.8,
    marketCap: 63500000000,
    volume24h: 3800000000,
    circulatingSupply: 444500000,
    maxSupply: null,
    chartData: generateChartData(142.87, 0.006, 9.8)
  },
  {
    id: 'cardano',
    rank: 6,
    name: 'Cardano',
    symbol: 'ADA',
    logo: '/cryptoLogos/cardano.svg',
    price: 0.47,
    percentChange1h: -0.5,
    percentChange24h: 2.1,
    percentChange7d: -3.2,
    marketCap: 16700000000,
    volume24h: 580000000,
    circulatingSupply: 35800000000,
    maxSupply: 45000000000,
    chartData: generateChartData(0.47, 0.005, -3.2)
  },
  {
    id: 'xrp',
    rank: 7,
    name: 'XRP',
    symbol: 'XRP',
    logo: '/cryptoLogos/xrp.svg',
    price: 0.61,
    percentChange1h: 0.3,
    percentChange24h: -1.1,
    percentChange7d: 4.5,
    marketCap: 33400000000,
    volume24h: 1200000000,
    circulatingSupply: 54800000000,
    maxSupply: 100000000000,
    chartData: generateChartData(0.61, 0.005, 4.5)
  }
];

const initialState = {
  assets: generateMockData(),
  loading: false,
  error: null,
  selectedAsset: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, newPrice, percentChanges, volume } = action.payload;
      const asset = state.assets.find(asset => asset.id === id);
      if (asset) {
        asset.price = newPrice;
        asset.percentChange1h = percentChanges.hour;
        asset.percentChange24h = percentChanges.day;
        asset.percentChange7d = percentChanges.week;
        asset.volume24h = volume;
        
        asset.chartData.push(newPrice);
        asset.chartData.shift();
      }
    },
    updateAllPrices: (state, action) => {
      state.assets = action.payload;
    },
    selectAsset: (state, action) => {
      state.selectedAsset = action.payload;
    }
  },
});

export const selectAllAssets = state => state.crypto.assets;
export const selectAssetById = (state, assetId) => 
  state.crypto.assets.find(asset => asset.id === assetId);
export const selectSelectedAsset = state => 
  state.selectedAsset ? 
    state.crypto.assets.find(asset => asset.id === state.selectedAsset) : 
    null;

export const selectSortedAssets = createSelector(
  [selectAllAssets],
  (assets) => [...assets].sort((a, b) => b.marketCap - a.marketCap)
);

export const { updatePrice, updateAllPrices, selectAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;