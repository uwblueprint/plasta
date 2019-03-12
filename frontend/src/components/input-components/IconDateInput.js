import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

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

const IconDateInput = props => {
  const {
    label,
    classes,
    value,
    onChange,
    iconimage,
    ...rest
  } = props;

  return (
    <Grid container spacing={8} alignItems="center" wrap="nowrap">
      <Grid item>{props.iconimage}</Grid>
      <Grid item xs={11}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            label={label}
            InputProps={{ className: classes.input, required: true }}
            InputLabelProps={{ margin: 'dense' }}
            variant="outlined"
            value={value}
            onChange={onChange}
            autoOk
            fullWidth={true}
            format="YYYY-MM-DD"
            {...rest}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};

IconDateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(IconDateInput);
