import userDataAccess from '../dataAccess/user';
import randomString from '../utils/randomString';

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
        return 'refer.eth/' + randomString(64);
    }

    private static fromDB(user: userDataAccess): User {
        return new User(user.id, user.name, user.address, user.referLink, user.referBy, user.password);
    }

    public static async create(name: string, address: string, referBy: number, password: string): Promise<User> {
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

    public static async getByReferLink(link: string) {
        const userData = await userDataAccess.findOne(
            {
                where: {referLink: link}
            }
        )
        if (userData) {
            return this.fromDB(userData);
        }
        throw new Error(`User not found with this refer link: ${link}`);
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
}

module.exports = User;