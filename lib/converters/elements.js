
var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );
var subTypes = flatten( require( './element-types' ) )
  .reduce( function( obj, item ) {
    obj[ item.type ] = item;
    return obj;
  }, {} );

exports.order = 1;
exports.selector = 'elements';

var baseSchema = [
  { value: 'element' },
  { selector: 'type' },
  { selector: 'id' },
  { selector: 'node_id' }
];

exports.convert = function( list ) {

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
};
