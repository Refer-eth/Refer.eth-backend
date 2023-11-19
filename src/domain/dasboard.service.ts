import { Request, Response } from "express";
import User from "./user";
import RewardCalculator from "./reward.calculator";


export default class Dashboard {
    static async dashboardHandler(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        const { id } = req.params;
        try {
            const user = await User.getById(Number(id));
            const userRepresentation = await user.getPresentationUser();
            const referredUsers = await User.getByReferBy(Number(id));
            const promises = referredUsers.map(async (user) => {
                return await user.getPresentationUser();
            });
            const referredUsersRepresentation = await Promise.all(promises);
            const totalScore = RewardCalculator.calculateScore(userRepresentation, referredUsersRepresentation);
            const result =  {
                user: userRepresentation,
                referredUsers: referredUsersRepresentation,
                totalScore
            };
            res.status(200).json({
                status: true,
                message: 'The operation was successful',
                result,
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