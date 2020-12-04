const express = require("express"),
 router = express.Router({mergeParams: true}),
 home = require("../models/home"),
 Comment = require("../models/comments"),
 middlewareobj = require("../middleware");

router.get("/new",middlewareobj.isLoggedIn,function(req,res){
	console.log(req.params.id);
	home.findById(req.params.id,function(err,home){
		if(err){
			console.log(err);
		}else{
			res.render("newcomment",{home:home});
		}
	});
});
//Posting the comment
router.post("/",middlewareobj.isLoggedIn,function(req,res){
	home.findById(req.params.id,function(err,home){
		if(err){
			console.log(err);
			res.redirect("/home");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong");
					console.log(err)
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
			        comment.save();
					home.comments.push(comment);
					home.save();
					res.redirect("/home/" + home._id);
				}
			});
		}
	});
});

// router.get("/:comment_id/edit",middlewareobj.checkcommentownership,function(req,res){
// 	Comment.findById(req.params.comment_id,function(err,foundcomment){
// 		if(err){
// 			res.redirect("back");
// 		}else{
// 				res.render("comments/edit",{home_id: req.params.id,comment:foundcomment});
// 		}
// 	});
// });
router.put("/:comment_id",middlewareobj.checkcommentownership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/home/" + req.params.id);
		}
	});
});
router.delete("/:comment_id",middlewareobj.checkcommentownership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/home/" + req.params.id);
		}
	});
});



module.exports = router;