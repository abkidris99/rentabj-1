import React, { useEffect, useState } from 'react';
import {
  getLeads,
  getProperties,
  getArticles,
  Lead,
  PropertyDoc,
  ArticleDoc,
} from '../../lib/supabaseService';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<PropertyDoc[]>([]);
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getLeads(), getProperties(), getArticles()])
      .then(([leadsRes, propsRes, artsRes]) => {
        if (leadsRes.status === 'fulfilled') setLeads(leadsRes.value);
        if (propsRes.status === 'fulfilled') setProperties(propsRes.value);
        if (artsRes.status === 'fulfilled') setArticles(artsRes.value);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const totalProps = properties.length;
  const availProps = properties.filter((p) => p.available).length;
  const totalArticles = articles.length;

  const stats = [
    {
      label: 'Total Inquiries',
      value: loading ? '…' : totalLeads,
      sub: `${newLeads} new / uncontacted`,
      icon: '📬',
      link: '/admin/leads',
      color: 'var(--admin-blue)',
    },
    {
      label: 'New Leads',
      value: loading ? '…' : newLeads,
      sub: 'Action required',
      icon: '🔔',
      link: '/admin/leads',
      color: newLeads > 0 ? 'var(--admin-gold)' : 'var(--admin-green)',
    },
    {
      label: 'Properties Listed',
      value: loading ? '…' : totalProps,
      sub: `${availProps} active listings`,
      icon: '🏘️',
      link: '/admin/properties',
      color: 'var(--admin-green)',
    },
    {
      label: 'Blog Guides',
      value: loading ? '…' : totalArticles,
      sub: 'Published insights',
      icon: '✍️',
      link: '/admin/blog',
      color: 'var(--admin-purple)',
    },
  ];

  const recentLeads = leads.slice(0, 5);

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <span style={{ background: 'rgba(59,130,246,0.2)', color: 'var(--admin-blue)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: 700 }}>NEW</span>;
      case 'contacted':
        return <span style={{ background: 'rgba(245,158,11,0.2)', color: 'var(--admin-gold)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: 700 }}>CONTACTED</span>;
      case 'closed':
        return <span style={{ background: 'rgba(34,197,94,0.2)', color: 'var(--admin-green)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.74rem', fontWeight: 700 }}>CLOSED</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back! Here's a live overview of RentABJ Homes.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-outline"
            style={{ fontSize: '0.84rem' }}
          >
            ↗ View Live Website
          </a>
        </div>
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
              <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-soft)', marginTop: '2px' }}>
                {stat.sub}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-quick-links" style={{ marginBottom: '28px' }}>
        <h3>Quick Actions</h3>
        <div className="admin-quick-grid">
          <Link to="/admin/leads" className="admin-quick-btn">📬 Review Leads ({newLeads} new)</Link>
          <Link to="/admin/properties" className="admin-quick-btn">🏘️ Manage Properties ({totalProps})</Link>
          <Link to="/admin/blog" className="admin-quick-btn">✍️ Write Blog Article</Link>
          <Link to="/admin/settings" className="admin-quick-btn">⚙️ Site Settings & Analytics</Link>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="admin-recent-box">
        <div className="admin-recent-header">
          <div>
            <h3>Recent Client Inquiries</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-soft)' }}>
              Most recent property requests submitted by visitors
            </span>
          </div>
          <Link to="/admin/leads" className="admin-btn admin-btn-outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            View All ({totalLeads}) &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="admin-loading-inline">Loading recent inquiries…</div>
        ) : recentLeads.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--admin-text-soft)', fontSize: '0.88rem' }}>
            No inquiries received yet. Submissions from the website request form will appear here.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => {
                  const waNumber = lead.phoneNumber.replace(/[^0-9]/g, '');
                  const waText = encodeURIComponent(
                    `Hi ${lead.fullName}, thank you for reaching out to RentABJ Homes regarding a ${lead.propertyType} in ${lead.preferredLocation}.`
                  );
                  return (
                    <tr key={lead.id}>
                      <td style={{ fontWeight: 600 }}>
                        {lead.fullName}
                        <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-soft)', fontWeight: 400 }}>
                          {lead.phoneNumber}
                        </div>
                      </td>
                      <td>{lead.preferredLocation}</td>
                      <td>{lead.propertyType}</td>
                      <td style={{ color: 'var(--admin-gold)', fontWeight: 600 }}>{lead.annualBudget}</td>
                      <td>{getStatusBadge(lead.status)}</td>
                      <td>
                        <a
                          href={`https://wa.me/${waNumber}?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn-wa"
                          style={{ fontSize: '0.75rem', padding: '4px 9px' }}
                        >
                          💬 WhatsApp
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
