const mongoose = require("mongoose"),
	  home = require("./models/home"),
	  Comment = require("./models/comments");

const content = [{
	series:"Prison Break",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_JTgVAgT2F2RZVOcoHLSkf7Z2hjJo54nYrg&usqp=CAU",data:"It is actually a mind blowing one"
}]
function seedDB(){
	home.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
			console.log("Content removed");
		});
		
	// 	content.forEach(function(seed){
	// 		home.create(seed,function(err,homes){
	// 			if(err){
	// 				console.log(err);
	// 			}else{
	// 				console.log("added a Series");
				
	// 				Comment.create(
	// 				{
	// 					text:"Blahhhhhhhh",
	// 				},function(err, comment){
	// 					if(err){
	// 						console.log(err);
	// 					}else{
	// 						homes.comments.push(comment);
	// 						homes.save();
	// 						console.log("added a new one");
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
	// });
}

module.exports = seedDB;