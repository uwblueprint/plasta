import { Map } from 'immutable';

export const plasticOptions = [
  {
    value: 'mixed_pet',
    label: 'Mixed PET',
  },
];

export const plasticOptionsByName = Map(plasticOptions.map(option => [option.value, option]));
