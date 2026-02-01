import React from 'react';

export const HoldingsTable = ({ holdings }) => {
    return (
        <div className="card holdings-card">
            <div className="card-header flex justify-between items-center">
                <h3 className="card-title text-lg">Holdings</h3>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th className="text-right">Quantity</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Total Value</th>
                            <th className="text-right">Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="asset-name">
                                        <span className="symbol">{item.symbol}</span>
                                        <span className="name text-muted text-sm">{item.name}</span>
                                    </div>
                                </td>
                                <td><span className="badge">{item.type}</span></td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">${item.price.toLocaleString()}</td>
                                <td className="text-right font-medium">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td className="text-right">{item.allocation}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
