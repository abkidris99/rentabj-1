import React from 'react';
import { Link } from 'react-router-dom';

export const AdminBlog: React.FC = () => (
  <div className="admin-page">
    <div className="admin-page-header">
      <div>
        <h2>Blog Manager</h2>
        <p>Create, edit, and publish articles.</p>
      </div>
      <button className="admin-btn">+ New Article</button>
    </div>
    <div className="admin-coming-soon">
      <div className="admin-coming-icon">✍️</div>
      <h3>Blog CMS — Coming Next</h3>
      <p>
        This will let you create and edit blog articles without touching code.
        Articles will be stored in Firestore and published to the live site.
      </p>
      <Link to="/admin" className="admin-btn admin-btn-outline">← Back to Dashboard</Link>
    </div>
  </div>
);
