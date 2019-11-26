require("dotenv").config();
const path = require("path");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const viewsFolder = path.join(__dirname, "..", "views");

 module.exports = {
   init(app, express){
     app.set("views", viewsFolder);
     app.set("view engine", "ejs");
    /* app.use(expressValidator());*/
     app.use(express.static(path.join(__dirname, "..", "assets")));
   }
 };
