import React, { useState } from 'react';
import { Sidebar, Header } from './components/Layout/Layout';
import { SummaryCard } from './components/Dashboard/SummaryCard';
import { AssetChart } from './components/Dashboard/AssetChart';
import { HoldingsTable } from './components/Dashboard/HoldingsTable';
import { accountData, holdingsData } from './data/mockData';
import { Download } from 'lucide-react';
import './components/Layout/Layout.css';
import './components/Dashboard/Dashboard.css';

function App() {
  const [user] = useState(accountData);
  const [holdings] = useState(holdingsData);

  const handleExport = () => {
    // TODO: Implement PDF Export
    alert("Export feature coming next!");
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header user={user} />

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <div className="grid-row top-section">
            <div className="col-8">
              <SummaryCard account={user} />
            </div>
            <div className="col-4 flex-align-bottom">
              {/* Export Button Placement */}
              <button
                className="btn btn-primary"
                onClick={handleExport}
                style={{ marginBottom: '1.5rem', width: '100%' }}
              >
                <Download size={18} />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid-row chart-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Placeholder for Line Chart (skipping for simplicity to focus on Pie) */}
            <div className="card">
              <h3 className="card-title text-lg">Portfolio Growth</h3>
              <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', borderRadius: '8px', marginTop: '1rem' }}>
                <span className="text-muted">Interactive Graph Placeholder</span>
              </div>
            </div>

            <AssetChart holdings={holdings} />
          </div>

          <div className="grid-row">
            <HoldingsTable holdings={holdings} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
