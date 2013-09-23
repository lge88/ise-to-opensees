var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

exports.order = 1;
exports.selector = 'materials';
exports.convert = convert;

var subTypes = flatten( require( './material-types' ) )
  .reduce( function( prev, cur ) {
    var tmp = cur.type.split( '.' );
    var type = tmp[0], sub = tmp[1];
    if ( !prev[type] ) {
      prev[type] = {};
    }
    prev[type][sub] = cur;
    return prev;
  }, {} );

function convert( list ) {

  return list
    .map( function( obj ) {

      // resolve type string;
      var tmp = obj.type.split( '.' );
      var type = tmp[0], sub = tmp[1];

      var out = [
        type + 'Material',
        sub,
        obj.id
      ];

      // Figure out subtype schema according to type:
      var subType = subTypes[ type ][ sub ];
      if ( !subType ) {
        throw new Error( 'Unknown element type ' + obj.type );
      }
      var subTypeSchema = subType.schema || [];

      // Apply subtype schemas:
      out = out.concat( toList( obj, subTypeSchema ) );

      return flatten( out ).join( ' ' );

    } );
};
