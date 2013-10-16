var flatten = require( 'flatten' );
var toList = require( 'object-to-list' );

exports.selector = 'analysis';
exports.convert = convert;

exports.schemas = [
  {
    name: 'system',
    schema: [
      { value: 'system' },
      { selector: 'type' },
      { optional: true, selector: 'lvalue', prefix: '-lvalueFact' }
    ]
  },
  {
    name: 'constraints',
    schema: [
      { value: 'constraints' },
      { selector: 'type' },
      { optional: true, selector: 'alphaS' },
      { optional: true, selector: 'alphaM' }
    ]
  },
  {
    name: 'numberer',
    schema: [
      { value: 'numberer' },
      { selector: 'type' }
    ]
  },
  {
    name: 'test',
    schema: [
      { value: 'test' },
      { selector: 'type' },
      { optional: true, selector: 'tolerance' },
      { optional: true, selector: 'maxIteration' },
      { optional: true, selector: 'numOfIteration' },
      { optional: true, selector: 'printFlag' },
      { optional: true, selector: 'normType' },
    ]
  },
  {
    name: 'algorithm',
    schema: [
      { value: 'algorithm' },
      { selector: 'type' },
      { optional: true, flag: '-initial', selector: 'useInitialStiffness' },
      { optional: true, flag: '-initialThenCurrent', selector: 'useInitialThenCurrentStiffness' },
      { optional: true, flag: '-secant', selector: 'useSecantStiffness' },
      { optional: true, flag: '-factorOnce', selector: 'factorOnce' },
      { optional: true, prefix: '-iterate', selector: 'tangentToIterate' },
      { optional: true, prefix: '-increment', selector: 'tangentToIncrement' },
      { optional: true, prefix: '-maxDim', selector: 'maxDim' }
    ]
  },
  {
    name: 'integrator',
    baseSchema: [
      { value: 'integrator' },
      { selector: 'type' }
    ],
    subTypes: {
      'LoadControl': { schema:[
        { selector: 'lambda' },
        { optional: true, selector: 'numOfInteration' },
        { optional: true, selector: 'minLambda' },
        { optional: true, selector: 'maxLambda' }
      ] },
      'DisplacementControl': { schema:[
        { selector: 'node_id' },
        { selector: 'dof' },
        { selector: 'increment' },
        { optional: true, selector: 'numOfInteration' },
        { optional: true, selector: 'minDu' },
        { optional: true, selector: 'maxDu' }
      ] },
      'MinUnbalDispNorm': { schema:[
        { selector: 'loadIncrement' },
        { optional: true, selector: 'Jd' },
        { optional: true, selector: 'minLambda' },
        { optional: true, selector: 'maxLambda' }
      ] },
      'ArcLength': { schema:[
        { selector: 'arcLength' },
        { selector: 'alpha' }
      ] },
      'CentralDifference': { schema: [] },
      'Newmark': { schema: [
        { selector: 'gamma' },
        { selector: 'beta' }
      ] },
      'HHT': { schema: [
        { selector: 'alpha' },
        { optional: true, selector: 'gamma' },
        { optional: true, selector: 'beta' }
      ] },
      'GeneralizedAlpha': { schema: [
        { selector: 'alphaM' },
        { selector: 'alphaF' },
        { optional: true, selector: 'gamma' },
        { optional: true, selector: 'beta' }
      ] },
      'TRBDF2': { schema: [] }
    },
    convert: function( obj ) {
      var sub = this.subTypes[ obj.type ];
      if ( !sub ) {
        throw new Error( 'Unknow system type ' + obj.type );
      }
      var schema = this.baseSchema.concat( sub.schema );
      return flatten( toList( obj, schema ) ).join( ' ' );
    }
  },
  {
    name: 'analysis',
    schema: [
      { value: 'analysis' },
      { selector: 'type' }
    ]
  },
  // {
  //   name: 'analyze',
  //   schema: [
  //     { value: 'analyze' },
  //     { selector: 'steps' },
  //     { optional: true, selector: 'dt' }
  //   ]
  // },
  // {
  //   name: 'eigen',
  //   schema: [
  //     { value: 'eigen' },
  //     { selector: 'numOfEigenValues' },
  //     { optional: true, selector: 'type' },
  //     { optional: true, selector: 'solver' },
  //   ]
  // },
]

function convert( obj ) {
  var out = [];
  exports.schemas.forEach( function( s ) {
    var setting = obj[ s.name ];
    if ( setting ) {
      if ( s.convert ) {
        out = out.concat( ensureArray( s.convert( setting ) ) );
      } else if ( s.schema ) {
        out = out.concat( flatten( toList( setting, s.schema ) ).join( ' ' ) );
      } else {
        throw new Error( s.name + ' do not have schema/convert' );
      }
    }
  } );
  return out;
};

function ensureArray( x ) {
  if ( !Array.isArray( x ) ) { return [x]; }
  return x;
}
