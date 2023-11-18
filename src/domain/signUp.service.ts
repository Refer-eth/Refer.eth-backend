import { Request, Response } from "express";
import User from "./user";

export default class SignUpService {
    public static async signUp(name: string, address: string, referBy: number, password: string): Promise<User> {
        return User.create(name, address, referBy, password);
    }

    public static async signUpHandler(req: Request, res: Response) {
        const { name, address, referLink, password } = req.body;
        let referer = null;
        try {
            referer = await User.getByReferLink(referLink);
        } catch (e) {
            res.status(400).json({
                status: false,
                message: 'The operation was not successful because of invalid refer link',
                result: e.message,
            });
            return;
        }
        try {
            const user = await SignUpService.signUp(name, address, referer.getId(), password);
            res.status(200).json({
                status: true,
                message: 'The operation was successful',
                result: user,
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
                result: user,
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
