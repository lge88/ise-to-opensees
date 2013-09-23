
var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );

exports.order = 2;
exports.selector = 'time_series';
exports.convert = convert;

var baseSchema = [
  { value: 'timeSeries' },
  { selector: 'type' },
  { selector: 'id' }
];

var subTypes = {
  'Linear': {
    schema: []
  },
  'Linear': {
    schema: []
  },
  'Linear': {
    schema: []
  },
}

function convert( list ) {
  return list
    .map( function( obj ) {

      // Figure out subtype schema according to type:
      var subType = subTypes[ obj.type ];
      if ( !subType ) {
        throw new Error( 'Unknown element type ' + obj.type );
      }
      var subTypeSchema = subType.schema || [];

      // Apply subtype schemas:
      var schema = baseSchema.concat( subTypeSchema );

      return flatten( toList( obj, schema ) ).join( ' ' );

    } );
}
