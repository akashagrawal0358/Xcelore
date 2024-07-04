 const jwt = require('jsonwebtoken');


 exports.isAdmin = (req, res, next) => {
   
   const authHeader = req.header('Authorization');
   if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });
   
   const token = authHeader.split(' ')[1];
   console.log(" backend....isAdmin middleware", token);
   if (!token) return res.status(401).json({ message: 'Access denied' });

  
   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(  " decoded :" , decoded.role);
  
    if (decoded.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }

}

