import { Map, List } from 'immutable';

export const fieldsInfo = {
  projectName: { key: 'projectName', label: 'Project Name', default: '', isRequired: true },
  projectType: {
    label: 'Project Type',
    default: 'external',
    isRequired: false,
  },
  plastics: { key: 'plastics', label: 'Plastic Types', default: List(), isRequired: false },
  description: {
    label: 'Description',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  brandName: {
    label: 'Brand Name',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  gdriveLink: {
    label: 'Google Drive Link',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  wholesalers: {
    label: 'Wholesaler(s)',
    default: [],
    isRequired: true,
    type: 'metaData',
  },
  shippingAddress: {
    label: 'Shipping Address',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  shippingTerms: {
    label: 'Shipping Terms',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  poNumber: {
    label: 'PO Number',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  startDate: {
    label: 'Start Date',
    default: '',
    isRequired: false,
    type: 'metaData',
  },
  endDate: { label: 'End Date', default: '', isRequired: false, type: 'metaData' },
  wastepickerSellPrice: {
    label: 'Wastepicker Sell Price',
    default: '',
    isRequired: false,
    type: 'costModel',
  },
  dwccSellPrice: { default: '', isRequired: false, type: 'costModel' },
  wholesalerSellPrice: {
    label: 'Wholesaler Sell Price',
    default: '',
    isRequired: false,
    type: 'costModel',
  },
  priceBuoyancy: {
    label: 'Price Buoyancy',
    default: '',
    isRequired: false,
    type: 'costModel',
  },
  wholesalerShippingPrice: {
    label: 'Wholesaler Shipping Price',
    default: '',
    isRequired: false,
    type: 'costModel',
  },
  wholesalerDeliveredPrice: {
    label: 'Wholesaler Delivery Price',
    default: '',
    isRequired: false,
    type: 'costModel',
  },
};

export const plasticOptions = [
  {
    value: 'green_pet',
    label: 'Green PET',
  },
  {
    value: 'blue_pet',
    label: 'Blue PET',
  },
  {
    value: 'brown_pet',
    label: 'Brown PET',
  },
  {
    value: 'non_food_clear_pet',
    label: 'Non-Food Clear PET',
  },
  {
    value: 'clear_pet',
    label: 'Clear PET',
  },
  {
    value: 'mlp',
    label: 'MLP',
  },
  {
    value: 'clear_film',
    label: 'Clear Film',
  },
  {
    value: 'mixed_colour_film',
    label: 'Mixed Colour Film',
  },
  {
    value: 'natural_pp',
    label: 'Natural PP',
  },
  {
    value: 'white_pp',
    label: 'White PP',
  },
  {
    value: 'unlabelled_pp',
    label: 'Unlabelled PP',
  },
  {
    value: 'labelled_pp',
    label: 'Labelled PP',
  },
  {
    value: 'foodgrade_pp',
    label: 'Foodgrade PP',
  },
  {
    value: 'other_pp',
    label: 'Other PP',
  },
  {
    value: 'natural_hdpe',
    label: 'Natural HDPE',
  },
  {
    value: 'white_hdpe',
    label: 'White HDPE',
  },
  {
    value: 'black_hdpe',
    label: 'Black HDPE',
  },
  {
    value: 'blue_hdpe',
    label: 'Blue HDPE',
  },
  {
    value: 'unlabelled_hdpe',
    label: 'Unlabelled HDPE',
  },
  {
    value: 'labelled_hdpe',
    label: 'Labelled HDPE',
  },
  {
    value: 'mixed_colour_hdpe',
    label: 'Mixed Colour HDPE',
  },
  {
    value: 'ld_mix',
    label: 'LD Mix',
  },
  {
    value: 'hip',
    label: 'HIP',
  },
  {
    value: 'abs',
    label: 'ABS',
  },
];

export const plasticOptionsByName = Map(plasticOptions.map(option => [option.value, option]));

export const getTotalPlasticsPrice = transaction => {
  return transaction.plastics.map(plastic => plastic.price).reduce((a, b) => a + b, 0);
};

export const getTotalPlasticsQuantity = transaction => {
  return transaction.plastics.map(plastic => plastic.quantity).reduce((a, b) => a + b, 0);
};
