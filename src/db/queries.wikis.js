const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;

module.exports = {
  getAllWikis(callback){
    return Wiki.findAll()

    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addWiki(newWiki, callback){
    return Wiki.create({
      title: newWiki.title,
      body: newWiki.body,
      private: newWiki.private,
      userId: newWiki.userId
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getWiki(id, callback){
    return Wiki.findById(id, {
      include: [
        {model: User, as: "users"}
      ]
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteWiki(id, callback){
    return Wiki.destroy({
      where: {id}
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateWiki(id, updatedWiki, callback){
     return Wiki.findById(id)
     .then((wiki) => {
       if(!wiki){
         return callback("wiki not found");
       }

       wiki.update(updatedWiki, {
         fields: Object.keys(updatedWiki)
       })
       .then(() => {
         callback(null, wiki);
       })
       .catch((err) => {
         callback(err);
       });
     });
   },

   updatePublic(id, callback) {
     return Wiki.findById(wiki.id)
       .then(wiki => {
         if (!wiki) {
           return callback("Wiki not found");
         } else {
           wiki.updateAttributes({ private: false })
           .then((wiki) => callback(null, wiki))
         }
       }).catch(error => {
         callback(error);
       });
  },

  addCollaborator(req, callback) {
    User.findOne({
      where: {
        email: req.body.collaborator
      }
    }).then(user => {
      if(!user) {
        console.log("User not found");
        callback("Error", "User not found");
      }
      Collaborator.create({
        wikiId: req.params.id,
        userId: user.id
      })
    }).then(collaborator => {
console.log("This is the collaborator", collaborator)
      callback(null, collaborator);
    }).catch(err => {
      callback(err, null);
    });
  },

  dropCollaborator(req, callback) {
    User.findOne({
      where: {
        email: req.body.collaborator
      }
    }).then(user => {
      if(!user){
        console.log("User doesn't exist");
        callback("Error", "User doesn't exist");
      }
      Collaborator.destroy({
        where: {
          wikiId: req.params.id,
          userId: user.id
        }
      }).catch(error => {
        callback(error);
      })
    })
  }



}
