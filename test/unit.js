
var toOpenSeesList = require( 'ise-to-opensees' ).toOpenSeesList;
var expect = require( 'expect.js' );

describe( 'Unit test', function() {

  function runTest( key, data ) {
    data
      .forEach( function( item ) {
        var json = {};
        json[key] = [ item[0] ];
        var list = item[ 1 ];
        expect( toOpenSeesList( json ) ).to.eql( list );
      } );
  }

  it( '#model_builder', function() {
    var j1 = { model_builder: { type: 'BasicBuilder', ndm: 2, ndf: 2 } };
    var l1 = [ 'model BasicBuilder -ndm 2 -ndf 2' ];
    expect( toOpenSeesList( j1 ) ).to.eql( l1 );
  } );

  it( '#nodes', function() {

    runTest( 'nodes', [
      [
        { id: 1, position:{ x: 0, y: 0 } },
        [ 'node 1 0 0' ]
      ],
      [
        { id: 2, position:{ x: 144, y: 0 } },
        [ 'node 2 144 0' ]
      ],
      [
        { id: 3, position:{ x: 144, y: 0, z: 300 } },
        [ 'node 3 144 0 300' ]
      ],
      [
        { id: 4, position:{ x: 168, y: 0 }, mass: { x: 0.2, y: 0.3, z: 0.4 } },
        [ 'node 4 168 0 -mass 0.2 0.3 0.4' ]
      ]
    ] );

  } );

  it( '#materials', function() {

    runTest( 'materials', [
      [
        { id: 1, type: 'uniaxial.Elastic', E: 3000 },
        [ 'uniaxialMaterial Elastic 1 3000' ]
      ],
      [
        { id: 2, type: 'nD.ElasticIsotropic', E: 3000, v: 0.3 },
        [ 'nDMaterial ElasticIsotropic 2 3000 0.3' ]
      ],
      [
        { id: 3, type: 'nD.ElasticIsotropic', E: 3000, v: 0.3, rho: 0.23 },
        [ 'nDMaterial ElasticIsotropic 3 3000 0.3 0.23' ]
      ]
    ] );

  } );

  it( '#time_series', function() {
    runTest( 'time_series', [
      [
        { id: 1, type: 'Linear' },
        ['timeSeries Linear 1']
      ]
    ] );
  } );

  it( '#elements', function() {
    runTest( 'elements', [
      [
        { id: 1, type: 'Truss', node_id: [ 2, 3 ], A: 20, material_id: 1 },
        [ 'element Truss 1 2 3 20 1' ]
      ]
    ] );

  } );

  it( '#single_point_constraints', function() {
    runTest( 'single_point_constraints', [
      [
        { id: 1, node_id: 1, is_prescribed: [ 1, 1 ] },
        [ 'fix 1 1 1' ]
      ],
      [
        { id: 2, node_id: 1, is_prescribed: [ 1, 1, 0 ] },
        [ 'fix 1 1 1 0' ]
      ],
      [
        { id: 3, node_id: 1, is_prescribed: [ 1, 1, 0, 0, 1, 0 ] },
        [ 'fix 1 1 1 0 0 1 0' ]
      ]
    ] );
  } );

  it( '#transforms', function() {
    runTest( 'transforms', [
      [
        { id: 1, type: 'Linear' },
        [ 'geomTransf Linear 1' ]
      ],
      [
        { id: 1, type: 'PDelta' },
        [ 'geomTransf PDelta 1' ]
      ],
      [
        { id: 1, type: 'Linear', vector_parallel_to_local_xz: {
          x: 1, y: 0, z: 0
        }  },
        [ 'geomTransf Linear 1 1 0 0' ]
      ],
      [
        { id: 1, type: 'Linear', joint_offset: {
          i: { x: 0.5, y: 0.5 },
          j: { x: 0, y: 0 }
        }  },
        [ 'geomTransf Linear 1 -jntOffset 0.5 0.5 0 0' ]
      ],
      [
        { id: 1, type: 'Linear', joint_offset: {
          i: { x: 0.5, y: 0.5, z: 0.2 },
          j: { x: 0, y: 0, z: 1 }
        }  },
        [ 'geomTransf Linear 1 -jntOffset 0.5 0.5 0.2 0 0 1' ]
      ]
    ] );
  } );

  it( '#patterns', function() {
    var j1 = {
      loads: [
        { id: 1, node_id: 4, type: 'NodalForce', value: [ 100, -50 ] }
      ],
      patterns: [
        { id: 1, type: 'Plain', time_series_id: 1, load_id: [ 1 ] }
      ]
    };
    var l1 = [ 'pattern Plain 1 1 {\nload 4 100 -50\n}' ];
    expect( toOpenSeesList( j1 ) ).to.eql( l1 );
  } );

} );
