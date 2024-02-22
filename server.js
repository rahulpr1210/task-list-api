const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const listRoutes = require("./routes/list");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require("./swagger_output.json");

require("dotenv").config();

//Creating express server instance
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server Running On Port: ${PORT}`);
    });
  })
  .catch((err) => {
    throw new Error(err.message);
  });

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Configure routes
app.use("/api/users", userRoutes);
app.use("/api", listRoutes);

//Route: '/'
app.get("/", (req, res) => {
  res.send("Health Check");
});
