import {Alchemy, Network, Utils, Wallet} from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

/**
 * Returns the last blocks created
 * @param {Number}  num Number of last blocks
 * @return {Array} block Array of last blocks
 */
async function getLastBlock(num) {
    let blockNumberEnd = await alchemy.core.getBlockNumber();
    let blockNumberStart = blockNumberEnd - num;
    let blocks = [];
    for (let i = blockNumberStart; i < blockNumberEnd ; i++) {
        let block = await alchemy.core.getBlock(i);
        blocks.push(block);
    }
    return blocks;
}

async function getLastTransactions(num) {
    let blockNumber = await alchemy.core.getBlockNumber();
    let block = await alchemy.core.getBlock(blockNumber);
    let transactions = [];
    for (let i=0; i < num ; i++) {
        let hash = block.transactions[i];
        let transaction = await alchemy.core.getTransaction(hash);
        transactions.push(transaction);
    }
    return transactions;
}

async function getBlock(_hash) {
    if (!_hash) return '';
    let block = await alchemy.core.getBlock(_hash);
    return block;
}

async function getTransaction(_hash) {
    if (!_hash) return '';
    let transaction = await alchemy.core.getTransaction(_hash);
    return transaction;
}

async function getGasPrice() {
    let gasPrice= await alchemy.core.getGasPrice()
    console.log("getGasPrice -- gasPrice: ", gasPrice);
    return gasPrice;
}

async function getBalance(_address) {
    if (!_address) return '';
    let balance= await alchemy.core.getBalance(_address);
    console.log("getBalance -- balance: ", balance);
    return balance;
}

async function getNetwork() {
    let network= await alchemy.core.getNetwork();
    console.log("getNetwork -- network: ", network);
    return network;
}

function formatHashTitle(_hash) {
    if (!_hash) return '';
    let title = _hash.slice(0, 18) + "..." +  _hash.slice(_hash.length - 12);
    return title;
}

async function getTransactionFromAdreess(_fromBlock, _fromAddress, ) {
    const data = await alchemy.core.getAssetTransfers({
        fromAddress: _fromAddress,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    console.log("Data:  ", data);
    return data;
}

async function getTransactionToAdreess(_toBlock, _toAddress, ) {
    console.log("_toBlock  ", _toBlock);
    const data = await alchemy.core.getAssetTransfers({
        toAddress: _toAddress,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    console.log("Data:  ", data);
    return data;
}
async function findContractDeployer(contractAddress) {
    let contractDeployer= await alchemy.core.findContractDeployer(contractAddress);
    console.log("findContractDeployer -- contractDeployer: ", contractDeployer);
    return contractDeployer;
}
function getBlockNumber() {
    let blockNumber = alchemy.core.getBlockNumber();
    return blockNumber;
}

function formatTransferValue(value, asset) {
    let retVal = '';
    if(asset === 'USDT') {
        retVal = value.toLocaleString(undefined, { minimumFractionDigits: 2 });
    } else if (asset === 'ETH'){
        retVal = value.toLocaleString(undefined, { minimumFractionDigits: 10 });
    } else {
        retVal = value;
    }
    return retVal;
}

export { getTransactionToAdreess, formatTransferValue, getTransactionFromAdreess, getLastBlock, getBlock, getBlockNumber, getLastTransactions, getGasPrice, getBalance, getNetwork, getTransaction, formatHashTitle };