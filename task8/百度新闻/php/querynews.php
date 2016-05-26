<?php  
require("conndb.inc.php");  

if(isset($_GET["newstype"])){
	$newstype=$_GET["newstype"];
	$sql = "SELECT newsid, newstitle, newsimg, newscontent, addtime, newstype FROM news WHERE newstype='".$newstype."'";
}else{
	$sql = "SELECT newsid, newstitle, newsimg, newscontent, addtime, newstype FROM news";
}


$result = $operatedb->Execsql($sql,$conn);  

if ($result) {
 	echo json_encode($result);
}else{
	echo "query error : ".mysql_error();
}
?>  