export const accountData = {
  name: "Alex Morgan",
  id: "8832-1100",
  totalBalance: 124500.80,
  dayChange: 3850.12,
  dayChangePercent: 3.2,
  lastUpdated: new Date().toISOString()
};

export const holdingsData = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", type: "Stock", quantity: 50, price: 175.50, value: 8775.00, allocation: 25 },
  { id: 2, symbol: "VOO", name: "Vanguard S&P 500", type: "ETF", quantity: 45, price: 410.20, value: 18459.00, allocation: 40 },
  { id: 3, symbol: "BTC", name: "Bitcoin", type: "Crypto", quantity: 0.25, price: 42000.00, value: 10500.00, allocation: 15 },
  { id: 4, symbol: "BND", name: "Vanguard Total Bond", type: "Bond", quantity: 120, price: 72.80, value: 8736.00, allocation: 15 },
  { id: 5, symbol: "USD", name: "US Dollar Cache", type: "Cash", quantity: 5000, price: 1.00, value: 5000.00, allocation: 5 }
];

export const chartData = [
  { date: 'Jan', value: 105000 },
  { date: 'Feb', value: 108000 },
  { date: 'Mar', value: 106500 },
  { date: 'Apr', value: 112000 },
  { date: 'May', value: 118000 },
  { date: 'Jun', value: 124500 },
];
