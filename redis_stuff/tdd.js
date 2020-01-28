const { CreateMockData } = require("./mock-data");
const mock = new CreateMockData()
const {Caller} = require('../caller.js');  /// Just a logger 
const caller = new Caller(); /// Essentially a fancy console.log

function test1() {
    let actual = []
    for ( let i = 0; i < 3; i++ ) { 
        const obj = mock.getMock()
        actual.push(obj.sNumber)
    }
    const expected = [1,2,3] 
    const isOk = JSON.stringify(expected) === JSON.stringify(actual)  
    caller.verdict(isOk, "mock data")
}



test1()