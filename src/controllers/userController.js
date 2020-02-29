const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js")
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require("stripe")("sk_test_snbmFObPKMJH63PNPU1GIxpD00Jk4RSl0G");

const msg = {
  to: 'adriennenking@gmail.com',
  from: 'test@adriennes-blocipedia.com',
  subject: 'Sign-Up Confirmation',
  text: 'Thank you for your signup',
  html: '<strong>Thank you for your signup</strong>',
};

module.exports = {
  signUp(req, res, next){
    sgMail.send(msg);
    res.render("users/sign_up");
  },

  create(req, res, next){

     let newUser = {
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };

     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/sign_up");
       } else {


         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
   },

   signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
     passport.authenticate("local")(req, res, function() {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },

   payment(req, res, next){
     if (!req.user) {
      res.redirect("/");
    } else {
      res.render("users/upgrade");
    }
  },

  upgradeSuccess(req, res, next) {
    if (!req.user) {
      res.redirect("/")

    } else {
      userQueries.upgradeUser(req.user, (error, user) => {
        if (error || user == null) {
        } else {
          req.flash("notice", "Thank you for upgrading!")
          res.redirect("/users/upgrade");
        }
      });
    }
  },

  cancel(req, res, next){
    if (!req.user) {
     res.redirect("/");
   } else {
     res.render("users/cancel");
   }
 },

 primeMember(req, res, next){
   if (!req.user) {
    res.redirect("/");
  } else {
    res.render("users/prime");
  }
},

  cancellationSuccess(req, res, next) {
    if (!req.user) {
      res.redirect("/")

    } else {
      userQueries.downgradeUser(req.user, (error, user) => {
        if (error || user == null) {
          console.log("Error: " + error);
        } else {
          console.log("Cancellation successful");
          req.flash("notice", "Sorry to lose you as a prime user")
          res.redirect("/users/cancelled");
        }
      });
    }
  },

  showCollaborators(req, res, next) {
    if(!req.user) {
      res.render("/");
    } else {
      userQueries.getCollaborators(req.params.id, (err, wikis) => {
        if(err || wikis == null) {
          console.log("This is your error: " + err);
          res.redirect("/");
        } else {
          res.render("users/collaborate.ejs", { wikis })
        }
      })
    }
  },

}
