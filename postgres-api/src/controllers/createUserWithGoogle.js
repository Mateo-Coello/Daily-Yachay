const { models } = require('../libs/sequelize');

const createUserWithGoogle = async (req, res) => {
  try {
    const { name, email, picture } = req.user;

    // Separar el nombre completo en nombre (name) y apellido (lname)
    const nameParts = name.split(" ");
    const firstName = nameParts.slice(0, 2).join(" ");
    const lastName = nameParts.slice(2).join(" ");

    // Verificar si el usuario ya existe en la base de datos por su correo electrónico
    const existingUser = await models.Users.findOne({ where: { email } });

    if (existingUser) {
      return res.json({ firstName, lastName, email, user_profile_pic: picture, id: existingUser.dataValues.id });
    } else {
      // Si el usuario no existe, crear uno nuevo con la información de Google
      const newUser = await models.Users.create({
        name: firstName,
        lname: lastName,
        email,
        user_profile_pic: picture,
        type: 'estudiante',
        description: 'Pro player',
      });

      // Devolver los datos del nuevo usuario y cualquier otra información que desees incluir en la respuesta
      return res.json({ firstName, lastName, email, user_profile_pic: picture });
    }
  } catch (error) {
    console.error("Error al crear o actualizar el usuario con Google One Tap:", error.message);
    return res.status(500).json({ success: false, message: "Error al crear o actualizar el usuario con Google One Tap" });
  }
};

module.exports = {createUserWithGoogle};
