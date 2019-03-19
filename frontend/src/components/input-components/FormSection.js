import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormSection.css';

class FormSection extends Component {
  render() {
    const className = this.props.className;
    const divStyle = {
      paddingBottom: '1em',
    };
    return (
      <div className={classNames('form-section', className)} style={divStyle}>
        {this.props.children}
      </div>
    );
  }
}

FormSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FormSection;
