var express = require("express");
var loadDatabase = require("./database/fsdb");

var app = express();

// Database setup
var db_connection = __dirname + "/database/registrations.json";
var db_schema = { registrations: [] };
global.db = loadDatabase(db_connection, db_schema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use(require("./routes/apiRoutes"));

// Start the server
app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});
