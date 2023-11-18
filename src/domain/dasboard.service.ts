import { Request, Response } from "express";
import User from "./user";
import BlockchainService from "../blockchain/transaction.service";
import RewardCalculator from "./reward.calculator";

const startBlock = 18590000;
const endBlock = 1000000000;

export default class Dashboard {
    static async dashboardHandler(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await User.getById(Number(id));
            const txs = await BlockchainService.getTransactions(user.getAddress(), startBlock, endBlock);
            // todo: we can filter in or out transactions here
            const txNumbers = txs.length;
            const userRepresentation = {
                user,
                txNumbers
            };
            const referredUsers = await User.getByReferBy(Number(id));
            const promises = referredUsers.map(async (user) => {
                const userTxs = await BlockchainService.getTransactions(user.getAddress(), startBlock, endBlock);
                return {
                    user,
                    txNumbers: userTxs.length
                };
            });
            const referredUsersRepresentation = await Promise.all(promises);
            const score = RewardCalculator.calculateScore(userRepresentation, referredUsersRepresentation);
            const result =  {
                user: userRepresentation,
                referredUsers: referredUsersRepresentation,
                score
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