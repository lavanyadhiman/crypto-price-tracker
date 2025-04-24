import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MockCryptoWebSocket } from './features/crypto/mockWebSocket';
import { store } from './app/store';
import CryptoTable from './components/CryptoTable';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const webSocket = new MockCryptoWebSocket(store);
    webSocket.connect();
    
    return () => {
      webSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="app">
      <header>
        <h1>Crypto Price Tracker</h1>
        <p>Real-time cryptocurrency price updates</p>
      </header>
      <main>
        <CryptoTable />
      </main>
      
    </div>
  );
}

export default App;
