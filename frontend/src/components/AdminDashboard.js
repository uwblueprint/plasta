import React, { Component } from 'react';
import './AdminDashboard.css';
import { get } from './utils/requests.js';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      showPlaceholderText: false,
      placeholderText: 'No projects to display.',
    };
  }

  componentDidMount() {
    get('/projects')
      .then(res => {
        this.setState({
          projectList: res.data,
          showPlaceholderText: res.data.length ? false : true,
        });
      })
      .catch(err => {
        this.setState({
          showPlaceholderText: true,
          placeholderText: 'Something went wrong. Unable to fetch projects at this time.',
        });
      });
  }

  render() {
    return (
      <div className="page-wrapper" id="admin-dash-wrapper">
        <button
          className=" btn-small"
          id="btn-new-proj"
          type="button"
          onClick={() => this.props.history.push('/projects/new')}
        >
          + New
        </button>
        <h2>Active Projects</h2>
        <div className="active-proj-wrapper">
          {this.state.showPlaceholderText ? (
            <div className="error-placeholder">{this.state.placeholderText}</div>
          ) : (
            this.state.projectList.map(project => (
              <button
                className=" btn-proj"
                type="button"
                key={project.id}
                onClick={() => this.props.history.push(`projects/${project.id}`)}
              >
                {project.name}
              </button>
            ))
          )}
        </div>
        <button id="btn-archive" type="button">
          Archive
        </button>
      </div>
    );
  }
}

export default AdminDashboard;
