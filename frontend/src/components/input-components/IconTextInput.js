import React from 'react';
import PropTypes from 'prop-types';
import composeInput from './InputContainer';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
  const { id, classes, errors, showErrors, iconimage, ...rest } = props;
  const isErrorState = showErrors && props.errors.length > 0;
  return (
    <Grid container spacing={16} alignItems="center" wrap="nowrap" style={{ marginBottom: 5 }}>
      <Grid item xs={1}>
        {props.iconimage}
      </Grid>
      <Grid item xs={12}>
        <TextField
          id={id}
          InputProps={{ className: classes.input, required: true }}
          InputLabelProps={{ margin: 'dense' }}
          variant="outlined"
          name={id}
          fullWidth
          type="text" // default to text
          error={isErrorState}
          helperText={isErrorState ? errors[0] : ''}
          {...rest}
        />
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
  field: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  InputAdornment: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default composeInput(withStyles(styles)(IconTextInput));
