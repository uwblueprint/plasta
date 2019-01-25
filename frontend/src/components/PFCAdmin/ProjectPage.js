import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { get } from '../utils/requests';
import TransactionHistory from './TransactionHistory';
import './ProjectPage.css';

let data = [];

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Project Name',
    };
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;
    const url = `/projects/${projectId}/transactions`;
    get(url, this.props.cookies.get('access_token')).then(res => res.data);
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

export default withCookies(ProjectPage);
