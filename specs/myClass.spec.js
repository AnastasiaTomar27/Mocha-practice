var MyClass = require("../src/myClass.js");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require ("chai");
var expect = chai.expect;
const chaiaspromise = require ("chai-as-promised");
chai.use(chaiaspromise);
const nock = require("nock");



describe("Test suit", function() {
    after(function() {
        //console.log("----------After the test suit");
    });
    before(function() {
        //console.log("----------Before the test suit");
    });
    afterEach(function() {
        //console.log("----------After each test case");
    });
    beforeEach(function() {
        //console.log("----------Before each test case");
        sinon.restore();
    });

    it("Test the add method", function() {
        expect(myObj.add(1, 2)).to.be.equal(3);
    });

    it("spy the add method", function() {
        var spy = sinon.spy(myObj, "add");
        var arg1 = 10, arg2 = 20;
        myObj.callAnotherFn(arg1, arg2);
        //sinon.assert.calledOnce(spy);
        //sinon.assert.calledTwice(spy);
        expect(spy.calledOnce).to.be.true;
        //expect(spy.calledTwice).to.be.true;
        expect(spy.calledWith(arg1, arg2)).to.be.true;
        //spy.restore();
    });

    it("copy spy the add method", function() {
        var spy = sinon.spy(myObj, "add");
        var arg1 = 10, arg2 = 20;
        myObj.callAnotherFn(arg1, arg2);
        //sinon.assert.calledOnce(spy);
        //sinon.assert.calledTwice(spy);
        expect(spy.calledOnce).to.be.true;
        //expect(spy.calledTwice).to.be.true;
        expect(spy.calledWith(arg1, arg2)).to.be.true;
    });

    it("spy the callback method", function() {
        var callback = sinon.spy();
        myObj.callTheCallback(callback);
        expect(callback.calledOnce).to.be.true;
    })

    it("mock the sayHello method", function() {
        var mock = sinon.mock(myObj);
        var expectation = mock.expects("sayHello");
        expectation.exactly(1);
        expectation.withArgs("Hello world!");
        myObj.callAnotherFn(10, 20);
        mock.verify();
    });
});

describe.skip("Test suit for stub", function() {
    it("Stub the add method", function() {
        var stub = sinon.stub(myObj, "add");
        //stub.withArgs(10, 20).returns(100);
        stub
        .withArgs(10, 20)
        .onFirstCall().returns(100)
        .onSecondCall().returns(200);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(2000);
    });
});

// describe("Test the promise", function() {
//     it("Promise test case", function(done) {
//         //this.timeout(5000);
//         this.timeout(0);
//         myObj.testPromise().then(function(result) {
//         expect(result).to.be.equal(6);
//         //expect(false).to.be.false;
//         done();
//       });  
//     });
// });

describe.skip("Test the promise", function() {
    it("Promise test case", function() {
        this.timeout(0);
        return expect(myObj.testPromise()).to.eventually.equal(62);
       
    });
});

// describe("XHR test suit", function() {
//     it("Mock and stub xhr call", function(done) {
//         this.timeout(0);
//         myObj.xhrFn().then(function(result) {
//             console.log(result);
//             done();
//         });
//     });
// });

describe("XHR test suit", function() {
    it("Mock and stub xhr call", function(done) {
        const scope = nock("https://api.sampleapis.com").post("/coffee/hot").reply(200, {title: "Black Coffee" })
        //const scope = nock("https://echo-service-new.herokuapp.com").post("/echo").reply(200, {id: 123 })

        myObj.xhrFn().then(function(result) {
            console.log(result);
            done();
        });
    });
});

// describe("XHR test suit", function() {
//     it("Mock and stub xhr call", function(done) {
//         const scope = nock("https://api.sampleapis.com").post("/coffee/hot").reply(200, {id: 123});
//         myObj.xhrFn().then(function(result) {
//             expect(result).to.be.equal({id: 123});
//             done();
//         })
//         .catch(error => {
//             done(new Error("test case failed"));
//         })
//     });
// });
