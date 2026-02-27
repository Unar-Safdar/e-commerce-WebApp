const verifyAdmin = (req, res, next) => {
    console.log(req.user); // check user info
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next(); // allow access
};

module.exports = verifyAdmin;