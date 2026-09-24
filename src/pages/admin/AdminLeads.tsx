import React, { useEffect, useState } from 'react';
import { getLeads, updateLeadStatus, deleteLead, Lead } from '../../lib/supabaseService';

const statusColors: Record<Lead['status'], string> = {
  new: '#22c55e',
  contacted: '#f59e0b',
  closed: '#94a3b8',
};

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: Lead['status']) => {
    try {
      await updateLeadStatus(id, status);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  const formatDate = (ts?: string) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toLocaleDateString('en-NG', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Leads Inbox</h2>
          <p>{leads.length} total · {leads.filter((l) => l.status === 'new').length} new</p>
        </div>
        <button className="admin-btn" onClick={fetchLeads}>↻ Refresh</button>
      </div>

      {/* Filter tabs */}
      <div className="admin-filter-tabs">
        {(['all', 'new', 'contacted', 'closed'] as const).map((s) => (
          <button
            key={s}
            className={`admin-filter-tab ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== 'all' && (
              <span className="admin-tab-count">
                {leads.filter((l) => l.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-loading-inline">Loading leads…</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">No leads found.</div>
      ) : (
        <div className="admin-leads-list">
          {filtered.map((lead) => (
            <div key={lead.id} className="admin-lead-card">
              <div className="admin-lead-header">
                <div className="admin-lead-name">{lead.fullName}</div>
                <div className="admin-lead-meta">
                  <span
                    className="admin-status-badge"
                    style={{ background: statusColors[lead.status] }}
                  >
                    {lead.status}
                  </span>
                  <span className="admin-lead-date">{formatDate(lead.createdAt)}</span>
                </div>
              </div>

              <div className="admin-lead-details">
                <span>📞 {lead.phoneNumber}</span>
                <span>📍 {lead.preferredLocation}</span>
                <span>🏠 {lead.propertyType}</span>
                <span>💰 ₦{lead.annualBudget}/yr</span>
                {lead.moveInDate && <span>📅 {lead.moveInDate}</span>}
              </div>

              {lead.requirements && (
                <div className="admin-lead-notes">
                  <strong>Notes:</strong> {lead.requirements}
                </div>
              )}

              <div className="admin-lead-actions">
                <a
                  href={`https://wa.me/2348022908212?text=Hi%20${encodeURIComponent(lead.fullName)}%2C%20we%20received%20your%20property%20request%20for%20a%20${encodeURIComponent(lead.propertyType)}%20in%20${encodeURIComponent(lead.preferredLocation)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-wa"
                >
                  💬 Reply on WhatsApp
                </a>
                <a href={`tel:${lead.phoneNumber}`} className="admin-btn admin-btn-outline">
                  📞 Call
                </a>
                <select
                  className="admin-status-select"
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(lead.id!, e.target.value as Lead['status'])
                  }
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(lead.id!)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
