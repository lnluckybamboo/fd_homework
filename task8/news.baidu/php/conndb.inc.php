<?php  
require("ConnDB.class.inc.php");  
$ccon = new ConnDB("mysql","localhost","root","","phplesson");  
$operatedb = new OperateDB();  
$conn = $ccon->GetConn();  
  
?>  