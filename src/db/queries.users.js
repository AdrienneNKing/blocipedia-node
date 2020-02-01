const User = require("./models").User;
const bcrypt = require("bcryptjs");

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
         .then((user) => callback(null, user))
       }
     }).catch(error => {
       callback(error);
     });
},
}
