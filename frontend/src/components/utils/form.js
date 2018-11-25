export function onFieldChange(field) {
  this.setState({ [field.key]: field.value });
}

/* form validation */

export const fieldRules = {
  FIELD_REQUIRED: {
    message: 'This field is required',
    isTrue: field => (Array.isArray(field) ? field.length !== 0 : field !== ''),
  },
};

export const ruleTypes = {
  FIELD_REQUIRED: 'FIELD_REQUIRED',
};
Object.freeze(ruleTypes);

export const getErrorMessage = (error, field) => {
  switch (error) {
    case ruleTypes.FIELD_REQUIRED:
      return `${field} is required`;
    default:
      return '';
  }
};

export function isFormValid() {
  return !Object.values(this.state.errors).some(fieldErrors => fieldErrors.length !== 0);
}

export function onValidation(results) {
  const errors = { ...this.state.errors };
  errors[results.field] = results.errors;
  this.setState({ errors });
}
