import React from 'react';
import { Eye, EyeOff, Bell, Shield, Moon } from 'lucide-react';

export const SettingsView = ({ hideValues, setHideValues }) => {
    return (
        <div className="view-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
                <h2 className="text-xl mb-6">Settings</h2>

                <div className="setting-group" style={{ marginBottom: '2rem' }}>
                    <h3 className="text-lg text-muted mb-4" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferences</h3>

                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ background: '#F1F5F9', padding: '0.5rem', borderRadius: '8px' }}>
                                {hideValues ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            <div>
                                <div className="font-medium">Privacy Mode</div>
                                <div className="text-sm text-muted">Hide dollar values on dashboard</div>
                            </div>
                        </div>
                        <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                            <input
                                type="checkbox"
                                checked={hideValues}
                                onChange={(e) => setHideValues(e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span className="slider" style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: hideValues ? '#0EA5E9' : '#ccc', transition: '.4s', borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: "", height: '16px', width: '16px', left: '4px', bottom: '4px',
                                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                                    transform: hideValues ? 'translateX(24px)' : 'translateX(0)'
                                }}></span>
                            </span>
                        </label>
                    </div>

                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ background: '#F1F5F9', padding: '0.5rem', borderRadius: '8px' }}>
                                <Moon size={20} />
                            </div>
                            <div>
                                <div className="font-medium">Dark Mode</div>
                                <div className="text-sm text-muted">Switch to dark theme</div>
                            </div>
                        </div>
                        <button className="text-muted text-sm" disabled>Unavailable</button>
                    </div>
                </div>

                <div className="setting-group">
                    <h3 className="text-lg text-muted mb-4" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security</h3>
                    <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ background: '#F1F5F9', padding: '0.5rem', borderRadius: '8px' }}>
                                <Shield size={20} />
                            </div>
                            <div>
                                <div className="font-medium">Two-Factor Authentication</div>
                                <div className="text-sm text-muted">Secure your account</div>
                            </div>
                        </div>
                        <span className="badge" style={{ color: '#10B981', backgroundColor: '#ECFDF5' }}>Enabled</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
