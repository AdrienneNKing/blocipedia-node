const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;

describe ("Wiki", () => {
  beforeEach((done) => {
this.wiki;
this.user;
sequelize.sync({force: true}).then((res) => {
  User.create({
    email: "testemail@testing.com",
    password: "FunctioningPassword3"
  })

  .then((user) => {
    this.user = user;

    Wiki.create({
      title: "Testing Wiki",
      description: "Testing patience, wikis, and code in general",
      userId: this.user.id
    })
  })
})


describe("#create()", () => {

   it("should create a wiki object with a title, body, and assigned wiki and user", (done) => {

    Wiki.create({
       title: "Pros of Cryosleep during the long journey",
       body: "1. Not having to answer the 'are we there yet?' question.",
       wikiId: this.wiki.id,
       userId: this.user.id
     })
     .then((wiki) => {

       expect(wiki.title).toBe("Pros of Cryosleep during the long journey");
       expect(wiki.body).toBe("1. Not having to answer the 'are we there yet?' question.");
       expect(wiki.wikiId).toBe(this.wiki.id);
       expect(wiki.userId).toBe(this.user.id);
       done();

     })
     .catch((err) => {
       console.log(err);
       done();
     });
   });

 });
})
})
