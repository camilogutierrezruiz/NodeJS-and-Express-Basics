
const { User } = require('../models/user.model');

// Obtener Usuarios
const getAllUsers = async (req, res) => {
  try {

    const users = await User.findAll();
    res.status(200).json({
      users,
    });

  } catch (error) {
    console.log(error);
  };
};

// Crear Usuario
const createUser = async (req, res) => {
  try {

    const { name, email } = req.body;
    const newUser = await User.create({ name, email, });
    res.status(201).json({
      newUser
    });

  } catch (error) {
    console.log(error);
  };
};

// Obtener Usuario por ID
const getUserById = async (req, res) => {
  try {

    const { id } = req.params; // Objeto que contiene los valores dinámicos que recibe como peticion del clente
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User no found given that id'
      });
    };
    res.status(200).json({ user });

  } catch (error) {
    console.log(error);
  };
};

// Actualizar Usuario
const updateUser = async (req, res) => {
  try {

    const { id } = req.params;
    const { name } = req.body;
    // await User.update({ name }, { where: { id } });
    const user = await User.findOne({ name }, { where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User no found given that id'
      });
    };
    await user.update({ name });
    res.status(200).json({ name });

  } catch (error) {
    console.log(error);
  }
};

// Borrar Usuario
const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User no found given that id'
      });
    };
    // await User.destroy(); => Hard Delete: Nunca usar, salvo en casos excepcionales
    await user.update({ status: 'deleted' }); // Soft Delete: cambio de estatus de avtive a deleted para no borrar la informacion por completo de la base de datos 
    res.status(200).json({
      status: 'success'
    });

  } catch (error) {
    console.log(error);
  };
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};