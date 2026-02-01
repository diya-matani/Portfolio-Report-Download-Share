import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const SummaryCard = ({ account }) => {
    const isPositive = account.dayChange >= 0;

    return (
        <div className="card summary-card">
            <div className="summary-header">
                <span className="label text-muted">Total Balance</span>
                <button className="btn btn-outline text-sm">Last 30 Days</button>
            </div>

            <div className="balance-row">
                <h2 className="text-2xl">${account.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                <div className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>${Math.abs(account.dayChange).toLocaleString()} ({account.dayChangePercent}%)</span>
                </div>
            </div>
            <span className="text-sm text-muted">As of {new Date(account.lastUpdated).toLocaleDateString()}</span>
        </div>
    );
};
