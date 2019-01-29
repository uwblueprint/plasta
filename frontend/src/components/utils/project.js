import { List } from 'immutable';

export const fieldsInfo = {
  projectName: { key: 'projectName', label: 'Project Name', default: '', isRequired: true },
  projectType: {
    label: 'Project Type',
    default: 'external',
  },
  plastics: { key: 'plastics', label: 'Plastic Types', default: List(), isRequired: false },
  description: {
    label: 'Description',
    default: '',
    type: 'metaData',
  },
  brandName: {
    label: 'Brand Name',
    default: '',
    type: 'metaData',
  },
  gdriveLink: {
    label: 'Google Drive Link',
    default: '',
    type: 'metaData',
  },
  wholesalers: {
    label: 'Wholesaler(s)',
    default: [],
    type: 'metaData',
  },
  primarySegregators: {
    label: 'Primary Segregators',
    default: [],
    type: 'metaData',
  },
  shippingAddress: {
    label: 'Shipping Address',
    default: '',
    type: 'metaData',
  },
  shippingTerms: {
    label: 'Shipping Terms',
    default: '',
    type: 'metaData',
  },
  poNumber: {
    label: 'PO Number',
    default: '',
    type: 'metaData',
  },
  startDate: {
    label: 'Start Date',
    default: '',
    type: 'metaData',
  },
  endDate: { label: 'End Date', default: '', isRequired: false, type: 'metaData' },
  wastepickerSellPrice: {
    label: 'Wastepicker Sell Price',
    default: '',
    type: 'costModel',
  },
  primarySegregatorSellPrice: { default: '', isRequired: false, type: 'costModel' },
  wholesalerSellPrice: {
    label: 'Wholesaler Sell Price',
    default: '',
    type: 'costModel',
  },
  priceBuoyancy: {
    label: 'Price Buoyancy',
    default: '',
    type: 'costModel',
  },
  wholesalerShippingPrice: {
    label: 'Wholesaler Shipping Price',
    default: '',
    type: 'costModel',
  },
  wholesalerDeliveredPrice: {
    label: 'Wholesaler Delivery Price',
    default: '',
    type: 'costModel',
  },
};

export const fieldKeys = Object.keys(fieldsInfo).map(fieldName => fieldName);
