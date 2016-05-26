<?php  
require("conndb.inc.php");  

$newsid=$_POST['newsid'];

if(!get_magic_quotes_gpc()){
	$sql = "DELETE FROM `news` WHERE `newsid`= '".addslashes($newsid)."'";
}else{
	$sql = "DELETE FROM `news` WHERE `newsid`= '".$newsid."'";
}

$result = $operatedb->Execsql($sql,$conn);  

if ($result) {
	echo "delete success";
}else{
	echo "delete error : ".mysql_error();
}
?>  