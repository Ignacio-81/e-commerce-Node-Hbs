/* 
MiddleWare to check and validate user log in.
*/
export const userlogin = (req, res, next) => {
  if (req.user) {
    console.log("usuario logeado :" + req.user);
    next();
  } else {
    console.log("usuario No logeado");
    console.log(req.user);
    res.send("User not logged in, please log in");
  }
};
