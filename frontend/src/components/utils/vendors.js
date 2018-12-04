export function filterVendorsById(vendors, ids) {
  return vendors.filter(vendor => ids.includes(vendor.id));
}
