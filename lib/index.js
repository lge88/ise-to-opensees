
var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

var converters = flatten( require( './converters' ) )
  .reduce( function( prev, cur ) {
    prev[cur.selector] = cur;
    return prev;
  }, {} );

var outputOrder = [
  'time_series',
  'transforms',
  'materials',
  'sections',
  'nodes',
  'single_point_constraints',
  'elements',
  'patterns'
].reduce( function( obj, item, ind ) {
  obj[ item ] = ind;
  return obj;
}, {} );

var byOrder = function( a, b ) {
  var ob = outputOrder[ b.key ];
  var oa = outputOrder[ a.key ];
  return oa - ob;
};

function toOpenSees( json, options ) {
  return toOpenSeesList( json, options ).join( '\n' );
}

// Convert JSON model to tcl commands list
// [
//   'model BasicBuilder -ndm 2 -ndf 2',
//   'uniaxialMaterial Elastic 1 3000',
//   'timeSeries Linear 1',
//   '...'
// ]

function toOpenSeesList( json, options ) {
  var out = [];

  if ( json.model_builder ) {
    out = out.concat( modelBuilderToList( json ) );
  }

  // apply converters:
  var key, converter, funcs = [ id ], f, convert;
  for ( key in json ) {
    if ( json.hasOwnProperty( key ) ) {
      converter = converters[key];
      if ( converter ) {
        if ( converter.convert ) {
          convert = converter.convert;
        } else if ( converter.schema ) {
          convert = function( s ) {
            return function( arr ) {
              return arr.map( function( obj ) {
                return flatten( toList( obj, s ) ).join( ' ' );
              } );
            };
          }( converter.schema );
        } else {
          throw new Error( 'Converter ' + key  +
                           'do not provide convert/schema' );
        }

        f = function( fn, arr, model ) {
          return function( sofar ) {
            return sofar.concat( fn( arr, model ) );
          };
        }( convert, json[key], json );
        f.order = converter.order || 1;
        f.key = key;

        funcs.push( f );
      }
    }
  }

  // console.log( funcs.map( function( f ) { return f.key; } ) );
  // funcs.sort( byOrder );
  // console.log( funcs.map( function( f ) { return f.key; } ) );

  return makeSeq( funcs.sort( byOrder ) )( out );
}

function modelBuilderToList( json ) {
  var builder = json.model_builder;
  var schema = [
    { value: 'model' },
    'type',
    { selector: 'ndm', prefix: '-ndm' },
    { selector: 'ndf', prefix: '-ndf' }
  ];

  var list = toList( builder, schema );

  return flatten( list ).join( ' ' );
}

// function byOrder( a, b ) { return b.order - a.order; };
function id( x ) { return x; }

function makeSeq( funcs ) {
  return funcs.reduce( function( sofar, f ) {
    return function( x ) { return f( sofar(x) ); };
  } );
}

exports.toOpenSeesList = toOpenSeesList;
exports.toOpenSees = toOpenSees;
