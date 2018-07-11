var express = require("express");
var fs = require("fs");//need this whenwe what to read/write from files
var formidable = require('express-formidable');//using for our middleware
var app = new express();
require('events').EventEmitter.prototype._maxListeners = 100;


app.use(formidable());

const Hotel = require("./models/hotel");
const Review = require("./models/review");
const HotelCollection = require("./models/hotelCollection");

var hotelCollection = new HotelCollection();

var hotel2 = new Hotel("hilton metropole","london");
hotelCollection.add(hotel2);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////GET SINGLE REVIEW/////////////////////////////////////////////////////////////////////
// app.get("/hotels/:hotelSlug/reviews/:reviewId", function(request,response){//waiting for a get request for a single review from a hotel
//     let tempUrlSlug = request.params.hotelSlug
//     console.log(tempUrlSlug);
//     // let tempParams = request.params
//     // console.log(tempParams);



//     // let reviewNumber = arrayOfRequest[4]

//     // // console.log(tempUrlSlug);
//     // let tempReviewList = hotelCollection.getReviewsOfHotel(tempUrlSlug);
//     // let tempHotel = hotelCollection.getHotelSpecified(tempUrlSlug);

//     // let tempSpecificReview = [];
//     // tempSpecificReview.push(tempReviewList[reviewNumber]);

//     // console.log(tempSpecificReview)
//     // console.log(tempHotel);
//     // //console.log(tempReviewList);
//     // let tempObj ={"hotel":tempHotel, "reviewList":tempSpecificReview}
//     // console.log(tempObj);
//     // response.send(tempObj);
//     response.send("GOT Single Hotel Review")
// })

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////DELETE SINGLE REVIEW/////////////////////////////////////////////////////////////////////
// app.delete(/\/hotels\/.*\/reviews\/\d+/, function(request,response){//waiting for a delete request to delete a single review from a hotel
//     response.send("DELETED Hotel Review")
// })

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////AMEND SINGLE REVIEW/////////////////////////////////////////////////////////////////////
// app.patch(/\/hotels\/.*\/reviews\/\d+/, function(request,response){//waiting for a patch request to amend a single review from a hotel
//     response.send("AMENDED Single Hotel Review")
// })

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////ADD A REVIEW////////////////////////////////////////////////////////////////////////
// app.post(/\/hotels\/.*\/reviews/, function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
//     console.log(request.fields)
//     let ratings = request.fields.rating;
//     let comment = request.fields.comment;
//     let hotelName = request.fields.hotelname;
   
//     let reviewHolder = new Review(ratings,comment);//creating a new review passing on the info received in the post

//     for(let hotel of hotelCollection.hotels){
//         if(hotel.name == hotelName){
//             hotel.addReview(reviewHolder);
//             //console.log(hotel.averageRating)
//         }
//     }

//     // hotelCollection.hotels = hotelCollection.hotels.filter(function(obj) {//adding review to the correct hotel
//     //     if(obj.name == hotelName){
//     //         console.log("we have a match");
//     //         obj.addReview(reviewHolder)
//     //         console.log(obj)
//     //     }
//     //     return obj;
//     //   });
    
//       response.redirect("/")
// });

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////GET REVIEWS OF A HOTEL/////////////////////////////////////////////////////////////////////
// app.get(/\/hotels\/.*\/reviews/, function(request,response){//waiting for a post request from the end url (/) one it receives the request it makes a new hotel object and adds it to the hotelCollection obj
//     let arrayOfRequest = request.url.split("/");
//     let tempUrlSlug = arrayOfRequest[2]
//     console.log(tempUrlSlug);
//     let tempReviewList = hotelCollection.getReviewsOfHotel(tempUrlSlug);
//     let tempHotel = hotelCollection.getHotelSpecified("/hotels/"+tempUrlSlug);//have to add the /hotels/ to the urlslug as the gethotelspecified method requires the url to be in this format when comparing 
//     console.log(tempHotel);
//     console.log(tempReviewList);
//     let tempObj ={"hotel":tempHotel, "reviewList":tempReviewList}
//     console.log(tempObj);
//     response.send(tempObj);
// });

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////GET A SINGLE HOTEL/////////////////////////////////////////////////////////////////////
// app.get(/(\/hotels\/[a-z, _]+)([^/]{2})/, function(request,response){//waiting for a get request to the end url (/hotels/hotel.urlslug)
//     // console.log(request.url)
//     let tempHotelHolder = hotelCollection.getHotelSpecified(request.url)
//     //console.log(tempHotelHolder)
//     response.status(200).send(tempHotelHolder)
// })


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////DELETE A HOTEL/////////////////////////////////////////////////////////////////////////
app.delete("/hotels/:urlSlug", function(request,response){//waiting for a delete request to the end url (/hotels/hotel.urlslug)
    console.log(request.params.urlSlug)
    let urlSlugHolder = request.params.urlSlug;
    //console.log(request.query)
    hotelCollection.removeHotel(urlSlugHolder);
    // console.log("I have just removed "+request.url+" from hotel list")
    // response.status(204).send(hotelCollection.hotels)
    response.status(204)

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////GET A LIST OF HOTELS/////////////////////////////////////////////////////////////////////
app.get("/hotels", function(request,response){//waiting for a get request to the end url (/hotels) once it gets a request it sends the hotelCollection obj
   console.log("I have given you a list of the hotels")
    response.status(200).send(hotelCollection.hotels);
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////HOME PAGE//////////////////////////////////////////////////////////////////////////////
app.post("/hotels", function(request,response){//waiting for a get request to the home page (/) once it receives the request it responds by sending the home page (index.html)

    let hotelName = request.query.name
    let hotelCity = request.query.city
    let tempHotel = new Hotel(hotelName,hotelCity);
    hotelCollection.add(tempHotel);

    response.status(201).send(tempHotel);
    response.end("Ended");

});




app.listen(3000,function(){//our server is listening on port 3000
    console.log("I am listening on port 3000");
});


//  \/hotels\/.*\/reviews\/\d+  regex for  text similar to /hotels/hilton_metropole_london/reviews/2

module.exports = app;