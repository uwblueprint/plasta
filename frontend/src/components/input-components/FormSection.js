import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormSection';

class FormSection extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.title && <h2> {this.props.title} </h2>}
        {this.props.children}
      </div>
    );
  }
}

FormSection.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FormSection;
