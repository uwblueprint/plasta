import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreateStakeholderModal.css';
import { withRouter } from 'react-router-dom';

export class CreateStakeholderModal extends Component {
  render() {
    return (
      <div id="modal-wrapper">
        {this.props.show && (
          <div className="modal">
            <section className="modal-main">
              <button className="cancel-button" onClick={this.props.handleClose}>
                <i className="far fa-times-circle" />
              </button>
              <h1>Create a new...</h1>
              <button
                type="button"
                onClick={() => this.props.history.push('/dwcc/wastepickers/new')}
              >
                Wastepicker
              </button>
              <button
                type="button"
                onClick={() => this.props.history.push('/dwcc/external-dwcc/new')}
              >
                DWCC
              </button>
            </section>
          </div>
        )}
      </div>
    );
  }
}

CreateStakeholderModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default withRouter(CreateStakeholderModal);
