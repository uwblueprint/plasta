import React, { Component } from 'react';

const InvalidInputMessage = props => (
  <div className="invalid-input-message font-small red">
    {props.showIcon && <i className="red fas fa-exclamation-circle" />}
    {props.msg}
  </div>
);

export default InvalidInputMessage;
