import { Map } from 'immutable';
import bottleImage from '../../assets/bottle.png';

export const plasticOptions = [
  {
    value: 'green_pet',
    label: 'Green PET',
    imageLink: bottleImage,
  },
  {
    value: 'blue_pet',
    label: 'Blue PET',
    imageLink: bottleImage,
  },
  {
    value: 'brown_pet',
    label: 'Brown PET',
    imageLink: bottleImage,
  },
  {
    value: 'non_food_clear_pet',
    label: 'Non-Food Clear PET',
    imageLink: bottleImage,
  },
  {
    value: 'clear_pet',
    label: 'Clear PET',
    imageLink: bottleImage,
  },
  {
    value: 'mlp',
    label: 'MLP',
    imageLink: bottleImage,
  },
  {
    value: 'clear_film',
    label: 'Clear Film',
    imageLink: bottleImage,
  },
  {
    value: 'mixed_colour_film',
    label: 'Mixed Colour Film',
    imageLink: bottleImage,
  },
  {
    value: 'natural_pp',
    label: 'Natural PP',
    imageLink: bottleImage,
  },
  {
    value: 'white_pp',
    label: 'White PP',
    imageLink: bottleImage,
  },
  {
    value: 'unlabelled_pp',
    label: 'Unlabelled PP',
    imageLink: bottleImage,
  },
  {
    value: 'labelled_pp',
    label: 'Labelled PP',
    imageLink: bottleImage,
  },
  {
    value: 'foodgrade_pp',
    label: 'Foodgrade PP',
    imageLink: bottleImage,
  },
  {
    value: 'other_pp',
    label: 'Other PP',
    imageLink: bottleImage,
  },
  {
    value: 'natural_hdpe',
    label: 'Natural HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'white_hdpe',
    label: 'White HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'black_hdpe',
    label: 'Black HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'blue_hdpe',
    label: 'Blue HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'unlabelled_hdpe',
    label: 'Unlabelled HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'labelled_hdpe',
    label: 'Labelled HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'mixed_colour_hdpe',
    label: 'Mixed Colour HDPE',
    imageLink: bottleImage,
  },
  {
    value: 'ld_mix',
    label: 'LD Mix',
    imageLink: bottleImage,
  },
  {
    value: 'hip',
    label: 'HIP',
    imageLink: bottleImage,
  },
  {
    value: 'abs',
    label: 'ABS',
    imageLink: bottleImage,
  },
];

export const plasticOptionsByName = Map(plasticOptions.map(option => [option.value, option]));

export const getTotalPlasticsPrice = transaction => {
  return transaction.plastics.map(plastic => plastic.price).reduce((a, b) => a + b, 0);
};

export const getTotalPlasticsQuantity = transaction => {
  return transaction.plastics.map(plastic => plastic.quantity).reduce((a, b) => a + b, 0);
};
