const express = require('express');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createUser);

// router.get('/:id', getUserById); // Rutas Dinámicas
// router.patch('/:id', updateUser);

router.route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };