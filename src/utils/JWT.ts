import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'refer_eth_secret_key';

function generateJwtToken(payload: object): string {
    return jwt.sign(JSON.stringify(payload), secretKey);
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        if (String(user.id) !== String(req.params.id)) {
            return res.sendStatus(403);
        }
        // Proceed to the next middleware or route handler
        next();
    });
}

export default {
    generateJwtToken,
    authenticateToken
}