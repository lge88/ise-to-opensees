
module.exports = exports = [
  {
    type: 'quad',
    schema: [
      { selector: 'thick' },
      { selector: 'subType' },
      { selector: 'material_id' },
      { optional: true, selector: 'pressure' },
      { optional: true, selector: 'rho' },
      { optional: true, selector: 'b1' },
      { optional: true, selector: 'b2' }
    ]
  },
  {
    type: 'ShellMITC4',
    schema: [
      { selector: 'section_id' }
    ]
  }
];
