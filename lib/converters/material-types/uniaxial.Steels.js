
module.exports = exports = [
  {
    type: 'uniaxial.Steel01',
    schema: [
      { selector: 'Fy' },
      { selector: 'E0' },
      { selector: 'b' },
      { optional: true, selector: 'a1' },
      { optional: true, selector: 'a2' },
      { optional: true, selector: 'a3' },
      { optional: true, selector: 'a4' }
    ]
  },
  {
    type: 'uniaxial.Steel02',
    schema: [
      { selector: 'Fy' },
      { selector: 'E0' },
      { selector: 'b' },
      { selector: 'R0' },
      { selector: 'cR1' },
      { selector: 'cR2' },
      { optional: true, selector: 'a1' },
      { optional: true, selector: 'a2' },
      { optional: true, selector: 'a3' },
      { optional: true, selector: 'a4' },
      { optional: true, selector: 'sigInit' }
    ]
  }
]
