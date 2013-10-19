
module.exports = exports = [
  {
    type: 'tri31',
    schema: [
      { selector: 'thick' },
      { selector: 'subType' },
      { selector: 'material_id' },
      { optional: true, selector: 'pressure' },
      { optional: true, selector: 'rho' },
      { optional: true, selector: 'b1' },
      { optional: true, selector: 'b2' }
    ]
  }
];
