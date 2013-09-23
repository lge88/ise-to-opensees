
var toOpenSeesList = require( 'ise-to-opensees' ).toOpenSeesList;
var expect = require( 'expect.js' );

describe( 'basic truss example', function() {

  it( 'should generate correct domain tcl script', function() {

    var basicTrussExample = {

      model_builder: { type: 'BasicBuilder', ndm: 2, ndf: 2 },
      materials: [
        { id: 1, type: 'uniaxial.Elastic', E: 3000 },
      ],
      time_series: [
        { id: 1, type: 'Linear' }
      ],
      nodes: [
        { id: 1, position:{ x:   0, y:  0 } },
        { id: 2, position:{ x: 144, y:  0 } },
        { id: 3, position:{ x: 168, y:  0 } },
        { id: 4, position:{ x:  72, y: 96 } }
      ],
      elements: [
        { id: 1, type: 'Truss', node_id: [ 1, 4 ], A: 10, material_id: 1 },
        { id: 2, type: 'Truss', node_id: [ 2, 4 ], A:  5, material_id: 1 },
        { id: 3, type: 'Truss', node_id: [ 3, 4 ], A:  5, material_id: 1 }
      ],
      single_point_constraints: [
        { id: 1, node_id: 1, is_prescribed: [ 1, 1 ] },
        { id: 2, node_id: 2, is_prescribed: [ 1, 1 ] },
        { id: 3, node_id: 3, is_prescribed: [ 1, 1 ] }
      ],
      loads: [
        { id: 1, node_id: 4, type: 'NodalForce', value: [ 100, -50 ] }
      ],
      patterns: [
        { id: 1, type: 'Plain', time_series_id: 1, load_id: [ 1 ] }
      ]
    };

    var basicTrussExampleTclList = [
      'model BasicBuilder -ndm 2 -ndf 2',
      'timeSeries Linear 1',
      'uniaxialMaterial Elastic 1 3000',
      'node 1 0 0',
      'node 2 144 0',
      'node 3 168 0',
      'node 4 72 96',
      'fix 1 1 1',
      'fix 2 1 1',
      'fix 3 1 1',
      'element Truss 1 1 4 10 1',
      'element Truss 2 2 4 5 1',
      'element Truss 3 3 4 5 1',
      // 'pattern Plain 1 1 {',
      // '  load 4 100 -50',
      // '}'
    ];

    var generated = toOpenSeesList( basicTrussExample );
    console.log( generated );
    expect( generated ).to.eql( basicTrussExampleTclList );
  } );

} );
