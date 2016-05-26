<?php  
require("conndb.inc.php");  

$newsid=htmlspecialchars($_POST['newsid'], ENT_NOQUOTES);
$newstitle=htmlspecialchars($_POST['newstitle'], ENT_NOQUOTES);
$newsimg=htmlspecialchars($_POST['newsimg'], ENT_NOQUOTES);
$newscontent=htmlspecialchars($_POST['newscontent'], ENT_NOQUOTES);
$addtime=htmlspecialchars($_POST['addtime'], ENT_NOQUOTES);
$newstype=htmlspecialchars($_POST['newstype'], ENT_NOQUOTES);

if(!get_magic_quotes_gpc()){
    $sql = "UPDATE `news` SET `newstitle`='".addslashes($newstitle)."',`newsimg`='".addslashes($newsimg)."',`newscontent`='".addslashes($newscontent)."',`addtime`='".addslashes($addtime)."',`newstype`='".addslashes($newstype)."' WHERE `newsid`='".addslashes($newsid)."'";
}else{
	$sql = "UPDATE `news` SET `newstitle`='".$newstitle."'`newsimg`='".$newsimg."'`newscontent`='".$newscontent."'`addtime`='".$addtime."'`newstype`='".$newstype."' WHERE `newsid`='".$newsid."'";
}

$result = $operatedb->Execsql($sql,$conn);  

if ($result) {
	echo $result;
}else{
	echo "update error : ".mysql_error();
}
?>  