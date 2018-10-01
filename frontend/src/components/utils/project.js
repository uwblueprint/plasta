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
