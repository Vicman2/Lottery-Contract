const assert = require("assert");
const { cp } = require("fs");
const ganache = require("ganache")
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())
const {interface, bytecode} = require("../compile")



// class Car{
//     park(){
//         return "Stopped";
//     }

//     drive(){
//         return "Vroom";
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })



// describe("Car", ()=>{
//     it("Can drive", () =>{
//         assert.equal(car.park(), "Stopped");
//     });

//     it("Can drive", () => {
//         assert.equal(car.drive(), "Vroom")
//     })
// })

let allAccounts 
let inbox 

beforeEach(async() => {
    // Get a list of all accounts
    allAccounts = await web3.eth.getAccounts()

    // Use on of those accounts to deploy the contract
    inbox = await new web3.eth
        .Contract(interface)
        .deploy({data:bytecode, arguments:["Hi there!"]})
        .send({from:allAccounts[0], gas:"1000000"})
    })

describe("Inbox", () => {
    it("Deploys a contract", () =>{
        assert.ok(inbox.options.address);
    })

    it("Has a default message", async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hi there!")
    })

    it("Can change the message", async () => {
        await inbox
            .methods
            .setMessage("bye")
            .send({from: allAccounts[0]})

        const message = await inbox.methods.message().call();
        assert.equal(message, "bye")
    })
})