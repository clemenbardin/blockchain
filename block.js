const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block("01/01/2025", "0", "genesis-hash", []);
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = `hash-${this.chain.length + 1}`;

        const newBlock = new Block(timestamp, lastHash, hash, data);
        this.chain.push(newBlock);
    }
}

const myBlockChain = new Blockchain();
myBlockChain.addBlock({ sender: "Alice", receiver: "Bob", amount: 10 });
myBlockChain.addBlock("Deuxième bloc de données");

console.log(myBlockChain.chain);