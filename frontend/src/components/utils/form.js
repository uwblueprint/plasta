export function onFieldChange(field) {
  this.setState({ [field.key]: field.value });
}

/* form validation */

export const fieldRules = {
  FIELD_REQUIRED: {
    message: 'This field is required',
    isTrue: field => {
      if (field === undefined || field === null || field === '') return false;
      if (Array.isArray(field)) return field.length !== 0;
      if (Object.keys(field).length) return true;
      return false;
    },
  },
};

export const RULE_TYPES = {
  FIELD_REQUIRED: 'FIELD_REQUIRED',
};
Object.freeze(RULE_TYPES);

export const getErrorMessage = (error, field) => {
  switch (error) {
    case RULE_TYPES.FIELD_REQUIRED:
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
