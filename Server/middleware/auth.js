import jwt from 'jsonwebtoken'

 const auth = (req, res, auth) => {
    const token = req.headers.authorization;

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