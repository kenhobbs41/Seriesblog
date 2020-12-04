const express = require("express"),
 router = express.Router(),
 home = require("../models/home"),
 middlewareobj = require("../middleware");




router.get("/",function(req,res){
home.find({},function(err, allhome){
		if(err){
			console.log(err);
		}else{
			res.render("home",{home:allhome,currentUser:req.user});
		}
	});
});

router.post("/",function(req,res){
	const series=req.body.series,
	 image=req.body.image,
	 data=req.body.data,
     premise =req.body.premise,
	 link=req.body.link,
	 watch=req.body.watch,
		  author = {
		id:req.user._id,
		username:req.user.username
	},
	 newhome = {series:series,image:image,data:data,premise:premise,link:link,watch:watch,author:author};
	home.create(newhome,function(err,newone){
		if(err){
			console.log(err);
		}else{
			res.redirect("/home");
		}
	});
});



router.get("/newkh41",middlewareobj.isLoggedIn,function(req,res){
	res.render("new")
});
	
router.get("/:id",function(req,res){
	home.findById(req.params.id).populate("comments").exec(function(err,foundhome){
		if(err){
			console.log(err);
		}else{
				res.render("show",{home:foundhome});
		}
	});
});

router.get("/:id/edit",middlewareobj.checkownership,function(req,res){
	
		home.findById(req.params.id,function(err,foundhome){
		res.render("edit",{home : foundhome});
	});	
});

router.put("/:id",middlewareobj.isLoggedIn,function(req,res){
	home.findByIdAndUpdate(req.params.id,req.body.home,function(err,updatehome){
		if(err){
			res.redirect("/home");
		}else{
			res.redirect("/home/" + req.params.id);
		}
	
	});
});

router.delete("/:id",middlewareobj.checkownership,function(req,res){
	home.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/home");
		}else{
			res.redirect("/home");
		}
	});
});






module.exports = router;