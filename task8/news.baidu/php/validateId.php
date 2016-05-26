<?php  
require("conndb.inc.php");  

$newsid=$_POST["newsid"];

if(!get_magic_quotes_gpc()){
	$sql = "SELECT newsid FROM news WHERE newsid='".addslashes($newsid)."'";
}else{
	$sql = "SELECT newsid FROM news WHERE `newsid`= '".$newsid."'";
}

$result = $operatedb->Execsql($sql,$conn);  

echo json_encode($result);

?>  