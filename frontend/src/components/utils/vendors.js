export function findVendorById(vendors, id) {
  return vendors.find(vendor => id === vendor.id);
}

export function findVendorsByIds(vendors, ids) {
  return vendors.filter(vendor => ids.includes(vendor.id));
}

export function findVendorsByType(vendors, type) {
  return vendors.filter(vendor => type === vendor.vendor_type);
}

export function findVendorsByTypes(vendors, types) {
  return vendors.filter(vendor => types.includes(vendor.vendor_type));
}

export function removeUnderscoresAndCapitalize(str) {
  return str
    .split('_')
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}
