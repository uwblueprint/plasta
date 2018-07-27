import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const dummyProjects = [{ name: 'Project A' }, { name: 'Project B' }, { name: 'Project C' }];

const AdminDashboard = props => (
  <div className="page-wrapper" id="admin-dash-wrapper">
    <Link to="/projects/new">
      <button className="btn btn-small" id="btn-new-proj" type="button">
        + New
      </button>
    </Link>
    <h2>Active Projects</h2>
    <div className="active-proj-wrapper">
      {dummyProjects.map(proj => (
        <button className="btn btn-proj" type="button" key={proj.name}>
          {proj.name}
        </button>
      ))}
    </div>
    <button className="btn" id="btn-archive" type="button">
      Archive
    </button>
  </div>
);

export default AdminDashboard;
