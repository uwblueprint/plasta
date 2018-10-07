import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionHistory from './TransactionHistory';
import './ProjectPage.css';

const data = [];

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Project Name',
    };
  }

  componentDidMount() {
    const url =
      process.env.REACT_APP_API_URL + 'project/' + this.props.project_id + '/transactions';

    fetch(url).then(function(res) {
      data = res.data['transactions'];
    });
  }

  render() {
    return (
      <div className="page-wrapper" id="proj-page-wrapper">
        <h1>{this.state.name}</h1>
        <TransactionHistory data={data} />
      </div>
    );
  }
}

ProjectPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ProjectPage;
