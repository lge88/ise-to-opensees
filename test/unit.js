
var expect = require( 'expect.js' );

describe( 'Unit test', function() {

  var toOpenSees = require( 'ise-to-opensees' );
  var domainToOpenSees = function( json ) {
    return toOpenSees( json, {
      filter: function( x ) { return x !== 'analysis'; }
    } );
  };

  var analysisToOpenSees = function( json ) {
    return toOpenSees( json, {
      filter: function( x ) { return x === 'analysis'; }
    } );
  };

  function runTest( key, data ) {
    data
      .forEach( function( item ) {
        var json = {};
        json[key] = [ item[0] ];
        var list = item[ 1 ];
        expect( domainToOpenSees( json ) ).to.eql( list );
      } );
  }

  it( '#model_builder', function() {
    var j1 = { model_builder: { type: 'BasicBuilder', ndm: 2, ndf: 2 } };
    var l1 = [ 'model BasicBuilder -ndm 2 -ndf 2' ];
    expect( domainToOpenSees( j1 ) ).to.eql( l1 );
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

  it( '#sections', function() {

    runTest( 'sections', [
      [
        { id: 1, type: 'Elastic', E: 3000, A: 10, Iz: 200  },
        [ 'section Elastic 1 3000 10 200' ]
      ],
      [
        { id: 1, type: 'Elastic', E: 1, A: 2, Iz: 3, Iy: 4, G: 5, J: 6, alphaY: 7, alphaZ: 8 },
        [ 'section Elastic 1 1 2 3 4 5 6 7 8' ]
      ],
      [
        {
          id: 1, type: 'Fiber',
          fibers: [
            { material_id: 1, A: 10, location:{ y: 0.3, z: 0.4 } },
            { material_id: 1, A: 10, location:{ y: -0.3, z: -0.4 } }
          ],
          patches: [
            {
              type: 'quad', material_id: 1,
              numSubdivIJ: 3, numSubdivJK: 4,
              I: { y: 0, z: 0 }, J: { y: 10, z: 0 },
              K: { y: 10, z: 10 }, L: { y: 0, z: 10 }
            },
            {
              type: 'rect', material_id: 1,
              numSubdivY: 3, numSubdivZ: 4,
              I: { y: 0, z: 0 },
              J: { y: 10, z: 10 }
            },
            {
              type: 'circ', material_id: 1,
              numSubdivCirc: 3, numSubdivRad: 4,
              center: { y: 0, z: 0 },
              internalRadius: 10,
              externalRadius: 20,
              startAngle: 0,
              endAngle: 270
            }
          ],
          layers: [
            {
              type: 'straight', material_id: 1,
              numOfFibers: 3, areaOfFibers: 4,
              start: { y: 0, z: 0 },
              end: { y: 10, z: 20 }
            },
            {
              type: 'circ', material_id: 1,
              numOfFibers: 3, areaOfFibers: 4,
              center: { y: 0, z: 0 },
              radius: 20,
              startAngle: 0,
              endAngle: 270
            }
          ]
        },
        [
          [
            'section Fiber 1 {',
            'fiber 0.3 0.4 10 1',
            'fiber -0.3 -0.4 10 1',
            'patch quad 1 3 4 0 0 10 0 10 10 0 10',
            'patch rect 1 3 4 0 0 10 10',
            'patch circ 1 3 4 0 0 10 20 0 270',
            'layer straight 1 3 4 0 0 10 20',
            'layer circ 1 3 4 0 0 20 0 270',
            '}'
          ].join( '\n' )
        ]
      ],
      [
        {
          id: 7, type: 'Aggregator',
          P: 1, Mz: 3, section_id: 5, T:2
        },
        [ 'section Aggregator 7 1 P 3 Mz 2 T -section 5' ]
      ]
    ] );

  } );

  it( '#time_series', function() {
    runTest( 'time_series', [
      [
        { id: 1, type: 'Linear', factor: 0.3 },
        ['timeSeries Linear 1 -factor 0.3']
      ],
      [
        { id: 1, type: 'Trig', start: 1, end: 10, period: 2, shift: 0.2 },
        ['timeSeries Trig 1 1 10 2 -shift 0.2']
      ],
      [
        { id: 1, type: 'Triangle', start: 1, end: 10, period: 2, shift: 0.2 },
        ['timeSeries Triangle 1 1 10 2 -shift 0.2']
      ],
      [
        { id: 1, type: 'Rectangular', start: 3, end: 7 },
        ['timeSeries Rectangular 1 3 7']
      ],
      [
        { id: 1, type: 'Pulse', start: 3, end: 7, width: 0.8, period: 3, shift: 2 },
        ['timeSeries Pulse 1 3 7 3 -width 0.8 -shift 2']
      ],
      [
        { id: 1, type: 'Path', dt: 0.02, values: [ 1, 2, 3, 4, 5, 6 ] },
        ['timeSeries Path 1 -dt 0.02 -values { 1 2 3 4 5 6 }']
      ],
      [
        { id: 1, type: 'Path', time: [ 0, 0.02, 0.04 ], values: [ 1, 2, 3 ] },
        ['timeSeries Path 1 -time { 0 0.02 0.04 } -values { 1 2 3 }']
      ],
      [
        { id: 1, type: 'Path', fileTime: 'data/time.txt', filePath: 'data/gmotion.txt' },
        ['timeSeries Path 1 -fileTime data/time.txt -filePath data/gmotion.txt']
      ]
    ] );
  } );

  it( '#elements', function() {
    runTest( 'elements', [
      [
        { id: 1, type: 'truss', nodes_id: [ 2, 3 ], A: 20, material_id: 1 },
        [ 'element truss 1 2 3 20 1' ]
      ],
      [
        {
          id: 1, type: 'trussSection', nodes_id: [ 2, 3 ],
          section_id: 4, rho: 0.5, doRayleigh: 1
        },
        [ 'element trussSection 1 2 3 4 -rho 0.5 -doRayleigh 1' ]
      ],
      [
        {
          id: 1, type: 'elasticBeamColumn', nodes_id: [ 2, 3 ],
          A: 1, E: 2, G: 3, J: 4,
          Iy: 5, Iz: 6, transform_id: 7,
          massDensity: 0.234
        },
        [ 'element elasticBeamColumn 1 2 3 1 2 3 4 5 6 7 -mass 0.234' ]
      ],
      [
        {
          id: 101, type: 'nonlinearBeamColumn', nodes_id: [ 4, 5 ],
          numOfIntegrationPoints: 3, section_id: 5001,
          transform_id: 1
        },
        [ 'element nonlinearBeamColumn 101 4 5 3 5001 1']
      ],
      [
        {
          id: 101, type: 'dispBeamColumn', nodes_id: [ 4, 5 ],
          numOfIntegrationPoints: 3, section_id: 5001,
          transform_id: 1
        },
        [ 'element dispBeamColumn 101 4 5 3 5001 1']
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
        { id: 1, node_id: 4, type: 'NodalForce', value: [ 100, -50 ] },
        { id: 2, node_id: 3, type: 'NodalDisplacement', value: [ 100, 20, -50 ] },
        { id: 3, element_id: 3, type: 'BeamUniform', Wy: 2, Wz: 2 },
        { id: 4, element_id: [ 2, 4, 5 ], type: 'BeamPoint', Py: 2, xL: 0.2 },
        { id: 5, element_id: [ 4, 5 ], type: 'BeamPoint', Py: 2, Pz: 3, xL: 0.2 }
      ],
      patterns: [
        { id: 1, type: 'Plain', time_series_id: 1, load_id: [ 1, 2, 3, 4, 5 ] },
        { id: 2, type: 'Plain', time_series_id: 1, load_id: [ 2, 3 ] },
        { id: 3, type: 'UniformExcitation', time_series_id: 1, direction: 1, initialVelocity: 0.3 }
      ]
    };
    var l1 = [
      [
        'pattern Plain 1 1 {',
        'load 4 100 -50',
        'sp 3 100 20 -50',
        'eleLoad -ele 3 -type -beamUniform 2 2',
        'eleLoad -ele 2 4 5 -type -beamPoint 2 0.2',
        'eleLoad -ele 4 5 -type -beamPoint 2 3 0.2',
        '}'
      ].join( '\n' ),
      [
        'pattern Plain 2 1 {',
        'sp 3 100 20 -50',
        'eleLoad -ele 3 -type -beamUniform 2 2',
        '}'
      ].join( '\n' ),
      'pattern UniformExcitation 3 1 -accel 1 -vel 0.3'
    ];
    // console.log( toOpenSees( j1 ) );
    // console.log( l1.join( '\n' ) );

    expect( domainToOpenSees( j1 ) ).to.eql( l1 );
  } );

  it( '#analysis.analysis', function() {
    var j1 = { analysis: {
      analysis: { type: 'Static' }
    } };
    var j2 = { analysis: {
      analysis: { type: 'Transient' }
    } };
    var l1 = [ 'analysis Static' ];
    var l2 = [ 'analysis Transient' ];
    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );
  } );

  it( '#analysis.constaints', function() {
    var j1 = { analysis: {
      constraints: { type: 'Plain' }
    } };
    var j2 = { analysis: {
      constraints: {
        type: 'Lagrange',
        alphaS: 0.4,
        alphaM: 0.6
      }
    } };
    var l1 = [ 'constraints Plain' ];
    var l2 = [ 'constraints Lagrange 0.4 0.6' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );
  } );

  it( '#analysis.numberer', function() {
    var j1 = { analysis: {
      numberer: { type: 'Plain' }
    } };
    var j2 = { analysis: {
      numberer: { type: 'RCM' }
    } };
    var j3 = { analysis: {
      numberer: { type: 'AMD' }
    } };
    var l1 = [ 'numberer Plain' ];
    var l2 = [ 'numberer RCM' ];
    var l3 = [ 'numberer AMD' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );
    expect( analysisToOpenSees( j3 ) ).to.eql( l3 );
  } );

  it( '#analysis.system', function() {
    var j1 = { analysis: {
      system: { type: 'BandSPD' }
    } };
    var j2 = { analysis: {
      system: { type: 'UmfPack', lvalue: 20 }
    } };

    var l1 = [ 'system BandSPD' ];
    var l2 = [ 'system UmfPack -lvalueFact 20' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );

  } );

  it( '#analysis.test', function() {
    var j1 = { analysis: {
      test: { type: 'NormUnbalance', tolerance: 0.1, maxIteration:200, printFlag: 1, normType:2 }
    } };
    var j2 = { analysis: {
      test: { type: 'FixedNumber', numOfIteration: 20, printFlag: 1, normType: 2 }
    } };

    var l1 = [ 'test NormUnbalance 0.1 200 1 2' ];
    var l2 = [ 'test FixedNumber 20 1 2' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );

  } );


  it( '#analysis.algorithm', function() {
    var j1 = { analysis: {
      algorithm: { type: 'Linear', useInitialStiffness: true }
    } };
    var j2 = { analysis: {
      algorithm: { type: 'Linear', useSecantStiffness: true }
    } };
    var j3 = { analysis: {
      algorithm: { type: 'Newton', useInitialThenCurrentStiffness: true }
    } };
    var j4 = { analysis: {
      algorithm: {
        type: 'KrylovNewton',
        tangentToIterate: 'current',
        tangentToIncrement: 'current',
        maxDim: 200
      }
    } };
    var j5 = { analysis: {
      algorithm: { type: 'BFGS' }
    } };

    var l1 = [ 'algorithm Linear -initial' ];
    var l2 = [ 'algorithm Linear -secant' ];
    var l3 = [ 'algorithm Newton -initialThenCurrent' ];
    var l4 = [ 'algorithm KrylovNewton -iterate current -increment current -maxDim 200' ];
    var l5 = [ 'algorithm BFGS' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );
    expect( analysisToOpenSees( j3 ) ).to.eql( l3 );
    expect( analysisToOpenSees( j4 ) ).to.eql( l4 );
    expect( analysisToOpenSees( j5 ) ).to.eql( l5 );
  } );

  it( '#analysis.integrator', function() {
    var j1 = { analysis: {
      integrator: { type: 'LoadControl', lambda: 0.1 }
    } };
    var j2 = { analysis: {
      integrator: { type: 'DisplacementControl', node_id: 2, dof: 2, increment: 0.1 }
    } };
    var j3 = { analysis: {
      integrator: { type: 'MinUnbalDispNorm', loadIncrement: 0.1 }
    } };
    var j4 = { analysis: {
      integrator: { type: 'ArcLength', arcLength: 1, alpha:0.1 }
    } };
    var j5 = { analysis: {
      integrator: { type: 'CentralDifference' }
    } };
    var j6 = { analysis: {
      integrator: { type: 'Newmark', gamma: 0.5, beta: 0.25 }
    } };
    var j7 = { analysis: {
      integrator: { type: 'HHT', alpha: 0.5, gamma: 0.5, beta: 0.25 }
    } };
    var j8 = { analysis: {
      integrator: { type: 'GeneralizedAlpha', alphaM: 1, alphaF: 0.8, gamma: 0.5, beta: 0.25 }
    } };
    var j9 = { analysis: {
      integrator: { type: 'TRBDF2' }
    } };

    var l1 = [ 'integrator LoadControl 0.1' ];
    var l2 = [ 'integrator DisplacementControl 2 2 0.1' ];
    var l3 = [ 'integrator MinUnbalDispNorm 0.1' ];
    var l4 = [ 'integrator ArcLength 1 0.1' ];
    var l5 = [ 'integrator CentralDifference' ];
    var l6 = [ 'integrator Newmark 0.5 0.25' ];
    var l7 = [ 'integrator HHT 0.5 0.5 0.25' ];
    var l8 = [ 'integrator GeneralizedAlpha 1 0.8 0.5 0.25' ];
    var l9 = [ 'integrator TRBDF2' ];

    expect( analysisToOpenSees( j1 ) ).to.eql( l1 );
    expect( analysisToOpenSees( j2 ) ).to.eql( l2 );
    expect( analysisToOpenSees( j3 ) ).to.eql( l3 );
    expect( analysisToOpenSees( j4 ) ).to.eql( l4 );
    expect( analysisToOpenSees( j5 ) ).to.eql( l5 );
    expect( analysisToOpenSees( j6 ) ).to.eql( l6 );
    expect( analysisToOpenSees( j7 ) ).to.eql( l7 );
    expect( analysisToOpenSees( j8 ) ).to.eql( l8 );
    expect( analysisToOpenSees( j9 ) ).to.eql( l9 );

  } );


} );
