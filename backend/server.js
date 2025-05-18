const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const App = express();
App.use(cors());
App.use(express.json());

const port = process.env.PORT || 5000;
App.use('/api/weather', require('./routes/weather'));
App.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
