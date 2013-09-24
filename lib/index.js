
var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

var converters = flatten( require( './converters' ) )
  .reduce( function( prev, cur ) {
    prev[cur.selector] = cur;
    return prev;
  }, {} );

var collections = [
  'time_series',
  'materials',
  'transforms',
  'sections',
  'nodes',
  'single_point_constraints',
  'elements',
  'loads',
  'patterns'
];

function toOpenSees( json, options ) {
  return domainToOpenSees( json, options )
    .concat( analysisToOpenSees( json, options ) )
    .join( '\n' );
}

function truthy( x ) { return !!x; };

function buildIndex( model ) {
  return collections
    .map( function( key ) {
      var arr = model[key];
      if ( Array.isArray( arr ) && arr.length > 0 ) {
        return arr.reduce( function( obj, item ) {
          obj[ item.id ] = item;
          return obj;
        }, { collectionName: key } );
      } else {
        return { collectionName: key };
      }
    } ).reduce( function( obj, item ) {
      obj[ item.collectionName ] = item;
      return obj;
    }, {} )
}

// Convert JSON model to tcl commands list
// [
//   'model BasicBuilder -ndm 2 -ndf 2',
//   'uniaxialMaterial Elastic 1 3000',
//   'timeSeries Linear 1',
//   '...'
// ]

function analysisToOpenSees( json, options ) {
  var convert = converters[ 'analysis' ].convert;
  if ( convert && json.analysis ) {
    return convert( json.analysis, json );
  } else {
    return [];
  }
}

function domainToOpenSees( json, options ) {
  var out = [], indexMap;
  options || ( options = {} );
  var filter = options.filter || id;

  indexMap = buildIndex( json );

  if ( json.model_builder ) {
    out = out.concat( modelBuilderToList( json ) );
  }

  // apply converters:
  var converter, funcs = [ id ], f, convert;

  // TODO: refactor this, enable filtering, export only one function
  var handles = collections
    .filter( filter )
    .map( function( key ) {
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
              return sofar.concat( fn( arr, indexMap, model ) );
            };
          }( convert, json[key], json );
          f.key = key;
          funcs.push( f );

          return f;
        }
      }
    } );

  // console.log( funcs.map( function( f ) { return f.key; } ) );
  return makeSeq( funcs )( out );
}

function modelBuilderToList( json ) {
  var builder = json.model_builder;
  var schema = [
    { value: 'model' },
    { selector: 'type' },
    { selector: 'ndm', prefix: '-ndm' },
    { selector: 'ndf', prefix: '-ndf' }
  ];

  var list = toList( builder, schema );

  return flatten( list ).join( ' ' );
}

function id( x ) { return x; }

function makeSeq( funcs ) {
  return funcs.reduce( function( sofar, f ) {
    return function( x ) { return f( sofar(x) ); };
  } );
}

exports.domainToOpenSees = domainToOpenSees;
exports.analysisToOpenSees = analysisToOpenSees;
exports.toOpenSees = toOpenSees;
