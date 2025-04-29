const { WebSocket, Server } = require('ws');

class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Server({ port: process.env.P2P_PORT || 5001 });
    server.on('connection', (socket) => this.connectSocket(socket));
    console.log(`Listening for peer-to-peer connections on: ${process.env.P2P_PORT || 5001}`);
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers() {
    const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const chain = JSON.parse(message);
      this.blockchain.replaceChain(chain);
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChain() {
    this.sockets.forEach(socket => this.sendChain(socket));
  }
}


module.exports = P2PServer;