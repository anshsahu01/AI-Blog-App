import jwt from 'jsonwebtoken'

 const auth = (req, res, next) => {
    const token = req.header('Authorization');
   if(!token){
    return res.status(401).json({
        status :false,
        message : "No token provided"
    })
   }


    try {

        jwt.verify(token, process.env.JWT_SECRET);
        next();
        
    } catch (error) {
        res.json({
            success : false,
            message : "Invalid Token"
        })
        
    }
}

export default auth