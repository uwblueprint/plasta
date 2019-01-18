export function findVendorById(vendors, id) {
  return vendors.find(vendor => id === vendor.id);
}

export function findVendorsByType(vendors, type) {
  return vendors.filter(vendor => type === vendor.vendor_type);
}

// Removes underscores and capitalizes each word
export function parseAndCleanLabel(str) {
  const frags = str.split('_');
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
