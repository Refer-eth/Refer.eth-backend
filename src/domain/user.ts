import userDataAccess from '../dataAccess/user';
import randomString from '../utils/randomString';
import BlockchainService from "../blockchain/transaction.service";
import convertToENSAddress from "../utils/ENS";
import RewardCalculator from "./reward.calculator";

const startBlock = 18590000;
const endBlock = 1000000000;

export default class User {
    private readonly id: number;

    private readonly name: string;

    private readonly address: string;

    private readonly referLink: string;

    private readonly referBy: number;

    private readonly password: string;

    constructor(id: number, name: string, address: string, referLink: string, referBy: number, password: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.referLink = referLink;
        this.password = password;
        this.referBy = referBy;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getAddress(): string {
        return this.address;
    }

    public getReferLink(): string {
        return this.referLink;
    }

    public getReferBy(): number {
        return this.referBy;
    }

    public checkPassword(password: string): boolean {
        return password === this.password;
    }

    private static generateReferLink(): string {
        return 'https://refer.eth/refer?refer_id=' + randomString(32);
    }

    private static getReferLink(Id: string): string {
        return 'https://refer.eth/refer?refer_id=' + Id;
    }

    private static fromDB(user: userDataAccess): User {
        return new User(user.id, user.name, user.address, user.referLink, user.referBy, user.password);
    }

    public static async create(name: string, address: string, password: string,  referBy?: number): Promise<User> {
        const referLink = this.generateReferLink();
        const user = await userDataAccess.create({ name, address, referLink, referBy, password } as unknown as userDataAccess);
        return this.fromDB(user);
    }

    public static async getById(id: number) {
        const userData = await userDataAccess.findOne(
            {
                where: {id}
            }
        );
        if (userData) {
            return this.fromDB(userData);
        }
        throw new Error(`User not found for id: ${id}`);
    }

    public static async getByReferBy(referBy: number) {
        const userData = await userDataAccess.findAll(
            {
                where: {referBy}
            }
        )
        return userData.map((user) => {
            return this.fromDB(user);
        });
    }

    public static async getByReferId(id: string) {
        const userData = await userDataAccess.findOne(
            {
                where: {referLink: User.getReferLink(id)}
            }
        )
        if (userData) {
            return this.fromDB(userData);
        }
        throw new Error(`User not found with this refer id: ${id}`);
    }

    public static async getByAddress(address: string) {
        const userData = await userDataAccess.findOne(
            {
                where: {address}
            }
        )
        if (userData) {
            return this.fromDB(userData);
        }
        throw new Error(`User not found for address: ${address}`);
    }

    async getPresentationUser() {
        const txs = await BlockchainService.getTransactions(this.address, startBlock, endBlock);
        // todo: we can filter in or out transactions here
        const txNumbers = txs.length;
        const address = await convertToENSAddress(this.address) || this.address;
        return {
            id: this.id,
            name: this.name,
            address,
            referLink: this.referLink,
            referBy: this.referBy,
            txNumbers,
            scoreForReferrer: RewardCalculator.calculateScoreForReferrer(txNumbers),
        };
    }
}

module.exports = User;