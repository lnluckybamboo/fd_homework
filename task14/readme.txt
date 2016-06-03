（一）.sql注入防御：
在models/newsSql.js和models/userSql.js文件中查询参数都以?形式存在，占位；

（二）.XSS防御：
1.前台dbms.js文件中，AJAX请求url的参数使用encodeURIComponent进行编码；
2.后台express中，接收的参数先用decodeURIComponent解码，然后使用自定义的html_encode将特殊字符进行转码，存储在mysql数据库；
3.前台读取数据库中的数据，自动将转码的特殊字符变成相应的html
我测试的情况有：
<img src=0 onerror=alert(0)>
<script>alert(1)</script>
单引号，双引号，且（&） 换行 \ /
均通过测试，正常显示在文本中，不弹框。

（三）.CSRF防御：
在http://127.0.0.1:8081/reg注册用户的时候通过token验证进行防御，
test.html是csrf的攻击文件。
防御方法：请求reg页面的时候随机生成token,并保存到session.token中，并渲染到ejs；
点击注册的时候，检查session.token是否存在，如果不存在重新创建，再比较access_token和session.token，相等验证通过。
