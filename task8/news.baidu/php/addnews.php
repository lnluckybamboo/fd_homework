<?php  
require("conndb.inc.php");  

$newstitle=$_POST['newstitle'];
$newsid=$_POST['newsid'];
$newsimg=$_POST['newsimg'];
$newscontent=$_POST['newscontent'];
$addtime=$_POST['addtime'];
$newstype=$_POST['newstype'];

if(!get_magic_quotes_gpc()){
	$sql = "INSERT INTO `news`(`newsid`,`newstitle`, `newsimg`, `newscontent`, `addtime`, `newstype`) VALUES ('".addslashes($newsid)."','".addslashes($newstitle)."','".addslashes($newsimg)."','".addslashes($newscontent)."','".addslashes($addtime)."','".addslashes($newstype)."')";
}else{
	$sql = "INSERT INTO `news`(`newsid`,`newstitle`, `newsimg`, `newscontent`, `addtime`, `newstype`) VALUES ('".$newsid."','".$newstitle."','".$newsimg."','".$newscontent."','".$addtime."','".$newstype."')";
}

$result = $operatedb->Execsql($sql,$conn);  

if ($result) {
	echo $result;
}else{
	echo "insert error : ".mysql_error();
}
?>  