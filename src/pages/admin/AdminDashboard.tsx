import React, { useEffect, useState } from 'react';
import { getLeads } from '../../lib/supabaseService';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [leadsCount, setLeadsCount] = useState<number | null>(null);
  const [newLeadsCount, setNewLeadsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeads()
      .then((leads) => {
        setLeadsCount(leads.length);
        setNewLeadsCount(leads.filter((l) => l.status === 'new').length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Total Leads',
      value: loading ? '…' : leadsCount ?? 0,
      icon: '📬',
      link: '/admin/leads',
      color: 'var(--admin-blue)',
    },
    {
      label: 'New / Uncontacted',
      value: loading ? '…' : newLeadsCount ?? 0,
      icon: '🔔',
      link: '/admin/leads',
      color: 'var(--admin-green)',
    },
    {
      label: 'Blog Articles',
      value: '—',
      icon: '✍️',
      link: '/admin/blog',
      color: 'var(--admin-purple)',
    },
    {
      label: 'Properties Listed',
      value: '—',
      icon: '🏘️',
      link: '/admin/properties',
      color: 'var(--admin-gold)',
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Dashboard</h2>
        <p>Welcome back — here's a quick overview of your site.</p>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <Link to={stat.link} key={stat.label} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className="admin-stat-body">
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-quick-links">
        <h3>Quick Actions</h3>
        <div className="admin-quick-grid">
          <Link to="/admin/leads" className="admin-quick-btn">📬 View All Leads</Link>
          <Link to="/admin/blog" className="admin-quick-btn">✍️ Write New Article</Link>
          <Link to="/admin/properties" className="admin-quick-btn">🏘️ Add Property</Link>
          <Link to="/admin/settings" className="admin-quick-btn">⚙️ Site Settings</Link>
        </div>
      </div>
    </div>
  );
};
