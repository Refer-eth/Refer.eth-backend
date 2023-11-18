

const userTransactionFactor = 10;
const referredUserTransactionFactor = 5;

export default class RewardCalculator {
    static calculateScore(userData: any, referredUsersData: any){
        const referralScore = referredUsersData.reduce((acc: number, user: any) => {
            return acc + user.txNumbers * referredUserTransactionFactor;
        }, 0);
        return userData.txNumbers * userTransactionFactor + referralScore;
    }

    static calculateScoreForReferrer(txNumbers: any){
        return txNumbers * referredUserTransactionFactor;
    }
}