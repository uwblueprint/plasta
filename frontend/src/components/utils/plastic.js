import { Map } from 'immutable';
import bottleImage from '../../assets/bottle.png';
import { TRANSACTION_TYPES } from './transactions';

// Deprecated options kept at the moment to maintain existing transactions
export const plasticOptions = [
  {
    value: 'green_pet', // deprecated option
    label: 'Green PET',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'blue_pet', // deprecated option
    label: 'Blue PET',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'brown_pet', // deprecated option
    label: 'Brown PET',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'non_food_clear_pet', // deprecated option
    label: 'Non-Food Clear PET',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'clear_pet', // deprecated option
    label: 'Clear PET',
    imageLink: bottleImage,
    buy: true,
    sell: false,
  },
  {
    value: 'mlp', // deprecated option
    label: 'MLP',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'clear_film', // deprecated option
    label: 'Clear Film',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'mixed_colour_film', // deprecated option
    label: 'Mixed Colour Film',
    imageLink: bottleImage,
    buy: false,
    sell: false,
  },
  {
    value: 'pp',
    label: 'PP',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'unlabelled_pp',
    label: 'PP - Unlabelled',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'natural_pp',
    label: 'Natural PP',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'white_pp',
    label: 'White PP',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'foodgrade_pp',
    label: 'PP - Foodgrade',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'other_pp',
    label: 'Other PP',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'natural_hdpe',
    label: 'Natural HDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'white_hdpe',
    label: 'White HDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'black_hdpe',
    label: 'Black HDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'blue_hdpe',
    label: 'Blue HDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'unlabelled_hdpe',
    label: 'HDPE Unlabelled',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'labelled_hdpe',
    label: 'HDPE Labelled',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'mixed_colour_hdpe',
    label: 'Mixed Colour HDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'ld_mix',
    label: 'LD Mix',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'hip',
    label: 'HIP',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'abs',
    label: 'ABS',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'mixed_pet',
    label: 'Mixed PET',
    imageLink: bottleImage,
    buy: true,
    sell: true,
  },
  {
    value: 'ldpe',
    label: 'LDPE',
    imageLink: bottleImage,
    buy: false,
    sell: true,
  },
  {
    value: 'pugga',
    label: 'Pugga',
    imageLink: bottleImage,
    buy: true,
    sell: true,
  },
  {
    value: 'kadak',
    label: 'Kadak',
    imageLink: bottleImage,
    buy: true,
    sell: true,
  },
  {
    value: 'mixed_plastic_waste',
    label: 'Mixed Plastic Waste',
    imageLink: bottleImage,
    buy: true,
    sell: false,
  },
  {
    value: 'films',
    label: 'Films',
    imageLink: bottleImage,
    buy: true,
    sell: false,
  },
];

export function getPlasticTypesByTransactionType(transactionType) {
  if (transactionType === TRANSACTION_TYPES.BUY) {
    return plasticOptions.filter(option => option.buy);
  } else {
    return plasticOptions.filter(option => option.sell);
  }
}

export const plasticOptionsByName = Map(plasticOptions.map(option => [option.value, option]));

export const getTotalPlasticsPrice = transaction => {
  return transaction.plastics.map(plastic => plastic.price).reduce((a, b) => a + b, 0);
};

export const getTotalPlasticsQuantity = transaction => {
  return transaction.plastics.map(plastic => plastic.quantity).reduce((a, b) => a + b, 0);
};
