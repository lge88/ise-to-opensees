
exports.selector = 'transforms';

exports.schema = [
  { value: 'geomTransf' },
  { selector: 'type' },
  { selector: 'id' },
  { optional: true, selector: 'vector_parallel_to_local_xz.x' },
  { optional: true, selector: 'vector_parallel_to_local_xz.y' },
  { optional: true, selector: 'vector_parallel_to_local_xz.z' },
  { optional: true, selector: [
    'joint_offset.i.x',
    'joint_offset.i.y',
    'joint_offset.i.z',
    'joint_offset.j.x',
    'joint_offset.j.y',
    'joint_offset.j.z',
  ], prefix: '-jntOffset' }
];
