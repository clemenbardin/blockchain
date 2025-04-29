const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('./config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}
        `;
    }

    static genesis() {
        return new Block(
            'Genesis Time',
            '-------------',
            'f1r57-h45h',
            [],
            0,
            DIFFICULTY
        );
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastBlock.hash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new Block(timestamp, lastBlock.hash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
      }
    
      static blockHash(block) {
        return Block.hash(
          block.timestamp,
          block.lastHash,
          block.data,
          block.nonce,
          block.difficulty
        );
      }
      static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        const difference = currentTime - lastBlock.timestamp;
        
        const newDifficulty = difference > MINE_RATE ? difficulty - 1 : difficulty + 1;
        return Math.max(newDifficulty, 1);
    }
}

module.exports = Block;