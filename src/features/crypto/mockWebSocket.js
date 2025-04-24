
import { updatePrice } from './cryptoSlice';

export const generateMockData = () => [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: '/cryptoLogos/btc.svg',
    price: 65432.21,
    percentChange1h: 0.5,
    percentChange24h: 2.3,
    percentChange7d: -1.2,
    marketCap: 1258000000000,
    volume24h: 28500000000,
    circulatingSupply: 19200000,
    maxSupply: 21000000,
    chartData: [65000, 64500, 66000, 65700, 65200, 65800, 65432]
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
    chartData: [3400, 3380, 3450, 3420, 3390, 3410, 3422]
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: '/cryptoLogos/usdt.svg',
    price: 1.00,
    percentChange1h: 0.01,
    percentChange24h: -0.02,
    percentChange7d: 0.03,
    marketCap: 95000000000,
    volume24h: 48200000000,
    circulatingSupply: 95000000000,
    maxSupply: null,
    chartData: [1, 1, 1, 0.999, 1.001, 1, 1]
  },
  {
    id: 'binancecoin',
    rank: 4,
    name: 'Binance Coin',
    symbol: 'BNB',
    logo: '/cryptoLogos/bnb.png',
    price: 541.32,
    percentChange1h: 0.8,
    percentChange24h: -1.2,
    percentChange7d: 5.3,
    marketCap: 83000000000,
    volume24h: 2100000000,
    circulatingSupply: 153400000,
    maxSupply: 200000000,
    chartData: [530, 535, 542, 538, 545, 540, 541]
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    logo: '/cryptoLogos/solana.png',
    price: 142.87,
    percentChange1h: 1.2,
    percentChange24h: 4.7,
    percentChange7d: 9.8,
    marketCap: 63500000000,
    volume24h: 3800000000,
    circulatingSupply: 444500000,
    maxSupply: null,
    chartData: [135, 138, 140, 139, 141, 143, 143]
  }
];

export class MockCryptoWebSocket {
  constructor(store) {
    this.store = store;
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      // Pick a random asset to update
      const assets = this.store.getState().crypto.assets;
      const randomAssetIndex = Math.floor(Math.random() * assets.length);
      const asset = assets[randomAssetIndex];
      
      // Generate random price updates
      const priceChange = asset.price * (Math.random() * 0.02 - 0.01); // -1% to +1%
      const newPrice = Math.max(0.01, asset.price + priceChange);
      
      // Update percent changes
      const hourChange = asset.percentChange1h + (Math.random() * 0.4 - 0.2);
      const dayChange = asset.percentChange24h + (Math.random() * 0.6 - 0.3);
      const weekChange = asset.percentChange7d + (Math.random() * 0.8 - 0.4);
      
      // Update volume
      const volumeChange = asset.volume24h * (Math.random() * 0.04 - 0.02); // -2% to +2%
      const newVolume = Math.max(100000, asset.volume24h + volumeChange);
      
      // Dispatch update to Redux
      this.store.dispatch(updatePrice({
        id: asset.id,
        newPrice: parseFloat(newPrice.toFixed(2)),
        percentChanges: {
          hour: parseFloat(hourChange.toFixed(2)),
          day: parseFloat(dayChange.toFixed(2)),
          week: parseFloat(weekChange.toFixed(2))
        },
        volume: Math.round(newVolume)
      }));
    }, 1500); 
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}