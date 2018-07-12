import React from 'react';
import './AdminDashboard.css';

const dummyProjects = [{ name: 'Project A' }, { name: 'Project B' }, { name: 'Project C' }];

const AdminDashboard = props => (
  <div className="page-wrapper admin-dash-wrapper">
    <div className="header">
      <h2>Active</h2>
      <div className="right-align">
        <button className="btn btn-small btn-new-proj" type="button">
          + NEW
        </button>
      </div>
    </div>
    {dummyProjects.map(proj => (
      <button className="btn btn-proj" type="button" key={proj.name}>
        {proj.name}
      </button>
    ))}
    <div className="right-align">
      <button className="btn btn-archive" type="button">
        Archive
      </button>
    </div>
  </div>
);

export default AdminDashboard;
