const DWCCData = [
  { name: 'DWCC1', projects: ['Project A', 'Project B'] },
  { name: 'DWCC2', projects: ['Project B', 'Project C', 'Project D'] },
];

const WholesalerData = [
  { name: 'Wholesaler1', projects: ['Project L', 'Project N'] },
  { name: 'Wholesaler2', projects: ['Project D', 'Project E', 'Project G'] },
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
