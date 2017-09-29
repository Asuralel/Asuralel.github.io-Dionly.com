<?php
	include 'connect.php';

    $pageNo = isset($_REQUEST['pageNo']) ? $_REQUEST['pageNo'] : 1;
    $qty = isset($_REQUEST['qty']) ? $_REQUEST['qty'] : 15; 
	// 编写查询sql语句
	$sql = 'select * from goods';

	// 利用sql语句查询数据库
	// 查询结果集
	$result = $conn->query($sql);


	// 使用查询结果集
	$row = $result->fetch_all(MYSQLI_ASSOC);


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

	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>