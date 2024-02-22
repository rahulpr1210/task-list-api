const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];
require("dotenv").config();

const doc = {
  info: {
    title: "Task List API",
    description: "List based tasks management API",
  },
  host: "localhost:"+process.env.PORT,
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});