const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request('http://localhost:3000');

describe("Create a new hotel",function(){
    it('should create a new hotel', function (done) {
        request.post('/hotels/?name=Hilton&city=Rohm').end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          console.log(res.body)
          let result = res.body.urlSlug;
          //expect(res.body).to.include({name:"Hilton", city:"Rohm"})
          expect(result).to.equal('hilton_rohm')
          done();
        })
      });
})


describe("Returns hotels",function(){
    it('should return all hotels', function (done) {
        request.get('/hotels').end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        var result = res.body.find(function(element) {
            return element.name == "Hilton";
        });
          expect(result).to.include({name: 'Hilton', city: 'Rohm'})
        //   expect(res).to.be.json
        //   console.log(res.body)
        //   expect(res.body).to.include({name: 'Foo', due: '2015-01-01'})
          done();
        })
      });
})



// describe("Gets a hotel",function(){
//     it('returns the hotel hilton metropole ', function (done) {
//         request.get('/hotels/hilton_metropole_london').end(function(err, res) {
//           expect(res).to.have.status(200);
//           console.log(res);
//           expect(res).to.be.json;
//           expect(res.body).to.eql(new Hotel("hilton metropole","london"))
//         //   console.log(res.body);
//         //   expect(res).to.be.json
//         //   console.log(res.body)
//         //   expect(res.body).to.include({name: 'Foo', due: '2015-01-01'})
//           done();
//         })
//       });
// })


describe("deletes a hotel",function(){
    it('delete the hotel hilton metropole ', function (done) {
        request.delete('/hotels/hilton_metropole_london').end(function(err, res) {
        })
        request.get("/hotels").end(function(err,res){
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          var result = res.body.find(function(element) {
            return 
        });


        })
            console.log(res.body.urlSlug);

            let tempName = "hilton metropole";
            let result;

            for(let hotel of res.body){
                if(hotel.name == tempName){
                result = false;
            }else{
                result = true
            }
        }
      }
    )
    })})


        
//           //console.log(res.body);
//           expect(res).to.have.status(204);
//           expect(result).to.equal(true);
//         //   expect(res).to.eql(new Hotel("hilton metropole","london"))
//         //   console.log(res.body);
//         //   expect(res).to.be.json
//         //   console.log(res.body)
//         //   expect(res.body).to.include({name: 'Foo', due: '2015-01-01'})
//           done();
//         })
//       });
// })