const wikiQueries = require("../db/queries.wikis.js")
const userQueries = require("../db/queries.users.js")

module.exports = {
  index(req, res, next){
    const user = req.user;
    wikiQueries.getAllWikis((err, wikis) => {
      if(err){
        res.redirect(200, "static/index");
      } else {
        res.render("wikis/index", {wikis, user});
      }
    })
  },

  new(req, res, next){
    const user = req.user;
    res.render("wikis/new", {user});
  },

  create(req, res, next){
     let newWiki = {
       title: req.body.title,
       body: req.body.body,
       private: !!req.body.private,
       userId: req.user.id
     };
     console.log("The new wiki is:", newWiki);
     console.log("Wiki userId:", newWiki.userId)
     wikiQueries.addWiki(newWiki, (err, wiki) => {
       console.log("Wiki userId part 2:", newWiki.userId)
       if(err){
        console.log(err);
         res.redirect(500, "/wikis/new");
       } else {
         res.redirect(303, `/wikis/${wiki.id}`);
       }
     });
  },

 show(req, res, next){
   wikiQueries.getWiki(req.params.id, (err, wiki) => {
     const user = req.user;
     console.log(user);
     if(err || wiki == null){
       res.redirect(404, "/");
     } else {
       res.render("wikis/show", {wiki, user});
     }
   })
 },

 destroy(req, res, next){
   wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
     if(err){
       res.redirect(500, `/wikis/${wiki.id}`)
     } else {
       res.redirect(303, "/wikis")
     }
   })
 },

 edit(req, res, next){
     wikiQueries.getWiki(req.params.id, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(404, "/");
       } else {
         res.render("wikis/edit", {wiki});
       }
     });
   },

   update(req, res, next){

     console.log(req.params);
       wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {

         if(err || wiki == null){
           res.redirect(404, `/wikis/${req.params.id}/edit`);
         } else {
           res.redirect(`/wikis/${wiki.id}`);
         }
       });
     }

}
