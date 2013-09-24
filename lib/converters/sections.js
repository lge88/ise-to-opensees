var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

exports.order = 1;
exports.selector = 'sections';
exports.convert = convert;

var subTypes = flatten( require( './section-types' ) )
  .reduce( function( obj, item ) {
    obj[ item.type ] = item;
    return obj;
  }, {} );

var baseSchema = [
  { value: 'section' },
  { selector: 'type' },
  { selector: 'id' }
];

function convert( list, indexMap, model ) {

  return list
    .map( function( obj ) {
      var type = obj.type;
      var out = toList( obj, baseSchema );

      // Figure out subtype schema according to type:
      var subType = subTypes[ type ];
      if ( !subType ) {
        throw new Error( 'Unknown element type ' + obj.type );
      }

      if ( subType.convert ) {
        out = out.concat( subType.convert( obj, indexMap, model ) );
      } else if ( subType.schema ) {
        out = out.concat( toList( obj, subType.schema ) );
      } else {
        throw new Error( 'Section ' + obj.type +
                         ' do not implement schema/convert' );
      }

      return flatten( out ).join( ' ' );
    } );
};
