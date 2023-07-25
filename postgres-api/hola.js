const Token = require('crypto').randomBytes(64).toString('hex')
const jwt = require("jsonwebtoken");
const tokenPayload = {
  firstName: "DIEGO JOSUE",
  lastName: "ANDRADE PELAEZ",
  email: "diegojosueandrade@yachaytech.edu.ec"
};
const jwtToken = jwt.sign(tokenPayload, Token);
console.log(Token,"\n")

console.log(jwtToken)