import React from 'react';
import './OnSubmitButton.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { submitForm, fetchComplete } from '../../actions';

const OnSubmitButton = props => {
  const onSubmit = async () => {
    if (!props.onClick) return;
    try {
      props.onSubmit();
      await props.onClick();
      props.nextPath ? props.history.push(props.nextPath) : props.history.goBack();
    } catch (err) {
      console.error(err);
      alert(err);
    }
    props.onComplete();
  };
  return (
    <button
      disabled={props.isLoading}
      className="btn-dark bg-green OnSubmitButton"
      type="submit"
      onClick={onSubmit}
    >
      <i className="fas fa-check" style={{ marginRight: '1em' }} />
      {props.text}
    </button>
  );
};

OnSubmitButton.defaultProps = {
  text: 'Save',
};

OnSubmitButton.propTypes = {
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: () => dispatch(submitForm()),
  onComplete: () => dispatch(fetchComplete()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OnSubmitButton)
);
