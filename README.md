#  Real-Time Crypto Price Tracker

A real-time cryptocurrency price tracker built with **React**, **Redux Toolkit**, and **Recharts**, featuring a mock WebSocket for simulating live price updates.

[Click here for Demo Video]('https://www.loom.com/share/1d1cb5a0bb454459ac2026c1bd97981e')  

---


---

##  Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/lavanyadhiman/crypto-price-tracker.git
cd crypto-price-tracker
```
### 2. Install dependencies
```bash
npm i
```
### 3. Start the development server
```bash
npm run dev
```



---

##  Features

- Real-time crypto price updates via mock WebSocket
- Global state management using Redux Toolkit
- Sortable, responsive table with live 7-day price charts
- Color-coded price change indicators
- Scalable, modular architecture

---

##  Tech Stack

| Category      | Tools Used                                |
|---------------|--------------------------------------------|
| Frontend      | React, JavaScript (ES6+), JSX              |
| State Mgmt    | Redux Toolkit, React-Redux                 |
| Charts        | Recharts                                  |
| Build Tool    | Vite                                       |
| Styling       | CSS3                                       |
| Dev Tools     | Redux DevTools, ESLint, Prettier           |

---

## 🏗️ Architecture
```text
src/
├── app/                    # Store configuration (Redux setup)
├── components/             # Reusable UI components
│   ├── CryptoTable.jsx     # Main table for displaying crypto data
│   ├── PriceChange.jsx     # Shows price change with color indicators
│   └── MiniChart.jsx       # Tiny line chart for 7-day price trend
│   └── DetailedAssetView.jsx       # Detailed view of respective assets
├── features/
│   └── crypto/             # Domain logic for crypto prices
│       ├── cryptoSlice.js      # Redux slice (actions & reducers)
│       └── mockWebSocket.js    # Simulates real-time updates
├── assets/                 # Static assets (e.g., crypto logos)
├── App.jsx                 # Root app component
└── main.jsx                # Entry point (ReactDOM render)

```
---



