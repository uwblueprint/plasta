import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FileInput.css';
import { upload as uploadIcon } from '../../assets/icons';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    this.props.onBlur && this.props.onBlur({ value: e.target.files, key: this.props.field });
  }

  onChange(e) {
    this.props.onChange && this.props.onChange({ value: e.target.files[0], key: this.props.field });
  }

  render() {
    const { id, className, leftlabel, rightlabel, value, ...rest } = this.props;
    return (
      <div id={id} className={classNames('field-wrapper', className)}>
        {leftlabel && <span> {leftlabel} </span>}
        <label htmlFor="file" className="uploadPictureButton">
          {uploadIcon}
          Upload Picture
        </label>
        <input
          {...rest}
          id="file"
          type="file"
          name="picture_file"
          className="text-input-field fileInput"
          onChange={this.onChange}
          onBlur={this.onBlur}
          files={value}
        />
        {rightlabel && <span> {rightlabel} </span>}
        {value && value.name && <p className="fileSelected">File Selected: {value.name}</p>}
      </div>
    );
  }
}

FileInput.propTypes = {
  type: PropTypes.string,
  leftlabel: PropTypes.string,
  rightlabel: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
