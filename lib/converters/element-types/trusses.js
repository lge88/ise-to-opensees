
module.exports = exports = [
  {
    type: 'truss',
    schema: [
      { selector: 'A' },
      { selector: 'material_id' },
      { optional: true, prefix: '-rho', selector: 'rho' },
      { optional: true, prefix: '-doRayleigh', selector: 'doRayleigh' }
    ]
  },
  {
    type: 'trussSection',
    schema: [
      { selector: 'section_id' },
      { optional: true, prefix: '-rho', selector: 'rho' },
      { optional: true, prefix: '-doRayleigh', selector: 'doRayleigh' }
    ]
  }
];
