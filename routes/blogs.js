const express = require("express");

const blogRouter = express.Router();
const {
  getBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
  getBookmarks,
  getMyBlog,
  addBookmark,
} = require("../controllers/blogControl");

const { verifyBlogOwner, tokenVerification} = require("../middleware/middlewares");
const { PostBlogValidation, UpdateBlogValidation } = require("../middleware/validators/blog.validator.js");

blogRouter.get("/", getBlogs);

blogRouter.get(
  "/bookmark",
  tokenVerification,
  getBookmarks
);
blogRouter.post(
  "/bookmark:id",
  tokenVerification,
  addBookmark
);
blogRouter.get(
  "/me",
  tokenVerification,
  getMyBlog
);

blogRouter.get("/:id", getBlog)

blogRouter.patch(
  "/:id",
    UpdateBlogValidation,
    tokenVerification,
    verifyBlogOwner,
    updateBlog
);
blogRouter.post(
  "/",
    PostBlogValidation,
    tokenVerification,
    postBlog
);
blogRouter.delete(
  "/:id",
  tokenVerification,
  verifyBlogOwner,
  deleteBlog
);

module.exports = blogRouter;
