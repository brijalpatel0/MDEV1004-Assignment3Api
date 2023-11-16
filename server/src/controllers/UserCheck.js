

export function verifyUser(req, res, next) {
    try {
        //more checks
        next();
    }catch (e) {
        console.error(e);
        res.status(500).send("Please try again later");
    }
}