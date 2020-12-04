const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
	series:String,
	image:String,
	data:String,
	premise:String,
	link:String,
	watch:String,
	author:{
		id:{		
	    type:mongoose.Schema.Types.ObjectId,
		ref:"User"
},
		   username:String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});

module.exports = mongoose.model("home",homeSchema);