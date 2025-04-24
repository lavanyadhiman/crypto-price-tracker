import { useSelector, useDispatch } from 'react-redux';
import { selectAssetById } from '../features/crypto/cryptoSlice';
import MiniChart from './MiniChart';
import { motion } from 'framer-motion';

const DetailedAssetView = ({ assetId, onClose }) => {
  const asset = useSelector(state => selectAssetById(state, assetId));
  
  if (!asset) return null;
  
  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };
  
  // Format percentage
  const formatPercentage = (value) => {
    const isPositive = value >= 0;
    return (
      <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </span>
    );
  };
  
  return (
    <motion.div 
      className="detailed-asset-modal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="modal-header">
        <div className="asset-info">
          <img src={asset.logo} alt={asset.name} className="asset-logo-large" />
          <div>
            <h2>{asset.name} ({asset.symbol})</h2>
            <span className="rank">Rank #{asset.rank}</span>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="price-section">
        <div className="current-price">
          <h3>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          {formatPercentage(asset.percentChange24h)} <span className="period">(24h)</span>
        </div>
      </div>
      
      <div className="chart-section">
        <MiniChart data={asset.chartData} symbol={asset.symbol} expanded={true} />
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">{formatNumber(asset.marketCap)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">24h Volume</div>
          <div className="stat-value">{formatNumber(asset.volume24h)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Circulating Supply</div>
          <div className="stat-value">
            {asset.circulatingSupply.toLocaleString()} {asset.symbol}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Max Supply</div>
          <div className="stat-value">
            {asset.maxSupply ? asset.maxSupply.toLocaleString() + ' ' + asset.symbol : '∞'}
          </div>
        </div>
      </div>
      
      <div className="percent-changes">
        <div className="change-item">
          <div className="change-label">1h %</div>
          <div className="change-value">{formatPercentage(asset.percentChange1h)}</div>
        </div>
        <div className="change-item">
          <div className="change-label">24h %</div>
          <div className="change-value">{formatPercentage(asset.percentChange24h)}</div>
        </div>
        <div className="change-item">
          <div className="change-label">7d %</div>
          <div className="change-value">{formatPercentage(asset.percentChange7d)}</div>
        </div>
      </div>
      
      {asset.maxSupply && (
        <div className="supply-progress">
          <div className="supply-bar-full">
            <div 
              className="supply-fill-full" 
              style={{ width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` }}
            />
          </div>
          <div className="supply-labels">
            <span>Circulating Supply</span>
            <span>Max Supply</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DetailedAssetView;