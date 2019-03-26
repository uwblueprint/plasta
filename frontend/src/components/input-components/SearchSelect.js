import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { cancel as CancelIcon } from '../../assets/icons';
import composeInput from './InputContainer';
import './SearchSelect.css';

const IMAGE_SIZE = 30;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: '5px 10px',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'inline-block',
    left: 0,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const iconStyle = {
  borderRadius: 3,
  display: 'inline-block',
  marginRight: 10,
  position: 'relative',
  verticalAlign: 'middle',
  maxWidth: '100%',
  maxHeight: '100%',
};

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.data.imageLink && (
        <img
          alt=""
          style={iconStyle}
          src={props.data.imageLink}
          className={'img-' + props.className}
        />
      )}
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.data.imageLink && (
        <img
          alt=""
          style={{ ...iconStyle, maxWidth: IMAGE_SIZE, maxHeight: IMAGE_SIZE }}
          src={props.data.imageLink}
          className={'img-' + props.className}
        />
      )}
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const SearchSelect = props => {
  const { className, label, errors, createable, showErrors, theme, classes, ...rest } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const isErrorState = showErrors && props.errors.length > 0;

  return (
    <div className={classNames('search-select-wrapper', className)}>
      <Grid container spacing={8} alignItems="center" wrap="nowrap">
        <Grid item xs={1} zeroMinWidth>
          {props.iconimage}
        </Grid>
        <Grid item xs={11}>
          {createable ? (
            <CreatableSelect
              styles={selectStyles}
              classes={classes}
              components={components}
              textFieldProps={{
                placeholder: '',
                variant: 'outlined',
                label: label || '',
                value: props.value ? props.value.label : '',
                error: isErrorState,
                helperText: isErrorState ? errors[0] : '',
              }}
              isClearable
              placeholder=""
              {...rest}
            />
          ) : (
            <Select
              styles={selectStyles}
              classes={classes}
              components={components}
              textFieldProps={{
                placeholder: '',
                value: props.value ? props.value.label : '',
                variant: 'outlined',
                label: label || '',
                error: isErrorState,
                helperText: isErrorState ? errors[0] : '',
              }}
              onValueChange={props.onChange}
              isClearable
              placeholder=""
              {...rest}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

SearchSelect.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  createable: PropTypes.bool,
  onNewOptionClick: PropTypes.func,
  promptTextCreator: PropTypes.func,
};

SearchSelect.defaultProps = {
  createable: false,
};

export default composeInput(withStyles(styles, { withTheme: true })(SearchSelect), {
  validateOnBlur: false,
  onChange: function onChange(selectedOption) {
    this.validate(selectedOption);
    this.props.onChange && this.props.onChange({ value: selectedOption, key: this.props.field });
  },
});
