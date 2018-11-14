export function onFieldChange(field) {
  this.setState({ [field.key]: field.value });
}
