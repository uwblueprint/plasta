const DWCCData = [
  {
    name: 'DWCC1',
    projects: [{ name: 'Project A', id: 109 }, { name: 'Project D', id: 108 }],
    id: 125,
  },
  {
    name: 'DWCC2',
    projects: [
      { name: 'Project E', id: 100 },
      { name: 'Project F', id: 100 },
      { name: 'Project G', id: 100 },
    ],
    id: 134,
  },
];

const WholesalerData = [
  {
    name: 'Wholesaler1',
    projects: [{ name: 'Project L', id: 104 }, { name: 'Project D', id: 105 }],
    id: 123,
  },
  {
    name: 'Wholesaler2',
    projects: [
      { name: 'Project D', id: 100 },
      { name: 'Project G', id: 101 },
      { name: 'Project H', id: 102 },
    ],
    id: 143,
  },
];

const ProjectData = [{ label: 'Project A', value: 'pa' }, { label: 'Project B', value: 'pb' }];

const fakeData = [
  {
    to: 'Gautaum',
    from: 'Xin Hao',
    rs: 500,
    kg: 30,
    type: 'Green PET',
    date: 'May 2018',
  },
  {
    to: 'Clayton',
    from: 'Nick',
    rs: 1000,
    kg: 123,
    type: 'Brown PET',
    date: 'February 2017',
  },
  {
    to: 'Joslyn',
    from: 'Ahmed',
    rs: 5033,
    kg: 123,
    type: 'Mixed PET',
    date: 'January 2019',
  },
];

export { fakeData, DWCCData, WholesalerData, ProjectData };
