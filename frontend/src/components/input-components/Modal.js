import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    handleClose: PropTypes.func,
    show: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    //closes on outside click
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.handleClose();
  }
  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div id="modal-wrapper">
        <div className={showHideClassName}>
          <section className="modal-main" ref={node => (this.node = node)}>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}

export default Modal;
