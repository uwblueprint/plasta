import React from 'react';

const InvalidInputMessage = props => (
  <div className="invalid-input-message font-small red">
    {props.showIcon && <i className="red fas fa-exclamation-circle" />}
    {props.message}
  </div>
);

export default InvalidInputMessage;
