import React from 'react';
import { LayoutDashboard, PieChart, ArrowLeftRight, Settings, LogOut, Download } from 'lucide-react';

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-icon">A</div>
                <span className="logo-text">Aurum Wealth</span>
            </div>

            <nav className="nav-menu">
                <a href="#" className="nav-item active">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </a>
                <a href="#" className="nav-item">
                    <PieChart size={20} />
                    <span>Portfolio</span>
                </a>
                <a href="#" className="nav-item">
                    <ArrowLeftRight size={20} />
                    <span>Activity</span>
                </a>
            </nav>

            <div className="nav-footer">
                <a href="#" className="nav-item">
                    <Settings size={20} />
                    <span>Settings</span>
                </a>
                <a href="#" className="nav-item text-danger">
                    <LogOut size={20} />
                    <span>Logout</span>
                </a>
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
