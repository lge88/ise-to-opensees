
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
      var out = toList( obj, baseSchema );
      var subType = subTypes[ obj.type ];
      if ( !subType ) {
        throw new Error( 'Unknown element type ' + obj.type );
      }

      if ( subType.convert ) {
        out = out.concat( subType.convert( obj ) );
      } else if ( subType.schema ) {
        out = out.concat( toList( obj, subType.schema ) );
      } else {
        throw new Error( 'Sub element type didnt provide schema/convert' );
      }
      return flatten( out ).join( ' ' );
    } );
};
