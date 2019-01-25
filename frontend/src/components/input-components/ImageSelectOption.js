import React, { Component } from 'react';
import personImage from '../../assets/person.png';

const IMAGE_SIZE = 35;

export class ImageSelectOption extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }

  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event);
  }

  handleMouseMove(event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }

  render() {
    let imageStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
      >
        <img
          alt={''}
          style={imageStyle}
          src={this.props.option.image_link ? this.props.option.image_link : personImage}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
          className={'img' + this.props.className}
        />
        {this.props.children}
      </div>
    );
  }
}

export class ImageSelectedOption extends Component {
  render() {
    let imageStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          {this.props.value.label ? (
            <img
              alt={''}
              style={imageStyle}
              src={this.props.value.image_link ? this.props.value.image_link : personImage}
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
              className={'img' + this.props.className}
            />
          ) : null}
          {this.props.value.label ? this.props.value.label : null}
        </span>
      </div>
    );
  }
}
