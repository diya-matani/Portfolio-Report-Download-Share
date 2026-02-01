import React from 'react';
import { LayoutDashboard, PieChart, ArrowLeftRight, Settings, LogOut, Download } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
        { id: 'activity', icon: ArrowLeftRight, label: 'Activity' },
    ];

    return (
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-icon">A</div>
                <span className="logo-text">Aurum Wealth</span>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="nav-footer">
                <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => onTabChange('settings')}>
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
                <button className="nav-item text-danger" onClick={() => alert("Logged out!")}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export const Header = ({ user }) => {
    return (
        <header className="header">
            <h1 className="page-title">Dashboard</h1>
            <div className="user-profile">
                <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-id">ID: {user.id}</span>
                </div>
                <div className="avatar">{user.name.charAt(0)}</div>
            </div>
        </header>
    );
};
