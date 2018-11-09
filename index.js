const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwksRsa = require('jwks-rsa');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: "https://idee.auth0.com/.well-known/jwks.json"
//   }),
//   audience: 'https://backend-api-url.com/',
//   issuer: "https://idee.auth0.com/",
//   algorithms: ['RS256']
// });

let categories = {
  data: ['Politics', 'Entertainment', 'Technology']
};

let blog = {
  data: [
    {
      id: 1,
      title: 'Test',
      category: 'Politics',
      post: 'Fugiat duis id irure id. Sint irure ipsum exercitation non labore enim pariatur nisi nisi exercitation proident quis quis. Est tempor pariatur nostrud culpa duis fugiat Lorem anim esse do cillum quis. Amet cillum dolor cillum excepteur id consectetur dolore mollit. Ipsum reprehenderit ea amet ad nostrud do velit proident commodo. Dolor aliquip mollit fugiat sint aliqua officia veniam.'
    }
  ],
}

app.use(express.static('public'))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/pages/index.html"));
});

app.get("/callback", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/pages/callback.html"));
});

app.get("/blog", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/pages/blog.html"));
});

app.get("/blog/:id", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/pages/blogsingle.html"));
});


// app.get("/quiz-questions", (req, res, next) => {
//   res.sendFile(path.join(__dirname + "/json/index.json"));
// });

app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://idee.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://backend-api-url.com/',
  issuer: `https://idee.auth0.com/`,
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
