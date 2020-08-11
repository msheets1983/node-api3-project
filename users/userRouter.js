const express = require("express");
const db = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  db.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  posts
    .insert({ text: req.body.text, user_id: req.params.id })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "User has been deleted" });
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          errorMessage: "Invalid User ID",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
