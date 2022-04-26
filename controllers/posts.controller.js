
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

// Obtener Posts
const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.findAll();
    res.status(200).json({
      posts
    });

  } catch (error) {
    console.log(error);
  };
};

// Publicar Post
const postPost = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = await User.findOne({ where: { id } });
    const { title, content } = req.body;

    const newPost = await Post.create({ title, content, userId: userId.id });
    res.status(201).json({
      newPost
    });

  } catch (error) {
    console.log(error);
  };
};

// Obtener Post según si ID
const getPostById = async (req, res) => {
  try {

    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post no found'
      });
    };
    res.status(200).json({
      post
    });

  } catch (error) {
    console.log(error);
  };
};

// Actualizar Post según su ID
const updatePost = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findOne({ title, content }, { where: { id } });
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post no found. Cannot update'
      });
    };
    const postUpdated = await Post.update({ title, content }, { where: { id } })
    res.status(200).json({
      postUpdated
    });

  } catch (error) {
    console.log(error);
  };
};

// Eliminar Post
const deletePost = async (req, res) => {
  try {

    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      res.status(404).json({
        status: 'error',
        message: `Post ${id} cannot delete because doesn't exist.`
      });
    };
    await post.update({ status: 'deleted' });
    res.status(200).json({
      status: 'success',
      message: `Post ${id} has been deleted`
    });

  } catch (error) {
    console.log(error);
  };
}

module.exports = {
  getAllPosts,
  postPost,
  getPostById,
  updatePost,
  deletePost
};