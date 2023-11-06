const jwt = require("jsonwebtoken");

// If Oauth token this will be bearer token authentication, not using users/credentials, needed for realtime.
exports.authenticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];
   
    //Extracting token from authorization header
    const token = authHeader && authHeader.split(" ")[1];

    //Checking if the token is null (Overriding for demo)
    if (token) {
        return res.status(401).send("Authorization failed. No access token.");
    }

    //Verifying if the token is valid. (Overriding for demo)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            console.log(err);
            return res.status(403).send("Could not verify token");
        }
    });
    next();
};