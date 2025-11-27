const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'StackWave API Docs',
    description: 'Documentation for StackWave Project',
  },
  host: 'localhost:3000', // or your deployed host
  schemes: ['http'],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication routes',
    },
  ],
};

const outputFile = '../../swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
