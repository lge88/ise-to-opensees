
var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

var converters = flatten( require( './converters' ) )
  .reduce( function( prev, cur ) {
    prev[cur.selector] = cur;
    return prev;
  }, {} );

var keywords = [
  'model_builder',
  'time_series',
  'materials',
  'transforms',
  'sections',
  'nodes',
  'single_point_constraints',
  'multiple_point_constraints',
  'elements',
  'loads',
  'patterns',
  'analysis'
];

// Convert JSON model to tcl commands
// [
//   'model BasicBuilder -ndm 2 -ndf 2',
//   'uniaxialMaterial Elastic 1 3000',
//   'timeSeries Linear 1',
//   '...'
// ]

function modelToOpenSees( json, options ) {
  // resolve options:
  var filter, join_char;
  options || ( options = {} );
  if ( typeof options.filter === 'function' ) {
    filter = options.filter;
  } else if ( Array.isArray( options.fields ) ) {
    filter = function( fields ) {
      var bitMap = fields.reduce( function( obj, item ) {
        obj[ item ] = true;
        return obj;
      }, {} );
      return function( x ) {
        return bitMap[x];
      };
    }( options.fields );
  } else {
    filter = id;
  }

  join_char = options.join_char;

  var out, indexMap;
  indexMap = buildIndex( json );

  var converter, f, convert;

  var handles = keywords
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
          return f;
        }
      }
      return null;
    } )
    .filter( truthy );

  out = makeSeq( handles )( [] );

  if ( join_char ) {
    out = out.join( join_char );
  }

  return out;
}

function id( x ) { return x; }

function truthy( x ) { return !!x; };

function buildIndex( model ) {
  return keywords
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
    }, {} );
}

function makeSeq( funcs ) {
  return funcs.reduce( function( sofar, f ) {
    return function( x ) { return f( sofar(x) ); };
  } );
}

module.exports = exports = modelToOpenSees;
exports.modelToOpenSees = modelToOpenSees;
