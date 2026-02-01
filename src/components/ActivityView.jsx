import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const TRANSACTIONS = [
    { id: 1, date: '2026-02-01', type: 'Buy', asset: 'AAPL', amount: 1500.00, status: 'Completed' },
    { id: 2, date: '2026-01-28', type: 'Deposit', asset: 'USD', amount: 5000.00, status: 'Completed' },
    { id: 3, date: '2026-01-15', type: 'Dividend', asset: 'VOO', amount: 250.00, status: 'Completed' },
    { id: 4, date: '2026-01-10', type: 'Sell', asset: 'TSLA', amount: 3200.00, status: 'Completed' },
    { id: 5, date: '2026-01-05', type: 'Buy', asset: 'BTC', amount: 1000.00, status: 'Completed' },
];

export const ActivityView = () => {
    return (
        <div className="view-container">
            <div className="card">
                <h2 className="text-xl mb-4">Recent Activity</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Asset</th>
                            <th className="text-right">Amount</th>
                            <th className="text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TRANSACTIONS.map(tx => (
                            <tr key={tx.id}>
                                <td className="text-muted">{tx.date}</td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {tx.type === 'Buy' || tx.type === 'Deposit' || tx.type === 'Dividend' ?
                                            <ArrowDownRight size={16} className="text-success" /> :
                                            <ArrowUpRight size={16} />}
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="font-medium">{tx.asset}</td>
                                <td className="text-right font-medium">
                                    {tx.type === 'Sell' || tx.type === 'Dividend' || tx.type === 'Deposit' ? '+' : '-'}
                                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="text-right">
                                    <span className="badge" style={{ color: '#10B981', backgroundColor: '#ECFDF5' }}>{tx.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
