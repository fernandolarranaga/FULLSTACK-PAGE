const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.json({ error: "Debes incluir la cabecera con el token" });
  }

  const token = req.headers["authorization"];
  let payload;

  try {
    payload = jwt.verify(token, "Cabalgamos Sancho");

    // Obtener el usuario desde la base de datos y asignar toda la información a req.user
    const user = await User.findById(payload.user_id);
    if (!user) {
      return res.json({ error: "Usuario no encontrado" });
    }

    req.user = {
      _id: user._id,
      email: user.email
  };
  console.log("User grabado: ",req.user); ""
    next();
  } catch (error) {
    return res.json({ error: "Token no correcto" });
  }
};

module.exports = { checkToken };

