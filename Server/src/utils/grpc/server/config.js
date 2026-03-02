const PROTO_PATH = "./customers.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefination = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const customersProto = grpc.loadPackageDefinition(packageDefination);

const server = new grpc.Server();

server.addService(customersProto.customerService.service, {
  getAll: (call, callback) => {},
  get: (call, callback) => {},
  insert: (call, callback) => {},
  update: (call, callback) => {},
  remove: (call, callback) => {},
});

server.bindAsync(
  "127.0.0.1:30045",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log("Error in server config js ", err);
    } else {
      //   server.start();
      console.log("server is started at port " + port);
    }
  },
);
