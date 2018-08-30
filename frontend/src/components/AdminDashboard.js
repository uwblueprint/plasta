import React, { Component } from 'react';
import './AdminDashboard.css';

const dummyProjects = [
  { name: 'Project A', slug: 'project-a' },
  { name: 'Project B', slug: 'project-b' },
  { name: 'Project C', slug: 'project-c' },
];

class AdminDashboard extends Component {
  render() {
    return (
      <div className="page-wrapper" id="admin-dash-wrapper">
        <button
          className="btn btn-small"
          id="btn-new-proj"
          type="button"
          onClick={() => this.props.history.push('/projects/new')}
        >
          + New
        </button>
        <h2>Active Projects</h2>
        <div className="active-proj-wrapper">
          {dummyProjects.map(project => (
            <button
              className="btn btn-proj"
              type="button"
              key={project.slug}
              onClick={() => this.props.history.push(`projects/${project.slug}`)}
            >
              {project.name}
            </button>
          ))}
        </div>
        <button className="btn" id="btn-archive" type="button">
          Archive
        </button>
      </div>
    );
  }
}

export default AdminDashboard;
