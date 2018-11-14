const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwksRsa = require('jwks-rsa');
const envVariables = require('../env-variables.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const categories = {
  data: ['Politics', 'Entertainment', 'Technology']
};

const blog = {
  data: [
    {
      id: 1,
      title: 'Test',
      category: 'Politics',
      post: 'Fugiat duis id irure id. Sint irure ipsum exercitation non labore enim pariatur nisi nisi exercitation proident quis quis. Est tempor pariatur nostrud culpa duis fugiat Lorem anim esse do cillum quis. Amet cillum dolor cillum excepteur id consectetur dolore mollit. Ipsum reprehenderit ea amet ad nostrud do velit proident commodo. Dolor aliquip mollit fugiat sint aliqua officia veniam.'
    }
  ],
}

app.use(express.static('../frontend/public'))


app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../frontend/public/pages/index.html"));
});

app.get("/callback", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../frontend/public/pages/callback.html"));
});

app.get("/blog", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../frontend/public/pages/blog.html"));
});

app.get("/blog/:id", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../frontend/public/pages/blogsingle.html"));
});


app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${envVariables.auth0Domain}/.well-known/jwks.json`
  }),
  audience: envVariables.apiIdentifier,
  issuer: `https://${envVariables.auth0Domain}/`,
  algorithms: ['RS256']
}));

app.get("/api/v1/categories", (req, res, next) => {
  res.json(categories);
});

app.get("/api/v1/posts", (req, res, next) => {
  res.json(blog);
});

app.get("/api/v1/post/:id", (req, res, next) => {
  let post = {};
  for (let i in blog.data) {
    if (req.params.id == blog.data[i].id) {
      post = blog.data[i];
      break;
    }
  }
  res.json(post);
});



app.post("/api/v1/createpost", (req, res, next) => {
  // console.log(req);
  let data = {
    id: blog.data.length + 1,
    title: req.body.title,
    category: req.body.category,
    post: req.body.post
  }
  blog.data.push(data);
  res.json(blog);
});

// select the port in which your Node.js web app will run
const port = 5000;

// then listen to the selected port
app.listen(port, () => console.log(`Server is running on port ${port}`));
