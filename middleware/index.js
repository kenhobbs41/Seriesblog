var home = require("../models/home");
var Comment = require("../models/comments");

var middlewareobj = {};

middlewareobj.checkownership = function(req,res,next){
	if(req.isAuthenticated()){
		home.findById(req.params.id,function(err,foundhome){
		if(err){
			req.flash("error","Something went wrong");
			res.redirect("back");
		} else{
			if(foundhome.author.id.equals(req.user._id)|| req.user.isAdmin){
			next();
           }else{
			   req.flash("error","You don't have the permission");
			   res.redirect("back");
		   }
		}
	});	
	}else{
		  req.flash("error","Something went wrong");
				res.redirect("back");

	}
	
};

middlewareobj.checkcommentownership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back");
		} else{
			if(foundcomment.author.id.equals(req.user._id)|| req.user.isAdmin){
			next();
           }else{
			   req.flash("error","You don't have the permission");
			   res.redirect("back");
		   }
		}
	});	
	}else{
		    req.flash("error","Something went wrong");
				res.redirect("back");

	}
};

middlewareobj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First!");
	res.redirect("/login");
}
module.exports = middlewareobj;