
var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );


exports.order = 1;
exports.selector = 'single_point_constraints';

exports.schema = [
  { value: 'fix' },
  { selector: 'node_id' },
  { selector: 'is_prescribed' }
];

// exports.convert = function( list, model ) {

//   return list
//     .map( function( obj ) {

//       // Figure out subtype schema according to type:
//       var subType = subTypes[ obj.type ];
//       if ( !subType ) {
//         throw new Error( 'Unknown element type ' + obj.type );
//       }
//       var subTypeSchema = subType.schema || [];

//       // Apply subtype schemas:
//       var schema = baseSchema.concat( subTypeSchema );

//       return flatten( toList( obj, schema ) ).join( ' ' );

//     } );
// };
