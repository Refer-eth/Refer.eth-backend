import { Request, Response } from "express";
import User from "./user";

export default class Dashboard {
    static async getUser(id: number): Promise<User> {
        return await User.getById(id);
    }

    static async dashboardHandler(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await Dashboard.getUser(Number(id));
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
}