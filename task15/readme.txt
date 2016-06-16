我使用的是linux ubuntu14.04
1.通过命令/opt/lampp/lampp startmysql
启动xampp的mysql数据库，并插入数据脚本
2.通过shell脚本cpud.sh启动服务，
并循环检测当前cpu占用率，如果超过80%，重启pm2