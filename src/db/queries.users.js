const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");
const Collaborator = require("./models").Collaborator;
module.exports = {

  createUser(newUser, callback){


    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);


    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  upgradeUser(user, callback) {
    return User.findById(user.id)
      .then(user => {
        console.log("Upgrade User:", user)
        if (!user) {
          return callback("User not found");
        } else {
          console.log("Upgrade query attempted");
          user.updateAttributes({ role: 'premium' })
          .then((user) => callback(null, user))
        }
      }).catch(error => {
        callback(error);
      });
    },

  downgradeUser(user, callback) {
     return User.findById(user.id)
       .then(user => {
         if (!user) {
           return callback("User not found");
         } else {
           user.updateAttributes({ role: 'member' })
           .then((user) => {
             Wiki.update({private: false}, {where: {userId: user.id}})
              .then((wikis) => {
                console.log(wikis);
                callback(null, user)
              })

         })
        }
       }).catch(error => {
         callback(error);
       });
  },

  getCollaborators(id, callback) {
    return Wiki.find({
      include: [{
        model: Collaborator,
        as: "collaborators",
        where: {userId: id}
      }]
    }).then(wikis => {
      callback(null, wikis);
    }).catch(err => {
      callback(err);
    });
  }

}
