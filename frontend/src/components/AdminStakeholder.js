import './AdminStakeholder.css';
import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

class AdminStakeholder extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    return (
      <div className="page-wrapper">
        <h1> Stakeholders </h1>
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
        >
          <TabList>
            <Tab>DWCC</Tab>
            <Tab>Wholesaler</Tab>
          </TabList>
          <TabPanel>
            <Link to="/newstakeholder">
              <button className="btn" type="button">
                New DWCC
              </button>
            </Link>
          </TabPanel>
          <TabPanel>
            <Link to="/newstakeholder">
              <button className="btn" type="button">
                New Wholesaler
              </button>
            </Link>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default AdminStakeholder;
