//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
var sys = require( "sys" ),
   http = require( "http" ),
   url = require( "url" ),
   path = require( "path" ),
   fs = require( "fs" );



http.createServer( function ( request, response ) {

   var content = '',
      //fileName = path.basename( req.url ),   //the file that was requested
      localFolder = __dirname + '/public/';  //where our public files are located

   var uri = url.parse( request.url ).pathname;
   var filename = path.join( process.cwd(), uri );

   path.exists( filename, function ( exists ) {
      if ( !exists ) {
         response.writeHead( 404, { "Content-Type": "text/plain" });
         response.write( "404 Not Found\n" );
         response.close();
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