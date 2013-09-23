
exports.order = 1;
exports.selector = 'nodes';

exports.schema = [
  { value: 'node' },
  { selector: 'id' },
  { selector: 'position.x' },
  { selector: 'position.y' },
  { optional: true, selector: 'position.z' },
  { optional: true, selector: [
    'mass.x',
    'mass.y',
    'mass.z'
  ], prefix: '-mass' }
];
