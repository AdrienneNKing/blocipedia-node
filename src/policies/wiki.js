const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  _isPrivate() {
    return this.record && this.record.private == "true"
  }


}
