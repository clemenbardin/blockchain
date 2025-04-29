// Pour les imports nommés
const { genesis, mineBlock, blockHash } = require('./block');

class Blockchain {
  constructor() {
    this.chain = [genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = mineBlock(lastBlock, data);
    this.chain.push(block);
    return block;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(genesis())) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== blockHash(block) ||
        Math.abs(lastBlock.difficulty - block.difficulty) > 1
      ) return false;
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than current chain.');
      return;
    }

    if (!Blockchain.isValidChain(newChain)) {
      console.log('Received chain is invalid.');
      return;
    }

    this.chain = newChain;
  }
}

module.exports = Blockchain;