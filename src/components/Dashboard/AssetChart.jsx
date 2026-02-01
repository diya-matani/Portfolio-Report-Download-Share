import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6'];

export const AssetChart = ({ holdings }) => {
    // Group by type for the chart
    const data = holdings.reduce((acc, curr) => {
        const found = acc.find(item => item.name === curr.type);
        if (found) {
            found.value += curr.value;
        } else {
            acc.push({ name: curr.type, value: curr.value });
        }
        return acc;
    }, []);

    return (
        <div className="card chart-card">
            <h3 className="card-title text-lg">Asset Allocation</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `$${value.toLocaleString()}`}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
