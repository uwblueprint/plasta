export function onFieldChange(field) {
  this.setState({ [field.key]: field.value });
}

/* form validation */

export const isFieldEmpty = field => {
  return Array.isArray(field) ? field.length === 0 : field === '';
};

export function onFieldBlur(field) {
  const touched = `${field.key}Touched`;
  this.setState({ [touched]: true });
}

export const errorTypes = {
  FIELD_REQUIRED: 0,
};
Object.freeze(errorTypes);

export const getErrorMessage = (error, field) => {
  switch (error) {
    case errorTypes.FIELD_REQUIRED:
      return `${field} is required`;
    default:
      return '';
  }
};

export function isFormValid(fieldsInfo) {
  return !Object.keys(fieldsInfo).some(
    field => fieldsInfo[field].isRequired && isFieldEmpty(this.state[field])
  );
}
