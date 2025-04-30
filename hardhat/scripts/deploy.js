const hre = require("hardhat");
 async function main() {
    // TP  Déployer un Smart Contract sur Ethereum Testnet
const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
 const hello = await HelloWorld.deploy("Bonjour, Blockchain !");
 await hello.waitForDeployment();
 console.log(`Contrat déployé à l'adresse ${hello.target}`);
 }

 main().catch((error) =>
 console.error(error).HelloWorld
 process.exitCode = 1;
 );