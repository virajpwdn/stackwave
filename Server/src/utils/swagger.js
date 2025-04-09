const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'StackWave API Docs',
      description: 'Documentation for StackWave project',
    },
    host: 'localhost:3000',
    tags: [
      {
        name: 'Auth',
        description: 'Authentication routes',
      },
    ],
  };

  const outputFile = path.resolve(__dirname, '../../swagger-output.json'); // Root-level output
  const endpointsFiles = [path.resolve(__dirname, '../router/auth.routes.js')]; // Correct path to auth.routes.js
  
// const endpointsFiles = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc);