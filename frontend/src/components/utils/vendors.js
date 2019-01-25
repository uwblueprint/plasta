export function findVendorById(vendors, id) {
  return vendors.find(vendor => id === vendor.id);
}

export function findVendorsByIds(vendors, ids) {
  return vendors.filter(vendor => ids.includes(vendor.id));
}

export function findVendorsByType(vendors, type, currentVendorId) {
  return vendors.filter(vendor => vendor.id !== currentVendorId && type === vendor.vendor_type);
}

export function findVendorsByTypes(vendors, types, currentVendorId) {
  return vendors.filter(
    vendor => vendor.id !== currentVendorId && types.includes(vendor.vendor_type)
  );
}

export function removeUnderscoresAndCapitalize(str) {
  return str
    .split('_')
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}
