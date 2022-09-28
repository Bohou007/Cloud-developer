import * as express from 'express';

const authentication = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authheader = req.headers.authorization;
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Please add authentication headers.", charset="UTF-8"');
        res.status(401).json("Please add authentication headers.").end();
    }
    else {
        if (authheader === "Boh513318442518ou007") {
            next();
        } else {
            // Bad user name or password
            res.setHeader('WWW-Authenticate', 'Basic realm="Please add a valid authentication headers.", charset="UTF-8"');
            res.status(401).json("Please add a valid authentication headers.").end();
        }
    }
}


export default authentication;