export function findVendorById(vendors, id) {
  return vendors.find(vendor => id === vendor.id);
}
