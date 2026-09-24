import React from 'react';
import { Link } from 'react-router-dom';

export const AdminProperties: React.FC = () => (
  <div className="admin-page">
    <div className="admin-page-header">
      <div>
        <h2>Properties Manager</h2>
        <p>Add, edit, and remove property listings.</p>
      </div>
      <button className="admin-btn">+ Add Property</button>
    </div>
    <div className="admin-coming-soon">
      <div className="admin-coming-icon">🏘️</div>
      <h3>Properties Manager — Coming Next</h3>
      <p>
        This will let you manage all featured property listings directly from
        the dashboard. Listings will be stored in Firestore and shown on the
        live site in real time.
      </p>
      <Link to="/admin" className="admin-btn admin-btn-outline">← Back to Dashboard</Link>
    </div>
  </div>
);
