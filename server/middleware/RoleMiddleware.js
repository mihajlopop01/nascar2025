
//Middleware za proveru role usera
const roleMiddleware = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).redirect('http://localhost:5173/'); 
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).send('Access denied'); // Ako user nema potrebnu rolu
      }
  
      next(); // User je autentifikovan i ima tacnu rolu
    };
  };
  
  module.exports = roleMiddleware;