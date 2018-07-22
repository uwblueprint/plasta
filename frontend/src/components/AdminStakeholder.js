import './AdminStakeholder.css';
import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

class AdminStakeholder extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  render() {
    return (
      <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList>
          <Tab>DWCC</Tab>
          <Tab>Wholesaler</Tab>
        </TabList>
        <TabPanel>
          <button className="btn" type="button">
            New DWCC
          </button>
        </TabPanel>
        <TabPanel>
          <button className="btn" type="button">
            New Wholesaler
          </button>
        </TabPanel>
      </Tabs>
    );
  }
}

export default AdminStakeholder;
