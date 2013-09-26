
var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );

exports.selector = 'model_builder';

var schema = [
  { value: 'model' },
  { selector: 'type' },
  { selector: 'ndm', prefix: '-ndm' },
  { selector: 'ndf', prefix: '-ndf' }
];

exports.convert = function( builder ) {
  var list = toList( builder, schema );
  return flatten( list ).join( ' ' );
};
