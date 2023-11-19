import { Request, Response } from "express";
import User from "./user";
import jwt from "../utils/JWT";

const generalReferId = 'refer.eth/test';

export default class SignUpService {
    public static async signUp(name: string, address: string, sign: string, referBy?: number): Promise<User> {
        return User.create(name, address, sign, referBy);
    }

    private static async getRefererId(referId: string): Promise<number | undefined> {
        if (referId === generalReferId) {
            return undefined;
        }
        let referer = null;
        try {
            referer = await User.getByReferId(referId);
        } catch (e) {
            throw new Error('The operation was not successful because of invalid refer link');
        }
        return referer.getId();
    }

    public static async signUpHandler(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        const { name, address, referId, sign } = req.body;
        try {
            const refererId = await SignUpService.getRefererId(referId);
            const user = await SignUpService.signUp(name, address, sign, refererId);
            res.status(200).json({
                status: true,
                message: 'The operation was successful',
                result: {
                    user,
                    token: jwt.generateJwtToken(user)

                },
            });
        } catch (e) {
            res.status(400).json({
                status: false,
                message: 'The operation was not successful',
                result: e.message,
            });
        }
    }

    public static async signInHandler(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        const { address, sign } = req.body;
        try {
            const user = await User.getByAddress(address);
            // todo: save hashed sign in db
            if (!user.checkSign(sign)) {
                res.status(400).json({
                    status: false,
                    message: 'The operation was not successful because of invalid sign',
                    result: null,
                });
                return;
            }
            // todo: define dto for user
            res.status(200).json({
                status: true,
                message: 'The operation was successful',
                result: {
                    user,
                    token: jwt.generateJwtToken(user)
                },
            });
        }
        catch (e) {
            res.status(400).json({
                status: false,
                message: 'The operation was not successful',
                result: e.message,
            });
        }
    }
}
