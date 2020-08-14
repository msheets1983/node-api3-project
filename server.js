const express = require("express");
const userRouter = require("./users/UserRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong, try again later",
  });
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString();

  console.log(`Method: ${req.method} URL:${req.originalUrl} Time:${time}`);
  next();
}

module.exports = server;
