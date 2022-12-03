const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile.js");

const provider = new HDWalletProvider(
  /*mnemonic phrase here*/ "",
  "https://goerli.infura.io/v3/baa4a4602a704361880111fa822875ce"
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Trying to deploy from account :" + accounts[1]);
  const inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi There!"] })
    .send({ from: accounts[1], gas: "1000000" });
  console.log("Address of contract is " + inbox.options.address);
  provider.engine.stop();
};
deploy();
