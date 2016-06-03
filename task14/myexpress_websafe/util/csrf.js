var crypto = require('crypto');

module.exports = {
    createToken: function() {
        console.log("session创建成功");
        return crypto.randomBytes(34).toString('hex');
    }
}
