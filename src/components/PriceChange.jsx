const PriceChange = ({ value }) => {
  const isPositive = value >= 0;
  
  return (
    <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
};

export default PriceChange;

