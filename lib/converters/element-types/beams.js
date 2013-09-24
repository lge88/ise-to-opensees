
module.exports = exports = [
  {
    type: 'elasticBeamColumn',
    schema: [
      { selector: 'A' },
      { selector: 'E' },
      { optional: true, selector: 'G' },
      { optional: true, selector: 'J' },
      { optional: true, selector: 'Iy' },
      { selector: 'Iz' },
      { selector: 'transform_id' },
      { optional: true, prefix: '-mass', selector: 'massDensity' }
    ]
  },
  {
    type: 'nonlinearBeamColumn',
    schema: [
      { selector: 'numOfIntegrationPoints' },
      { selector: 'section_id' },
      { selector: 'transform_id' },
      { optional: true, prefix: '-mass', selector: 'massDensity' },
      { optional: true, prefix: '-iter', selector: [ 'maxIteration', 'tolerance' ] },
      { optional: true, prefix: '-integration', selector: 'integrationType' }
    ]
  },
  {
    type: 'forceBeamColumn',
    schema: [
      { selector: 'numOfIntegrationPoints' },
      { selector: 'section_id' },
      { selector: 'transform_id' },
      { optional: true, prefix: '-mass', selector: 'massDensity' },
      { optional: true, prefix: '-iter', selector: [ 'maxIteration', 'tolerance' ] },
      { optional: true, prefix: '-integration', selector: 'integrationType' }
    ]
  },
  {
    type: 'dispBeamColumn',
    schema: [
      { selector: 'numOfIntegrationPoints' },
      { selector: 'section_id' },
      { selector: 'transform_id' },
      { optional: true, prefix: '-mass', selector: 'massDensity' },
      { optional: true, prefix: '-sections', selector: 'sections' },
      { optional: true, prefix: '-integration', selector: 'integrationType' }
    ]
  }
];
