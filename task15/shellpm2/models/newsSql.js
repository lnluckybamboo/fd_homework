var newsSqls = {
    insert: 'INSERT INTO news(newstitle, newstype, newsimg, newscontent, addtime) VALUES(?,?,?,?,?)',
    update: 'update news set newstitle=?, newstype=?, newsimg=?, newscontent=?, addtime=? where newsid=?',
    delete: 'delete from news where newsid=?',
    queryById: 'select * from news where newsid=?',
    queryByType: 'select * from news where newstype= ? order by addtime desc limit ?, ? ',
    queryAll: 'select * from news order by addtime desc'
};
module.exports = newsSqls;
