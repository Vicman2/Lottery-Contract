const path = require("path")
const fs = require("fs")
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");
let input = {
    
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}
let output =JSON.parse( solc.compile(JSON.stringify(input)))

const interface = output.contracts['Inbox.sol'].Inbox.abi;
const bytecode = output.contracts['Inbox.sol'].Inbox.evm.bytecode.object;



module.exports = {
    interface, 
    bytecode
}