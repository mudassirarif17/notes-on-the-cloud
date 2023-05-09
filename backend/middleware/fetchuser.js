const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwtsecret";

const fetchuser = (req , res , next)=>{
    const token = req.header("auth-token");
    if (!token) {
    // 401 is a access denied code
    res.status(401).send({ error: "Please authenticate by using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate by using a valid token" });
  }
}


module.exports = fetchuser;
