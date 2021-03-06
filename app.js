const express = require("express");
const session = require("express-session");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");
// TODO: Change in production
app.use(cors());

app.use(
  session({
    secret: "writer",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: "mongodb://localhost/employmentHistory" })
  })
);

mongoose.connect(
  "mongodb://localhost/employmentHistory",
  { useNewUrlParser: true },
  function(err, connection) {
    if (err) throw err;
    else console.log("connected to mongodb");
  }
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Requiring passport module
require("./server/modules/passport")(passport);

if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

// router.get("/", (req, res) => {
//   res.render("index");
// });

app.use("/api/v1", require("./server/routes/index"));

app.use("*", require("./server/routes"));

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
