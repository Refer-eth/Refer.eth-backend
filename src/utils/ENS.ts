import {ethers} from 'ethers';

// example address: 0x839395e20bbB182fa440d08F850E6c7A8f6F0780
// output: griff.eth

export default async function convertToENSAddress(ethereumAddress: string): Promise<string | null> {
    try {
        const provider = ethers.getDefaultProvider("mainnet");
        return await provider.lookupAddress(ethereumAddress);
    } catch (error) {
        console.error('Error converting Ethereum address to ENS address:', error);
        return null;
    }
}
