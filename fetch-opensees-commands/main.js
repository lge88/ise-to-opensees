
require( 'shelljs/global' );
var Entities = require( 'html-entities' ).XmlEntities;
var entities = new Entities();

var file = 'opensees-commands.txt';
entities.decode( cat( file ) ).to( file );
