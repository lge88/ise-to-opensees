
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

var baseSchemaEnd = [
  { optional: true, prefix: '-factor', selector: 'factor' }
];

var subTypes = {
  'Linear': { schema: [] },
  'Constant': { schema: [] },
  'Trig': {
    schema: [
      { selector: 'start' },
      { selector: 'end' },
      { selector: 'period' },
      { optional: true, prefix: '-shift', selector: 'shift' }
    ]
  },
  'Triangle': {
    schema: [
      { selector: 'start' },
      { selector: 'end' },
      { selector: 'period' },
      { optional: true, prefix: '-shift', selector: 'shift' }
    ]
  },
  'Rectangular': {
    schema: [
      { selector: 'start' },
      { selector: 'end' }
    ]
  },
  'Pulse': {
    schema: [
      { selector: 'start' },
      { selector: 'end' },
      { selector: 'period' },
      { optional: true, prefix: '-width', selector: 'width' },
      { optional: true, prefix: '-shift', selector: 'shift' }
    ]
  },
  'Path': {
    schema: [
      { optional: true, selector: 'dt', prefix: '-dt' },
      {
        optional: true, selector: 'time', prefix: '-time',
        convert: addCurlyBraces
      },
      {
        optional: true, selector: 'values', prefix: '-values',
        convert: addCurlyBraces
      },
      { optional: true, selector: 'fileTime', prefix: '-fileTime' },
      { optional: true, selector: 'filePath', prefix: '-filePath' }
    ]
  }
};

function addCurlyBraces( list ) {
  if ( list && list.length > 0 ) {
    list.splice( 1, 0, '{' );
    list.push( '}' );
  }
  return list;
}

function convert( list ) {
  return list
    .map( function( obj ) {

      // Figure out subtype schema according to type:
      var subType = subTypes[ obj.type ];

      if ( !subType ) {
        throw new Error( 'Unknown time_series type ' + obj.type );
      }
      var subTypeSchema = subType.schema || [];

      // Apply subtype schemas:
      var schema = baseSchema.concat( subTypeSchema ).concat( baseSchemaEnd );

      return flatten( toList( obj, schema ) ).join( ' ' );

    } );
}
