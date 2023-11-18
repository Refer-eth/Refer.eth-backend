import { Request, Response } from "express";
import User from "./user";
import jwt from "../utils/JWT";

const generalReferLink = 'refer.eth/test';

export default class SignUpService {
    public static async signUp(name: string, address: string, password: string, referBy?: number): Promise<User> {
        return User.create(name, address, password, referBy);
    }

    private static async getRefererId(referId: string): Promise<number | undefined> {
        if (referId === generalReferLink) {
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
        const { name, address, referId, password } = req.body;
        const refererId = await SignUpService.getRefererId(referId);
        try {
            const user = await SignUpService.signUp(name, address, password, refererId);
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
        const { address, password } = req.body;
        try {
            const user = await User.getByAddress(address);
            // todo: save hashed password in db
            if (!user.checkPassword(password)) {
                res.status(400).json({
                    status: false,
                    message: 'The operation was not successful because of invalid password',
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
