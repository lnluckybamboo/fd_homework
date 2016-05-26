<?php
// 连接数据库的类
class ConnDB
{
		var $dbtype;
		var $host;
		var $usr;
		var $pwd;
		var $dbname;
		var $conn;
		// 构造方法
		function ConnDB($dbtype,$host,$user,$pwd,$dbname)
		{
				$this->dbtype = $dbtype;
				$this->host = $host;
				$this->pwd = $pwd;
				$this->dbname = $dbname;
				$this->user = $user;
		}
		function GetConn()
		{
			$this->conn = mysqli_connect($this->host,$this->user,$this->pwd) or die("数据库服务器连接错误".mysql_error());	
			mysqli_select_db($this->conn,$this->dbname) or die("数据库访问错误".mysql_error());
			// 设置编码格式
			mysqli_query($this->conn, "SET NAMES 'UTF8'");
			mysqli_query($this->conn, "SET CHARACTER SET UTF8");
			mysqli_query($this->conn, "SET CHARACTER_SET_RESULTS=UTF8'");
			return $this->conn;
		}
		function __destruct()
		{
			$this->CloseDB();	
		}
		function CloseDB()
		{
			mysqli_close($this->conn);
		}
		
}
// 数据库操作类
class OperateDB
{
	function Execsql($sql,$conn)
	{
			$sqltype = strtolower(substr(trim($sql),0,6));// 截取sql语句中的前6个字符串,并转换成小写
			$result = mysqli_query($conn,$sql);// 执行sql语句
			$calback_arrary = array();// 定义二维数组
			if ("select" == $sqltype)// 判断执行的是select语句
			{
				
				if (false == $result)
				{
					return false;	
				}
				else if (0 == $result->num_rows)
				{
					return false;
				}
				else
				{
					while($result_array = mysqli_fetch_array($result))
					{
					array_push($calback_arrary, $result_array);
					}
					return $calback_arrary;// 成功返回查询结果的数组	
				}
			}
			else if ("update" == $sqltype || "insert" == $sqltype || "delete" == $sqltype)
			{
					if ($result)
					{
						return true;
					}
					else
					{
						return false;
					}
			}
	}	
}

?>