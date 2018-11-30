import React, { Component } from 'react';
import { fieldRules } from '../utils/form';

function composeInput(InputComponent, override = {}) {
  // ...and returns another component...
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: [],
        touched: false,
      };
      this.onChange = override.onChange ? override.onChange.bind(this) : this.onChange.bind(this);
      this.onBlur = override.onBlur ? override.onBlur.bind(this) : this.onBlur.bind(this);
      this.getErrors = this.getErrors.bind(this);
      this.validate = this.validate.bind(this);
    }

    static defaultProps = {
      validateOnBlur: true,
    };

    componentDidMount() {
      this.validate();
    }

    onBlur(e) {
      this.props.onBlur && this.props.onBlur({ value: e.target.value, key: this.props.field });
      if (this.props.validateOnBlur === undefined || this.props.validateOnBlur) this.validate();
      this.setState({ touched: true });
    }

    onChange(e) {
      this.props.onChange && this.props.onChange({ value: e.target.value, key: this.props.field });
    }

    getErrors() {
      const rules = this.props.rules || [];
      if (!rules || rules.length === 0) return [];
      return rules.reduce((errs, type) => {
        const rule = fieldRules[type];
        !rule.isTrue(this.props.value) && errs.push(rule.message);
        return errs;
      }, []);
    }

    validate() {
      Promise.resolve(this.getErrors()).then(errors => {
        this.setState({ errors });
        this.props.onValidation && this.props.onValidation({ errors, field: this.props.field });
      });
    }

    render() {
      const showErrors = (this.state.touched && this.props.validateOnBlur) || this.props.showErrors;
      const { onValidation, validateOnBlur, ...props } = this.props; // extract to elim. console errors
      return (
        <InputComponent
          {...props}
          errors={this.state.errors}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.props.value}
          showErrors={showErrors}
        />
      );
    }
  };
}

export default composeInput;
