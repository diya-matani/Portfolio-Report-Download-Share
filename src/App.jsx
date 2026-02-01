import React, { useState } from 'react';
import { Sidebar, Header } from './components/Layout/Layout';
import { SummaryCard } from './components/Dashboard/SummaryCard';
import { AssetChart } from './components/Dashboard/AssetChart';
import { HoldingsTable } from './components/Dashboard/HoldingsTable';
import { PortfolioView } from './components/PortfolioView';
import { ActivityView } from './components/ActivityView';
import { SettingsView } from './components/SettingsView';
import { accountData, holdingsData } from './data/mockData';
import { Download, FileText } from 'lucide-react';
import { generatePdfReport } from './components/Export/PdfGenerator';
import './components/Layout/Layout.css';
import './components/Dashboard/Dashboard.css';

function App() {
  const [user] = useState(accountData);
  const [holdings] = useState(holdingsData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hideValues, setHideValues] = useState(false);

  const handlePdfExport = () => {
    generatePdfReport(user, holdings);
  };

  const handleCsvExport = () => {
    const headers = ["Asset,Type,Quantity,Price,Value,Allocation"];
    const rows = holdings.map(item =>
      `"${item.name}","${item.type}",${item.quantity},${item.price},${item.value},${item.allocation}%`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Aurum_Holdings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to mask values if privacy mode is on
  const maskedUser = hideValues ? {
    ...user,
    totalBalance: '****.**',
    dayChange: '***.**',
    dayChangePercent: '**'
  } : user;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-grid">
            <div className="grid-row top-section">
              <div className="col-8">
                <SummaryCard account={maskedUser} />
              </div>
              <div className="col-4 flex-align-bottom">
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button
                    className="btn btn-primary"
                    onClick={handlePdfExport}
                    style={{ flex: 1 }}
                  >
                    <FileText size={18} />
                    PDF Report
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={handleCsvExport}
                    style={{ flex: 1 }}
                  >
                    <Download size={18} />
                    CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="grid-row chart-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="card">
                <h3 className="card-title text-lg">Portfolio Growth</h3>
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', borderRadius: '8px', marginTop: '1rem' }}>
                  <span className="text-muted">Interactive Graph Placeholder</span>
                </div>
              </div>

              <AssetChart holdings={holdings} />
            </div>

            <div className="grid-row">
              {/* Note: In a real app, we'd also mask the table values, but for simplicity we only mask the header card */}
              <HoldingsTable holdings={holdings} />
            </div>
          </div>
        );
      case 'portfolio':
        return <PortfolioView holdings={holdings} />;
      case 'activity':
        return <ActivityView />;
      case 'settings':
        return <SettingsView hideValues={hideValues} setHideValues={setHideValues} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <Header user={user} />
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
