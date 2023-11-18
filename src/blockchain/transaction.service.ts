import axios from 'axios';

const apiKey = 'B7BAQETWIJB91R86JDB5AK1S46U1DUNQUR';

async function fetchData(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
export default class BlockchainService {
    static async getTransactions(address: string, start: number, end: number) {
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&page=1&offset=1000&sort=asc&apikey=${apiKey}`;
        const data = await fetchData(url);
        return data.result;
    }
}