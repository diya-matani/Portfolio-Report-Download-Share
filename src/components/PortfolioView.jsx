import React from 'react';
import { AssetChart } from './Dashboard/AssetChart';

export const PortfolioView = ({ holdings }) => {
    // Group holdings by type for the breakdown
    const byType = holdings.reduce((acc, curr) => {
        if (!acc[curr.type]) acc[curr.type] = [];
        acc[curr.type].push(curr);
        return acc;
    }, {});

    return (
        <div className="view-container">
            <div className="card mb-4">
                <h2 className="text-xl mb-4">Portfolio Analysis</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div>
                        <AssetChart holdings={holdings} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p className="text-muted mb-4">
                            Your portfolio is diversified across {Object.keys(byType).length} asset classes.
                            The largest allocation is in <strong>ETF</strong> strategies.
                        </p>
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {Object.entries(byType).map(([type, items]) => {
                                const totalValue = items.reduce((sum, i) => sum + i.value, 0);
                                return (
                                    <div key={type} className="stat-box" style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                                        <span className="text-sm text-muted display-block">{type}</span>
                                        <span className="text-lg font-bold">${totalValue.toLocaleString()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
