var usersqls = {
    insert: 'INSERT INTO userinfo(id,username,userpass) VALUES(0,?,?)',
    queryCount: 'SELECT COUNT(1) AS num FROM userinfo WHERE username = ?',
    queryByusername: 'SELECT * FROM userinfo WHERE username = ?'
};
module.exports = usersqls;