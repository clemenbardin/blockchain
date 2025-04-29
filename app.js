const express = require('express');
const Blockchain = require('./blockchain');
const P2PServer = require('./p2p-server')

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2PServer(blockchain);

app.use(express.json());

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
})

app.post('/mine', (req, res) => {
    const { data } = req.body;
    blockchain.addBlock(data);
    p2pServer.syncChain();
    res.redirect('/blocks');
})

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const P2P_PORT = process.env.P2P_PORT || 5001;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});

p2pServer.listen();