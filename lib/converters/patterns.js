
var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );

exports.selector = 'patterns';
exports.convert = convert;

var baseSchema = [
  { value: 'pattern' },
  { selector: 'type' },
  { selector: 'id' }
];

var patternTypes = {
  'Plain': {
    convert: function( obj, indexMap ) {
      var allLoads = indexMap.loads;
      var schema = baseSchema.concat( [
        { selector: 'time_series_id' }
      ] );

      var l = toList( obj, schema );
      var loads = ensureArray( obj.load_id )
        .map( function( i ) {
          return allLoads[i];
          return find( allLoads, function( item ) {
            return item.id === i;
          } );
        } )
        .filter( truthy )
        .map( function( i ) {
          var sub = loadsTypes[ i.type ];
          if ( sub ) {
            var s = sub.schema;
            return flatten( toList( i, s ) ).join( ' ' );
          }
          return null;
        } )
        .filter( truthy );

      loads.unshift( '{' );
      loads.push( '}' );
      loads = loads.join( '\n' );

      l.push( loads );

      return flatten( l ).join( ' ' );
    }
  },
  'UniformExcitation': {
    schema: baseSchema.concat( [
      { selector: 'direction' },
      { prefix: '-accel', selector: 'time_series_id' },
      { prefix: '-vel', selector: 'initialVelocity' }
    ] )
  }
};

var loadsTypes = {
  'NodalForce': {
    schema: [
      { value: 'load' },
      { selector: 'node_id' },
      { selector: 'value' }
    ]
  },
  'NodalDisplacement': {
    schema: [
      { value: 'sp' },
      { selector: 'node_id' },
      { selector: 'value' }
    ]
  },
  'BeamUniform': {
    schema: [
      { value: 'eleLoad' },
      { selector: 'element_id', prefix: '-ele' },
      { value: '-type -beamUniform' },
      { selector: 'Wy' },
      { optional: true, selector: 'Wz' },
      { optional: true, selector: 'Wx' }
    ]
  },
  'BeamPoint': {
    schema: [
      { value: 'eleLoad' },
      { selector: 'element_id', prefix: '-ele' },
      { value: '-type -beamPoint' },
      { selector: 'Py' },
      { optional: true, selector: 'Pz' },
      { selector: 'xL' },
      { optional: true, selector: 'Px' }
    ]
  }
};


function convert( list, indexMap ) {

  return list
    .map( function( obj ) {
      var subType = patternTypes[ obj.type ];
      if ( !subType ) {
        throw new Error( 'Unknown pattern type ' + obj.type );
      }
      if ( subType.convert ) {
        return subType.convert( obj, indexMap );
      } else if ( subType.schema ) {
        return flatten( toList( obj, subType.schema ) ).join( ' ' );
      } else {
        throw new Error( obj.type + ' do not implement schema/convert' );
      }
    } );
};

function ensureArray( x ) {
  if ( !Array.isArray( x ) ) { return [x] };
  return x;
}

function truthy( x ) { return !!x; }
