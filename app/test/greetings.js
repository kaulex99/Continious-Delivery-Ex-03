//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('/GET greetings', () => {
    it('it should GET all the greetings', (done) => {

        chai.request(server)
            .get('/greetings')
            .end((err, res) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                // console.log(body);

                body.data.length.should.be.eql(3);
                done();
            });
    });
});