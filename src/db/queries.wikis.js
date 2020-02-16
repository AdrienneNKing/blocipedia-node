const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;
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


}
