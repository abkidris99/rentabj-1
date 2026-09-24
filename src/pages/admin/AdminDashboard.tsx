import React, { useEffect, useState } from 'react';
import {
  getLeads,
  getProperties,
  getArticles,
  getVisitorStats,
  Lead,
  PropertyDoc,
  ArticleDoc,
  VisitorStats,
} from '../../lib/supabaseService';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<PropertyDoc[]>([]);
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [analytics, setAnalytics] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getLeads(),
      getProperties(),
      getArticles(),
      getVisitorStats(),
    ])
      .then(([leadsRes, propsRes, artsRes, anaRes]) => {
        if (leadsRes.status === 'fulfilled') setLeads(leadsRes.value);
        if (propsRes.status === 'fulfilled') setProperties(propsRes.value);
        if (artsRes.status === 'fulfilled') setArticles(artsRes.value);
        if (anaRes.status === 'fulfilled') setAnalytics(anaRes.value);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const totalProps = properties.length;
  const availProps = properties.filter((p) => p.available).length;
  const totalArticles = articles.length;

  const totalViews = analytics?.totalViews ?? 0;
  const todayViews = analytics?.todayViews ?? 0;
  const totalUnique = analytics?.totalUnique ?? 0;

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
      label: 'Website Views',
      value: loading ? '…' : totalViews,
      sub: `${todayViews} views today`,
      icon: '👁️',
      link: '#analytics-section',
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

  const formatTimeAgo = (iso?: string) => {
    if (!iso) return '';
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const mobilePercent = analytics?.devices.find((d) => d.device === 'Mobile')?.percentage || 0;
  const desktopPercent = analytics?.devices.find((d) => d.device === 'Desktop')?.percentage || 0;
  const tabletPercent = analytics?.devices.find((d) => d.device === 'Tablet')?.percentage || 0;

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
          <Link to="/admin/blog" className="admin-quick-btn">✍️ Write Blog Article ({totalArticles})</Link>
          <Link to="/admin/settings" className="admin-quick-btn">⚙️ Site Settings & Analytics</Link>
        </div>
      </div>

      {/* ── VISITOR ANALYTICS SECTION ── */}
      <div id="analytics-section" className="admin-analytics-section">
        <div className="admin-analytics-header">
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--admin-text)' }}>
              Web Visitor Analytics
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-soft)' }}>
              Live telemetry tracking visitors, pages viewed, traffic sources, and devices
            </span>
          </div>
          <div className="admin-live-badge">
            <span className="admin-live-dot" />
            Live Tracking Active
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="admin-analytics-metrics">
          <div className="admin-metric-card">
            <div className="admin-metric-val">{totalViews}</div>
            <div className="admin-metric-label">Total Page Views</div>
            <div className="admin-metric-sub">{analytics?.todayViews ?? 0} today • {analytics?.weekViews ?? 0} this week</div>
          </div>
          <div className="admin-metric-card">
            <div className="admin-metric-val">{totalUnique}</div>
            <div className="admin-metric-label">Unique Visitors</div>
            <div className="admin-metric-sub">{analytics?.todayUnique ?? 0} today • {analytics?.weekUnique ?? 0} this week</div>
          </div>
          <div className="admin-metric-card">
            <div className="admin-metric-val">
              {analytics?.sources[0]?.source || 'Direct'}
            </div>
            <div className="admin-metric-label">Top Traffic Source</div>
            <div className="admin-metric-sub">
              {analytics?.sources[0] ? `${analytics.sources[0].percentage}% of total traffic` : 'Awaiting visits'}
            </div>
          </div>
          <div className="admin-metric-card">
            <div className="admin-metric-val">
              {mobilePercent >= desktopPercent ? '📱 Mobile' : '💻 Desktop'}
            </div>
            <div className="admin-metric-label">Primary Device</div>
            <div className="admin-metric-sub">
              {mobilePercent}% Mobile • {desktopPercent}% Desktop
            </div>
          </div>
        </div>

        {totalViews === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed var(--admin-border)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📡</div>
            <h4 style={{ color: 'var(--admin-text)', marginBottom: '6px' }}>
              Visitor Tracking Ready
            </h4>
            <p style={{ color: 'var(--admin-text-soft)', fontSize: '0.86rem', maxWidth: '520px', margin: '0 auto 16px', lineHeight: 1.5 }}>
              Tracking script is active across all public pages. Once visitors browse your website, real-time metrics, visited pages, traffic sources, and device types will populate automatically.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-soft)', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', textAlign: 'left', maxWidth: '560px', margin: '0 auto', overflowX: 'auto', fontFamily: 'monospace' }}>
              <div>-- Make sure you ran this in your Supabase SQL editor:</div>
              <div>create table if not exists page_views (</div>
              <div>&nbsp;&nbsp;id uuid default gen_random_uuid() primary key,</div>
              <div>&nbsp;&nbsp;path text not null,</div>
              <div>&nbsp;&nbsp;referrer text,</div>
              <div>&nbsp;&nbsp;device text,</div>
              <div>&nbsp;&nbsp;browser text,</div>
              <div>&nbsp;&nbsp;session_id text,</div>
              <div>&nbsp;&nbsp;created_at timestamptz default now() not null</div>
              <div>);</div>
              <div>alter table page_views enable row level security;</div>
              <div>create policy "Public insert views" on page_views for insert with check (true);</div>
              <div>create policy "Admin read views" on page_views for select using (true);</div>
            </div>
          </div>
        ) : (
          <div className="admin-analytics-grid">
            {/* Top Visited Pages */}
            <div className="admin-panel-card">
              <div className="admin-panel-title">
                <span>🔥 Most Visited Pages</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-soft)' }}>By page hits</span>
              </div>
              <div className="admin-rank-list">
                {analytics?.topPages.map((p) => {
                  const maxCount = analytics.topPages[0]?.count || 1;
                  const pct = Math.round((p.count / maxCount) * 100);
                  const displayPath = p.path === '/' ? '/ (Homepage)' : p.path;
                  return (
                    <div key={p.path} className="admin-rank-item">
                      <div className="admin-rank-info">
                        <span className="admin-rank-path">{displayPath}</span>
                        <span className="admin-rank-count">{p.count} views</span>
                      </div>
                      <div className="admin-bar-wrap">
                        <div className="admin-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Traffic Sources & Devices */}
            <div className="admin-panel-card">
              <div className="admin-panel-title">
                <span>🌐 Traffic Sources</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-soft)' }}>Where visitors come from</span>
              </div>
              <div className="admin-rank-list" style={{ marginBottom: '18px' }}>
                {analytics?.sources.map((s) => (
                  <div key={s.source} className="admin-rank-item">
                    <div className="admin-rank-info">
                      <span className="admin-rank-path">{s.source}</span>
                      <span className="admin-rank-count">{s.count} ({s.percentage}%)</span>
                    </div>
                    <div className="admin-bar-wrap">
                      <div
                        className="admin-bar-fill"
                        style={{
                          width: `${s.percentage}%`,
                          background: s.source.includes('WhatsApp') ? 'var(--admin-green)' : s.source.includes('Google') ? 'var(--admin-gold)' : 'var(--admin-blue)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-text-soft)' }}>
                  Device Breakdown
                </span>
                <div className="admin-device-bar">
                  <div className="admin-device-seg-mobile" style={{ width: `${mobilePercent}%` }} />
                  <div className="admin-device-seg-desktop" style={{ width: `${desktopPercent}%` }} />
                  <div className="admin-device-seg-tablet" style={{ width: `${tabletPercent}%` }} />
                </div>
                <div className="admin-device-legend">
                  <div className="admin-device-item">
                    <span className="admin-device-dot admin-device-seg-mobile" />
                    <span>Mobile ({mobilePercent}%)</span>
                  </div>
                  <div className="admin-device-item">
                    <span className="admin-device-dot admin-device-seg-desktop" />
                    <span>Desktop ({desktopPercent}%)</span>
                  </div>
                  {tabletPercent > 0 && (
                    <div className="admin-device-item">
                      <span className="admin-device-dot admin-device-seg-tablet" />
                      <span>Tablet ({tabletPercent}%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Live Stream of Recent Visits */}
            <div className="admin-panel-card" style={{ gridColumn: '1 / -1' }}>
              <div className="admin-panel-title">
                <span>⚡ Live Activity Stream</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-soft)' }}>Latest page visits</span>
              </div>
              <div className="admin-stream-list">
                {analytics?.recentVisits.map((v) => (
                  <div key={v.id} className="admin-stream-item">
                    <div className="admin-stream-left">
                      <span style={{ fontSize: '1.1rem' }}>
                        {v.device === 'Mobile' ? '📱' : v.device === 'Tablet' ? '📟' : '💻'}
                      </span>
                      <div>
                        <div className="admin-stream-path">{v.path === '/' ? '/ (Homepage)' : v.path}</div>
                        <div className="admin-stream-meta">
                          <span>Via: {v.referrer || 'Direct'}</span>
                          <span>•</span>
                          <span>{v.browser} on {v.device}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--admin-text-soft)', flexShrink: 0 }}>
                      {formatTimeAgo(v.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Recent Leads Preview ── */}
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
