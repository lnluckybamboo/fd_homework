#启动服务脚本
pm2 start server.js --name shelltest
sleep 12s
isOnline=`pm2 show shelltest | grep online`
status=`pm2 show shelltest | grep status`
echo $status
if [ ${#isOnline} > 0 ]
then echo "start ok"
else echo "start fail"
pm2 restart server.js --name shelltest
fi

#每隔100s,循环检测CPU是否超过80%，超过重启服务
while true;
do
cpu_left=`top -b -n 1 | grep Cpu | awk '{print $8}' | cut -f 1 -d "."`
if [ $cpu_left -lt 20 ]
then echo $cpu_left
pm2 restart server.js --name shelltest
else echo "cpu is ok"
fi
sleep 100s;
done;
