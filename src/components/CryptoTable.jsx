import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSortedAssets } from '../features/crypto/cryptoSlice';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import DetailedAssetView from './DetailedAssetView';

const CryptoTable = () => {
  const assets = useSelector(selectSortedAssets);
  const [sortConfig, setSortConfig] = useState({
    key: 'rank',
    direction: 'ascending'
  });
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        return {
          key,
          direction: prevSortConfig.direction === 'ascending' ? 'descending' : 'ascending'
        };
      }
      return { key, direction: 'ascending' };
    });
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const handleRowClick = (assetId) => {
    setSelectedAssetId(assetId);
  };

  const handleCloseDetailView = () => {
    setSelectedAssetId(null);
  };

  return (
    <div className="crypto-tracker-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="crypto-table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')}>#</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('price')}>Price</th>
              <th onClick={() => handleSort('percentChange1h')}>1h %</th>
              <th onClick={() => handleSort('percentChange24h')}>24h %</th>
              <th onClick={() => handleSort('percentChange7d')}>7d %</th>
              <th onClick={() => handleSort('marketCap')}>Market Cap</th>
              <th onClick={() => handleSort('volume24h')}>Volume (24h)</th>
              <th onClick={() => handleSort('circulatingSupply')}>Circulating Supply</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset) => (
              <tr key={asset.id} onClick={() => handleRowClick(asset.id)} className="table-row">
                <td>{asset.rank}</td>
                <td className="asset-name">
                  <img 
                    src={asset.logo} 
                    alt={`${asset.name} logo`} 
                    className="asset-logo" 
                  />
                  <div>
                    <span className="asset-full-name">{asset.name}</span>
                    <span className="asset-symbol">{asset.symbol}</span>
                  </div>
                </td>
                <td className="price-cell">
                  <span className="price">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </td>
                <td><PriceChange value={asset.percentChange1h} /></td>
                <td><PriceChange value={asset.percentChange24h} /></td>
                <td><PriceChange value={asset.percentChange7d} /></td>
                <td>{formatNumber(asset.marketCap)}</td>
                <td>{formatNumber(asset.volume24h)}</td>
                <td>
                  {asset.circulatingSupply.toLocaleString()} {asset.symbol}
                  {asset.maxSupply && (
                    <div className="supply-bar">
                      <div 
                        className="supply-fill" 
                        style={{ width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` }}
                      />
                    </div>
                  )}
                </td>
                <td className="chart-cell">
                  <MiniChart data={asset.chartData} symbol={asset.symbol} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedAssetId && (
        <div className="modal-overlay">
          <DetailedAssetView 
            assetId={selectedAssetId} 
            onClose={handleCloseDetailView} 
          />
        </div>
      )}
    </div>
  );
};

export default CryptoTable;