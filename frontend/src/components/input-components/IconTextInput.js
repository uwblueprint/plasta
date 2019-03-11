import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InvalidInputMessage from '../InvalidInputMessage';
import composeInput from './InputContainer';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { AttachMoney, ShoppingBasket, Autorenew } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Rupee from '../../assets/Rupee';

const styles = {
  input: {
    color: 'black',
    height: 48,
  },
  label: {
    margin: 'auto',
  },
  imageStyle: {
    borderRadius: 3,
    display: 'inline-block',
    position: 'relative',
    top: -2,
    verticalAlign: 'middle',
  },
};

const IconTextInput = props => {
  const {
    id,
    classes,
    label,
    onChange,
    onValidation,
    field,
    errors,
    showErrors,
    rules,
    value,
    type,
    hasImage,
    iconimage,
    ...rest
  } = props;
  return (
    <Grid container spacing={8} alignItems="center" wrap="nowrap">
      <Grid item>{props.iconimage()}</Grid>
      <Grid item xs={11}>
        <div>
          <TextField
            id={id}
            InputProps={{ className: classes.input, required: true }}
            InputLabelProps={{ margin: 'dense' }}
            label={label}
            variant="outlined"
            name={id}
            value={value}
            type={type}
            field={field}
            fullWidth
            onChange={onChange}
            {...rest}
          />
          {showErrors &&
            errors.map((err, i) => <InvalidInputMessage key={i} showIcon message={err} />)}
        </div>
      </Grid>
    </Grid>
  );
};

IconTextInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  InputAdornment: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default composeInput(withStyles(styles)(IconTextInput));
