const { OAuth2Client } = require('google-auth-library');
const { config } = require('../config/config');

const GOOGLE_CLIENT_ID = config.googleClientId;
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

const authenticateUserMiddleware = async (req, res, next) => {
  // Obtener el token de la cookie o del encabezado de la solicitud (puedes ajustar esto según tu preferencia)
  const token =  req.header("Authorization")?.replace("Bearer ", "");

  // console.log("Token recibido en el middleware:", token); 

  if (!token) {
    console.log("No se proporcionó un token de autenticación.");
    return res.status(401).json({ message: "No se proporcionó un token de autenticación." });
  }

  try {
    const { name, email, picture } = await verifyGoogleToken(token);

    // Agregar los datos del usuario a la solicitud para que puedan ser utilizados por otras rutas
    req.user = {  name, email, picture };



    console.log("Autenticación exitosa:", req.body);

    next();
  } catch (error) {
    console.error("Error al verificar el token de autorización:", error.message);
    return res.status(401).json({ message: "El token de autenticación no es válido." });
  }
};


module.exports = { authenticateUserMiddleware };
