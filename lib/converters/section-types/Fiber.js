var toList = require( 'object-to-list' );
var flatten = require( 'flatten' );
exports.type = 'Fiber';

var subTypes = [
  {
    collection: 'fibers',
    schema: [
      { value: 'fiber' },
      { selector: 'location.y' },
      { selector: 'location.z' },
      { selector: 'A' },
      { selector: 'material_id' }
    ]
  },
  {
    collection: 'patches',
    baseSchema: [
      { value: 'patch' },
      { selector: 'type' },
      { selector: 'material_id' }
    ],
    subs: {
      'quad': {
        schema: [
          { selector: 'numSubdivIJ' },
          { selector: 'numSubdivJK' },
          { selector: 'I.y' }, { selector: 'I.z' },
          { selector: 'J.y' }, { selector: 'J.z' },
          { selector: 'K.y' }, { selector: 'K.z' },
          { selector: 'L.y' }, { selector: 'L.z' }
        ]
      },
      'rect': {
        schema: [
          { selector: 'numSubdivY' },
          { selector: 'numSubdivZ' },
          { selector: 'I.y' }, { selector: 'I.z' },
          { selector: 'J.y' }, { selector: 'J.z' }
        ]
      },
      'circ': {
        schema: [
          { selector: 'numSubdivCirc' },
          { selector: 'numSubdivRad' },
          { selector: 'center.y' }, { selector: 'center.z' },
          { selector: 'internalRadius' }, { selector: 'externalRadius' },
          { optional: true, selector: 'startAngle' },
          { optional: true, selector: 'endAngle' }
        ]
      },
    },
    convert: function( obj ) {
      var sub = this.subs[obj.type];
      if ( !sub ) { throw new Error( 'No such patch type ' + obj.type ); }
      var schema = this.baseSchema.concat( sub.schema );
      return toList( obj, schema );
    }
  },
  {
    collection: 'layers',
    convert: function( obj ) {
      var sub = this.subs[obj.type];
      if ( !sub ) { throw new Error( 'No such patch type ' + obj.type ); }
      var schema = this.baseSchema.concat( sub.schema );
      return toList( obj, schema );
    },
    baseSchema: [
      { value: 'layer' },
      { selector: 'type' },
      { selector: 'material_id' }
    ],
    subs: {
      'straight': {
        schema: [
          { selector: 'numOfFibers' },
          { selector: 'areaOfFibers' },
          { selector: 'start.y' }, { selector: 'start.z' },
          { selector: 'end.y' }, { selector: 'end.z' }
        ]
      },
      'circ': {
        schema: [
          { selector: 'numOfFibers' },
          { selector: 'areaOfFibers' },
          { selector: 'center.y' }, { selector: 'center.z' },
          { selector: 'radius' },
          { optional: true, selector: 'startAngle' },
          { optional: true, selector: 'endAngle' }
        ]
      },
    }
  },
]

exports.convert = function( obj ) {
  var l = [];

  subTypes.forEach( function( sub ) {
    var arr = obj[sub.collection];
    if ( arr ) {
      arr.forEach( function( o ) {
        if ( sub.convert ) {
          l.push( flatten( sub.convert( o ) ).join( ' ' ) );
        } else if ( sub.schema ) {
          l.push( flatten( toList( o, sub.schema ) ).join( ' ' ) );
        }
      } );
    }
  } );

  l.unshift( '{' );
  l.push( '}' );
  return l.join( '\n' );
}
