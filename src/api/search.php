<?php
	include 'connect.php';
	$pageNo = isset($_REQUEST['pageNo']) ? $_REQUEST['pageNo'] : 1;
	$qty = isset($_REQUEST['qty']) ? $_REQUEST['qty'] : 15; 
	$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '爱';

	$sql = "select * from goods where name like '%".$keyword."%'";

	// 获取查询结果
	$result = $conn->query($sql);

	// 使用查询结果集
	$row = $result->fetch_all(MYSQLI_ASSOC);
	
	//释放查询结果集
    $result->close();

    // 设置返回数据信息
    // * 总数total
    // * 数据data
    // * 分页page
    // * 每页数量qty
    $res = array(
        'data' => array_slice($row, ($pageNo-1)*$qty,$qty), 
        'total' => count($row),
        'pageNo' => $pageNo,
        'qty' => $qty
    );
    //把结果输出到前台
    echo json_encode($res,JSON_UNESCAPED_UNICODE);


	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>