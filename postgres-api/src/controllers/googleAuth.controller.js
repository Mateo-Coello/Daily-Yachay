const { models } = require('../libs/sequelize');
const { OAuth2Client } = require('google-auth-library');
const { config } = require('../config/config');
const jwt = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = config.googleClientId; 
const JWT_SECRET_KEY = config.wtSecretKey;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (googleToken) => {
  try {
    // Verificar el token de autorización con Google
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    return { name, email, picture };
  } catch (error) {
    console.error("Error al verificar el token de autorización:", error.message);
    throw new Error("Error al verificar el token de autorización");
  }
};

const createUserWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;

    // Verificar el token de autorización con Google y obtener la información del usuario
    const { name, email, picture } = await verifyGoogleToken(token);

    // Separar el nombre completo en nombre (name) y apellido (lname)
    const nameParts = name.split(" ");
    const firstName = nameParts.slice(0, 2).join(" ");
    const lastName = nameParts.slice(2).join(" ");

    // Verificar si el usuario ya existe en la base de datos por su correo electrónico
    const existingUser = await models.Users.findOne({ where: { email } });

    if (existingUser) {
      // Si el usuario ya existe, retornar los datos existentes y el token JWT
      const tokenPayload = { firstName, lastName, email, user_profile_pic: picture };
      const jwtToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
      return res.json({ jwtToken, firstName, lastName, email, user_profile_pic: picture });
    } else {
      // Si el usuario no existe, crear uno nuevo con la información de Google
      const newUser = await models.Users.create({
        id: 'some_unique_id',
        name: firstName,
        lname: lastName,
        email,
        user_profile_pic: picture,
        type: 'estudiante',
        description: 'NOOB',
      });

      // Crear el JWT con los datos del usuario y firmarlo con la clave secreta
      const tokenPayload = { firstName, lastName, email, user_profile_pic: picture };
      const jwtToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);

      // Devolver el JWT y cualquier otra información que desees incluir en la respuesta
      return res.json({ jwtToken, firstName, lastName, email, user_profile_pic: picture });
    }
  } catch (error) {
    console.error("Error al crear o actualizar el usuario con Google One Tap:", error.message);
    return res.status(500).json({ success: false, message: "Error al crear o actualizar el usuario con Google One Tap" });
  }
};

module.exports = { createUserWithGoogle };
