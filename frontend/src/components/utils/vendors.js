export function findVendorById(vendors, id) {
  return vendors.find(vendor => id === vendor.id);
}

export function findVendorsByType(vendors, type) {
  return vendors.filter(vendor => type === vendor.vendor_type);
}
