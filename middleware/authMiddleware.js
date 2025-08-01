const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   if (!authHeader){
      return res.status(401).json({ error: 'Khong co Token' });
   }

   const token = authHeader.split(' ')[1];
   if (!token){
      return res.status(401).json({ error: 'Khong co Token' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch {
      res.status(401).json({ error: 'Token khong hop le' });
   }
};

module.exports = verifyToken;
