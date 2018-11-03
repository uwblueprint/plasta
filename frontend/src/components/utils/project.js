import { Map } from 'immutable';

export const plasticOptions = [
  {
    value: 'green_pet',
    label: 'Green PET',
  },
  {
    value: 'pet_light_blue',
    label: 'Light Blue PET',
  },
  {
    value: 'brown_pet',
    label: 'Brown PET',
  },
  {
    value: 'pet_non_food_clear',
    label: 'Non-food Clear PET',
  },
  {
    value: 'pet_clear',
    label: 'Clear PET',
  },
];

export const plasticOptionsByName = Map(plasticOptions.map(option => [option.value, option]));

export const getTotalPlasticsPrice = transaction => {
  return transaction.plastics.map(plastic => plastic.price).reduce((a, b) => a + b, 0);
};

export const getTotalPlasticsQuantity = transaction => {
  return transaction.plastics.map(plastic => plastic.quantity).reduce((a, b) => a + b, 0);
};

export const fieldToLabelMap = {
  projectName: 'Project name',
  dwccSelected: 'DWCC',
  wholesalerSelected: 'Wholesaler',
};
