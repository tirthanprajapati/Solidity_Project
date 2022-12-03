const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile.js");

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Contract", () => {
  it("Deploys a Contract", () => {
    assert.ok(inbox.options.address);
  });
  it("returns a msg", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });
  it("sets a msg", async () => {
    await inbox.methods.setMessage("Helloo").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Helloo");
  });
});
