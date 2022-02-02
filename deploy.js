const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const {interface, bytecode} = require("./compile");
require("dotenv").config()

const thePublicKey = process.env.WALLET_PRIVATE_KEY
const walletURL = process.env.WALLET_HOSTING_URL


const provider = new HDWalletProvider(
    thePublicKey,
    walletURL
)

const web3 = new Web3(provider)

async function deploy(){
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploying from account", accounts[0])

    const result = await new web3.eth.Contract(interface)
        .deploy({data:bytecode, arguments:["Hi there!"]})
        .send({gas: "1000000", from:accounts[0] })
    console.log("Contract Deployed to",  result.options.address)
}

deploy()

