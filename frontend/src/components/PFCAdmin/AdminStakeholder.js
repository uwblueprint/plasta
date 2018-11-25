import './AdminStakeholder.css';
import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import AdminStakeholderInfo from './AdminStakeholderInfo';
import { PrimarySegregatorData, WholesalerData } from '../fakeData';

class AdminStakeholder extends Component {
  constructor() {
    super();
    this.state = { selectedTab: 0 };
  }
  render() {
    return (
      <div className="page-wrapper">
        <h1> Stakeholders </h1>
        <Tabs
          selectedIndex={this.state.selectedTab}
          onSelect={selectedTab => this.setState({ selectedTab })}
        >
          <TabList>
            <Tab>Primary Segregator</Tab>
            <Tab>Wholesaler</Tab>
          </TabList>
          <TabPanel>
            <button
              type="button"
              onClick={() => this.props.history.push('/admin/stakeholders/new')}
            >
              New Primary Segregator
            </button>
            <AdminStakeholderInfo stakeholders={PrimarySegregatorData} />
          </TabPanel>
          <TabPanel>
            <button
              type="button"
              onClick={() => this.props.history.push('/admin/stakeholders/new')}
            >
              New Wholesaler
            </button>
            <AdminStakeholderInfo stakeholders={WholesalerData} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default AdminStakeholder;
