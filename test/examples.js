
var domainToOpenSees = require( 'ise-to-opensees' ).domainToOpenSees;
var toOpenSees = require( 'ise-to-opensees' ).toOpenSees;
var expect = require( 'expect.js' );

describe( 'Examples', function() {

  it(
    'http://opensees.berkeley.edu/wiki/index.php/Basic_Truss_Example',
    function() {

      var ex = {

        model_builder: { type: 'BasicBuilder', ndm: 2, ndf: 2 },
        materials: [
          { id: 1, type: 'uniaxial.Elastic', E: 3000 }
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
          { id: 1, type: 'truss', node_id: [ 1, 4 ], A: 10, material_id: 1 },
          { id: 2, type: 'truss', node_id: [ 2, 4 ], A:  5, material_id: 1 },
          { id: 3, type: 'truss', node_id: [ 3, 4 ], A:  5, material_id: 1 }
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
        ],
        analysis: {
          system: { type: 'BandSPD' },
          numberer: { type: 'RCM' },
          constraints: { type: 'Plain' },
          integrator: { type: 'LoadControl', lambda: 0.1 },
          algorithm: { type: 'Linear' },
          analysis: { type: 'Static' }
        }
      };

      var exList = [
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
        'element truss 1 1 4 10 1',
        'element truss 2 2 4 5 1',
        'element truss 3 3 4 5 1',
        'pattern Plain 1 1 {',
        'load 4 100 -50',
        '}',
        'system BandSPD',
        'constraints Plain',
        'numberer RCM',
        'algorithm Linear',
        'integrator LoadControl 0.1',
        'analysis Static'
      ];

      console.log( toOpenSees( ex, {
        filter: function( x ) {
          return x in {
            elements: true,
            nodes: true
          };
        }
      } ) );


      expect( toOpenSees( ex ) ).to.eql( exList.join( '\n' ) );
    } );

} );
