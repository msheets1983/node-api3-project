const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  db.get(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then((post) => {
      res.status(200).json({ message: "Post has been deleted", post });
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  db.getById(req.params.id).then((posts) => {
    if (posts) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  });
}

module.exports = router;
