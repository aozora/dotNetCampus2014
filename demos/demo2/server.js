"use strict";

var sys = require( "sys" ),
   http = require( "http" ),
   url = require( "url" ),
   path = require( "path" ),
   fs = require( "fs" );

http.createServer( function ( request, response ) {

   var uri = url.parse( request.url ).pathname;
   var filename = path.join( path.join(__dirname, 'public'), uri );

   fs.exists( filename, function ( exists ) {

      // if the file path don't exists...
      if ( !exists ) {
         response.writeHead( 404, { "Content-Type": "text/plain" });
         response.write( "404 Not Found\n" );
         response.end();
         return;
      }

      fs.readFile( filename, function ( err, file ) {
         if ( err ) {
            response.writeHead( 500, { "Content-Type": "text/plain" });
            response.write( err + "\n" );
            response.end();
            return;
         }

         response.writeHead( 200 );
         response.end( file);
      });
   });

}).listen( 8080 );

sys.puts( "Server running at http://localhost:8080/" );