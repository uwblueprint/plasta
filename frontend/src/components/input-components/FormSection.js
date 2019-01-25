import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormSection.css';

class FormSection extends Component {
  render() {
    const className = this.props.className;
    return (
      <div className={classNames('form-section', className)}>
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
