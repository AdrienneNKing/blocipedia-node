const wikiQueries = require("../db/queries.wikis.js")
const userQueries = require("../db/queries.users.js")
const markdown = require("markdown").markdown;

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
     wikiQueries.addWiki(newWiki, (err, wiki) => {
       if(err){
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
       wiki.body = markdown.toHTML(wiki.body)
       res.render("wikis/show", {markdown, wiki, user});
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
       wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
         if(err || wiki == null){
           res.redirect(404, `/wikis/${req.params.id}/edit`);
         } else {
           wiki.body = markdown.toHTML(wiki.body)
           res.redirect(`/wikis/${wiki.id}`);
         }
       });
     },

  addCollaborator(req, res, next) {
    wikiQueries.addCollaborator(req, (error, user) => {
      if(error) {
        console.log("There was an error: " + error);
        res.redirect("/");
      } else {
        res.redirect("/wikis/add-collaborator/success");
      }
    })
  },
  removeCollaborator(req, res, next) {
    wikiQueries.removeCollaborator(req, (error, user) => {
      if(error) {
        console.log("There was an error: " + error);
        res.redirect("/");
      } else {
        res.redirect("/wikis/remove-collaborator/success");
      }
    });
  },
  collaboratorSuccess(req, res, next) {
    res.render("wikis/addCollaboratorSuccess");
  },
  removeCollaboratorSuccess(req, res, next) {
    res.render("wikis/removeCollaboratorSuccess");
  }

}
