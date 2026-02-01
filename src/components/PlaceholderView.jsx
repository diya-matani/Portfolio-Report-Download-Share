import React from 'react';

export const PlaceholderView = ({ title, icon: Icon }) => (
    <div className="card" style={{ padding: '3rem', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#F1F5F9', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            {Icon ? <Icon size={48} color="#64748B" /> : null}
        </div>
        <h2 className="text-xl" style={{ marginBottom: '0.5rem' }}>{title}</h2>
        <p className="text-muted">This feature is currently under development.</p>
    </div>
);
