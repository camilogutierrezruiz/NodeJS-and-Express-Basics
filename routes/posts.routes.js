const express = require('express');

// Controller
const {
  getAllPosts,
  postPost,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getAllPosts);

router.route('/:id')
  .get(getPostById)
  .post(postPost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = { postsRouter: router }